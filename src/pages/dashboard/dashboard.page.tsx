import * as React from "react";
import * as S from "./dashboard.styled";

import * as BS from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Doughnut } from "react-chartjs-2";

import ModalRegisto, {
  ETipoRegisto,
} from "./components/modal-registo.component";

import { useHistory } from "react-router-dom";

import useFetchSaldoTotal from "./fetchers/useFetchSaldoTotal.hook";
import useFetchMovimentos from "./fetchers/useFetchMovimentos.hook";
import useFetchContas from "./fetchers/useFetchContas.hook";
import useFetchMe from "./fetchers/useFetchMe.hook";
import useFetchTotaisPorMes, {
  ETipoTotal,
} from "./fetchers/useFetchTotaisPorMes.hook";
import { isLoggedIn } from "../../helpers/authReducer.reducer";

interface IDashboarPageProps {}

export const DashboarPage: React.FC<IDashboarPageProps> = (props) => {
  const history = useHistory();

  const [movimentosPage, setMovimentosPage] = React.useState(1);

  const [
    movimentos,
    movimentosSize,
    errorMovimentos,
    isLoadingMovimentos,
  ] = useFetchMovimentos(movimentosPage);

  const renderPaginationItems = () => {
    const items = [];

    for (let index = 1; index < Math.ceil(movimentosSize / 10); index++) {
      items.push(
        <BS.PageItem
          active={index === movimentosPage}
          onClick={() => {
            setMovimentosPage(index);
          }}
        >
          {index}
        </BS.PageItem>
      );
    }

    return items;
  };

  const [contas, errorContas, isLoadingContas] = useFetchContas(false);
  const [
    totaisMesCredito,
    errorTotaisMesCredito,
    isLoadingTotaisMesCredito,
  ] = useFetchTotaisPorMes(ETipoTotal.CREDITO);

  const [
    totaisMesDebito,
    errorTotaisMesDebito,
    isLoadingTotaisMesDebito,
  ] = useFetchTotaisPorMes(ETipoTotal.DEBITO);

  const [me] = useFetchMe();

  React.useEffect(() => {
    if (!isLoggedIn()) {
      history.push("login");
    }
  }, []);

  const dataDespesa = {
    labels: ["Supermercado", "Cinema", "Ginásio"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const dataReceita = {
    labels: ["EMprego", "Bolsa", "Outros"],
    datasets: [
      {
        data: [900, 130, 100],
        backgroundColor: ["#3ba549", "#3642EB", "#F0CE06"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const [showModalReceita, setShouModalReceita] = React.useState<boolean>(
    false
  );

  const [showModalDespesa, setShouModalDespesa] = React.useState<boolean>(
    false
  );

  const renderModalReceita = () => {
    return (
      <ModalRegisto
        tipo={ETipoRegisto.receita}
        show={showModalReceita}
        onHide={setShouModalReceita}
      ></ModalRegisto>
    );
  };

  const renderModalDespesa = () => {
    return (
      <ModalRegisto
        tipo={ETipoRegisto.despesa}
        show={showModalDespesa}
        onHide={setShouModalDespesa}
      ></ModalRegisto>
    );
  };

  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={2} className="sidebar">
            <BS.Container>
              <BS.Row
                className="branco"
                onClick={() => {
                  history.push("/dashboard");
                }}
              >
                <h1 className="w-100">Save iT</h1>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <h5 className="branco">{`Bem vindo(a) ${me.username}`}</h5>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button
                    variant="secondary"
                    className="fundo-cizento"
                    onClick={() => {
                      history.push("/budget");
                    }}
                  >
                    Planeamentos
                  </BS.Button>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button variant="secondary" className="fundo-cizento">
                    Investimentos
                  </BS.Button>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button variant="secondary" className="fundo-cizento">
                    Alertas
                  </BS.Button>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button variant="secondary" className="fundo-cizento">
                    Definições
                  </BS.Button>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button
                    variant="secondary"
                    className="fundo-cizento"
                    onClick={() => {
                      localStorage.clear();
                      history.push("/login");
                    }}
                  >
                    Sair
                  </BS.Button>
                </BS.Col>
              </BS.Row>
            </BS.Container>
          </BS.Col>
          <BS.Col lg={10}>
            <BS.Container fluid className="mt-2">
              <BS.Row>
                <BS.Col lg={3}>
                  <BS.Card className={"saldo-total"}>
                    <BS.Card.Body>
                      <BS.Card.Title>Saldo Total</BS.Card.Title>
                      <BS.Card.Text>
                        {isLoadingContas
                          ? "loading..."
                          : `${
                              contas.length &&
                              contas
                                .map((conta) => Number.parseFloat(conta.saldo))
                                .reduce((acc, nextval) => acc + nextval)
                            } €`}
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-conta"} indicators={false}>
                    {contas.map((conta) => {
                      return (
                        <BS.Carousel.Item>
                          <h5>Saldo Conta</h5>
                          <h5>{`${conta.saldo} €`}</h5>
                          <p>{conta.nome}</p>
                        </BS.Carousel.Item>
                      );
                    })}
                  </BS.Carousel>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-receita"} indicators={false}>
                    {totaisMesCredito.map((tmc) => {
                      return (
                        <BS.Carousel.Item>
                          <h5>Receita Mensal</h5>
                          <h5>{tmc.total}€</h5>
                          <p>{tmc.anoMes}</p>
                        </BS.Carousel.Item>
                      );
                    })}
                  </BS.Carousel>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-despesa"} indicators={false}>
                    {totaisMesDebito.map((tmc) => {
                      return (
                        <BS.Carousel.Item>
                          <h5>Despesa Mensal</h5>
                          <h5>{tmc.total}€</h5>
                          <p>{tmc.anoMes}</p>
                        </BS.Carousel.Item>
                      );
                    })}
                  </BS.Carousel>
                </BS.Col>
              </BS.Row>
              <BS.Row className={"mt-2"}>
                <BS.Col lg="8">
                  <BS.Container className="mt-2 mov-container">
                    <BS.Table>
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Conta</th>
                          <th>Categoria</th>
                          <th>Subcategoria</th>
                          <th>Descrição</th>
                          <th>Valor</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {movimentos.map((mov) => {
                          return (
                            <tr
                              className={`registo-${mov.tipo}`}
                              key={`${mov.data}-${mov.descricao}`}
                            >
                              <td>{mov.data}</td>
                              <td>{mov.id_conta.nome}</td>
                              <td>{mov.categoria.nome}</td>
                              <td>{mov.sub_categoria.nome}</td>
                              <td>{mov.descricao}</td>
                              <td>{`${mov.montante} €`}</td>
                              <td>
                                {mov.tipo === "receita" ? (
                                  <Icon.GraphUp />
                                ) : (
                                  <Icon.GraphDown />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </BS.Table>
                    <BS.Pagination>{renderPaginationItems()}</BS.Pagination>
                  </BS.Container>
                </BS.Col>
                <BS.Col lg="4">
                  <BS.Row>
                    <BS.Col lg="12">
                      <BS.Card>
                        <BS.Card.Body>
                          <BS.Card.Title>Receitas novembro 2020</BS.Card.Title>
                          <BS.Card.Text>
                            <Doughnut data={dataReceita} />
                          </BS.Card.Text>
                        </BS.Card.Body>
                      </BS.Card>
                    </BS.Col>
                  </BS.Row>
                  <BS.Row className={"mt-2"}>
                    <BS.Col lg={12}>
                      <BS.Card>
                        <BS.Card.Body>
                          <BS.Card.Title>Despesas novembro 2020</BS.Card.Title>
                          <BS.Card.Text>
                            <Doughnut data={dataDespesa} />
                          </BS.Card.Text>
                        </BS.Card.Body>
                      </BS.Card>
                    </BS.Col>
                  </BS.Row>
                </BS.Col>
              </BS.Row>
            </BS.Container>
          </BS.Col>
        </BS.Row>
      </BS.Container>
      <BS.DropdownButton
        id="dropdown-basic-button"
        title="+"
        drop={"up"}
        className="add-button"
      >
        <BS.Dropdown.Item
          onClick={() => {
            setShouModalReceita(!showModalReceita);
          }}
        >
          Receita
        </BS.Dropdown.Item>
        <BS.Dropdown.Item
          onClick={() => {
            setShouModalDespesa(!showModalDespesa);
          }}
        >
          Despesa
        </BS.Dropdown.Item>
        <BS.Dropdown.Item href="#/action-3">Conta</BS.Dropdown.Item>
        <BS.Dropdown.Item href="#/action-4">Categoria</BS.Dropdown.Item>
      </BS.DropdownButton>
      {renderModalReceita()}
      {renderModalDespesa()}
    </S.PageContainer>
  );
};
