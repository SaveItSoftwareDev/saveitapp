import * as React from "react";
import * as S from "./dashboard.styled";

import * as BS from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

interface IDashboarPageProps {}

export const DashboarPage: React.FC<IDashboarPageProps> = (props) => {
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

  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={2} className="sidebar">
            <BS.Container>
              <BS.Row className="branco">
                <h1 className="w-100 text-center">Save iT</h1>
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
                  <h5 className="branco">Bem vindo Rui Guerreiro!</h5>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <p className="branco">Planeamentos</p>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <p className="branco">Investimentos</p>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <p className="branco">Alertas</p>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <p className="branco">Definições</p>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col className="text-center" lg={12}>
                  <p className="branco">Sair</p>
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
                      <BS.Card.Text>1.024,00€</BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Card className={"saldo-conta"}>
                    <BS.Card.Body>
                      <BS.Card.Title>Saldo Conta</BS.Card.Title>
                      <BS.Card.Text>
                        <strong>15,00€</strong>
                        <p>Ativobank</p>
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Card className={"saldo-despesa"}>
                    <BS.Card.Body>
                      <BS.Card.Title>Receita Mensal</BS.Card.Title>
                      <BS.Card.Text>
                        <strong>4,00€</strong>
                        <p>novembro 2020</p>
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={3}>
                  <BS.Card className={"saldo-receita"}>
                    <BS.Card.Body>
                      <BS.Card.Title>Despesa Mensal</BS.Card.Title>
                      <BS.Card.Text>
                        <strong>56,00€</strong>
                        <p>novembro 2020</p>
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
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
    </S.PageContainer>
  );
};
