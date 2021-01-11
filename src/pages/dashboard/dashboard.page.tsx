import * as React from "react";
import * as S from "./dashboard.styled";

import * as BS from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

import ModalRegisto from "./components/modal-registo.component";

import { useHistory } from "react-router-dom";

import useFetchSaldoTotal from "./fetchers/useFetchSaldoTotal.hook";

interface IDashboarPageProps {}

export const DashboarPage: React.FC<IDashboarPageProps> = (props) => {
  const history = useHistory();

  const [response, error, isLoading] = useFetchSaldoTotal();

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

  const renderModalReceita = () => {
    return (
      <ModalRegisto
        show={showModalReceita}
        onHide={setShouModalReceita}
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
                  <BS.Image
                    className={"avatar"}
                    src="images/avatar.png"
                    rounded
                  />
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <h5 className="branco">Bem vindo Tiago!</h5>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button variant="secondary" className="fundo-cizento"
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
                        {isLoading
                          ? "loading..."
                          : `${response.saldoTotal} ${response.currency}`}
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-conta"} indicators={false}>
                    <BS.Carousel.Item>
                      <h5>Saldo Conta</h5>
                      <h5>15,00€</h5>
                      <p>AtivoBank</p>
                    </BS.Carousel.Item>
                  </BS.Carousel>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-receita"} indicators={false}>
                    <BS.Carousel.Item>
                      <h5>Receita Mensal</h5>
                      <h5>4,00€</h5>
                      <p>novembro 2020</p>
                    </BS.Carousel.Item>
                  </BS.Carousel>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Carousel className={"saldo-despesa"} indicators={false}>
                    <BS.Carousel.Item>
                      <h5>Despesa Mensal</h5>
                      <h5>56,00€</h5>
                      <p>novembro 2020</p>
                    </BS.Carousel.Item>
                  </BS.Carousel>
                </BS.Col>
              </BS.Row>
              <BS.Row className={"mt-2"}>
                <BS.Col lg="8"></BS.Col>
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
        <BS.Dropdown.Item href="#/action-2">Despesa</BS.Dropdown.Item>
        <BS.Dropdown.Item href="#/action-3">Conta</BS.Dropdown.Item>
        <BS.Dropdown.Item href="#/action-4">Categoria</BS.Dropdown.Item>
      </BS.DropdownButton>
      {renderModalReceita()}
    </S.PageContainer>
  );
};
