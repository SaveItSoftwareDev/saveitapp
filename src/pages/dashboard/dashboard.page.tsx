import * as React from "react";
import * as S from "./dashboard.styled";

import * as BS from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Doughnut } from "react-chartjs-2";

import ModalRegisto, {
  ETipoRegisto,
} from "./components/modal-registo.component";

import ModalConta from "./components/modal-contas.component";

import ModalCategoria from "./components/modal-categorias.component";

import { useHistory } from "react-router-dom";

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

  // estado para controlar a paginação da tabela
  const [movimentosPage, setMovimentosPage] = React.useState(1);

  // fetcher para obeter os movimentos receitas e despesas, bem como o total de movimentos em BD (movimentosSize) para poder controlar a paginação
  const [
    movimentos,
    movimentosSize,
    errorMovimentos,
    isLoadingMovimentos,
  ] = useFetchMovimentos(movimentosPage);

  // função que vai criar os indicadores de paginação da tabela
  const renderPaginationItems = () => {
    const items = [
      <BS.Pagination.First
        onClick={() => {
          setMovimentosPage(1);
        }}
      />,
      <BS.Pagination.Prev
        onClick={() => {
          setMovimentosPage(movimentosPage - 1);
        }}
      />,
    ];

    // vamos assumir que cada página tem 10 linhas, o Math.ceil arredonda para cima
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

    items.push(
      <BS.Pagination.Next
        onClick={() => {
          setMovimentosPage(movimentosPage + 1);
        }}
      />,
      <BS.Pagination.Last
        onClick={() => {
          setMovimentosPage(Math.ceil(movimentosSize / 5));
        }}
      />
    );

    return items;
  };

  //fetcher para obter a lista de contas, recebe um booleano como argumento que indica se é para injetar
  //uma conta ficticia para trabalhar com as dropdownds, pq este fetcher tb é usado noutros sitios
  const [contas, errorContas, isLoadingContas] = useFetchContas(false);

  // este fetcher está a devolver valores random para os totais por mês de credito
  const [
    totaisMesCredito,
    errorTotaisMesCredito,
    isLoadingTotaisMesCredito,
  ] = useFetchTotaisPorMes(ETipoTotal.CREDITO);

  // este fetcher está a devolver valores random para os totais por mês de debito
  const [
    totaisMesDebito,
    errorTotaisMesDebito,
    isLoadingTotaisMesDebito,
  ] = useFetchTotaisPorMes(ETipoTotal.DEBITO);

  // Fetcher para ir buscar a info referente ao user logado
  const [me] = useFetchMe();

  // este effect serve para verificar se o user está logado (usa uma função que verifica se existe um token em localstorage)
  // caso o user n esteja logado é mandado para a página de login
  // este fetcher executa uma vez quando a página é renderizada
  React.useEffect(() => {
    if (!isLoggedIn()) {
      history.push("login");
    }
  }, []);

  // dados dummy para os donut charts
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

  // Este state controla se a modal de inserir receita está aberta ou fechada
  const [showModalReceita, setShowModalReceita] = React.useState<boolean>(
    false
  );

  // Este state controla se a modal de inserir despesa está aberta ou fechada
  const [showModalDespesa, setShowModalDespesa] = React.useState<boolean>(
    false
  );

  // Este state controla se a modal de inserir conta está aberta ou fechada
  const [showModalConta, setShowModalConta] = React.useState<boolean>(false);

  // Este state controla se a modal de inserir conta está aberta ou fechada
  const [showModalCategoria, setShowModalCategoria] = React.useState<boolean>(
    false
  );

  // funcção que renderiza a modal de receita
  const renderModalReceita = () => {
    return (
      <ModalRegisto
        tipo={ETipoRegisto.receita}
        show={showModalReceita}
        onHide={setShowModalReceita}
      ></ModalRegisto>
    );
  };

  // funcção que renderiza a modal de despesa
  const renderModalDespesa = () => {
    return (
      <ModalRegisto
        tipo={ETipoRegisto.despesa}
        show={showModalDespesa}
        onHide={setShowModalDespesa}
      ></ModalRegisto>
    );
  };

  // funcção que renderiza a modal de contas
  const renderModalConta = () => {
    return (
      <ModalConta show={showModalConta} onHide={setShowModalConta}></ModalConta>
    );
  };

  // funcção que renderiza a modal de categorias
  const renderModalCategoria = () => {
    return (
      <ModalCategoria
        show={showModalCategoria}
        onHide={setShowModalCategoria}
      ></ModalCategoria>
    );
  };

  // página de dashboard
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
                      // quando o user clica no logout o localstorage é limpo, i.e. o token
                      localStorage.clear();
                      // user é enviado para a página de login
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
                                .map((conta) =>
                                  Number.parseFloat(conta.saldo || "0")
                                )
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
                  <BS.Container
                    className="mt-2 overflow-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <BS.Table responsive className="sm-table">
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
                              className={`registo-${mov.tipo} p-0`}
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
                  </BS.Container>
                  <BS.Row className="mt-2">
                    <BS.Col lg="12" md="12">
                      <BS.Pagination className="justify-content-center">
                        {renderPaginationItems()}
                      </BS.Pagination>
                    </BS.Col>
                  </BS.Row>
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
            setShowModalReceita(true);
          }}
        >
          Receita
        </BS.Dropdown.Item>
        <BS.Dropdown.Item
          onClick={() => {
            setShowModalDespesa(true);
          }}
        >
          Despesa
        </BS.Dropdown.Item>
        <BS.Dropdown.Item
          onClick={() => {
            setShowModalConta(true);
          }}
        >
          Conta
        </BS.Dropdown.Item>
        <BS.Dropdown.Item
          onClick={() => {
            setShowModalCategoria(true);
          }}
        >
          Categoria
        </BS.Dropdown.Item>
      </BS.DropdownButton>
      {renderModalReceita()}
      {renderModalDespesa()}
      {renderModalConta()}
      {renderModalCategoria()}
    </S.PageContainer>
  );
};
