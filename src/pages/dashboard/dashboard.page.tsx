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
              <BS.Row className="mt-5">
                <BS.Col className="text-center" lg={12}>
                  <BS.Image
                    className={"avatar"}
                    src="images/avatar.png"
                    rounded
                  />
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col className="text-center" lg={12}>
                  <h3 className="branco">Irene T</h3>
                </BS.Col>
              </BS.Row>
            </BS.Container>
          </BS.Col>
          <BS.Col lg={10}>
            <BS.Container fluid>
              <h1>SaveIt Dasbhoard</h1>
              <BS.Row>
                <BS.Col lg={2}>
                  <BS.Card>
                    <BS.Card.Body className={"green"}>
                      <BS.Card.Title>Saldo Total</BS.Card.Title>
                      <BS.Card.Text>1024.00€</BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={2}>
                  <BS.Card>
                    <BS.Card.Body>
                      <BS.Card.Title>AtivoBank</BS.Card.Title>
                      <BS.Card.Text>14.00€</BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={2}>
                  <BS.Card>
                    <BS.Card.Body>
                      <BS.Card.Title>Receitas</BS.Card.Title>
                      <BS.Card.Text>4.00€</BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg={2}>
                  <BS.Card>
                    <BS.Card.Body>
                      <BS.Card.Title>Despesas</BS.Card.Title>
                      <BS.Card.Text>56.00€</BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
              </BS.Row>
              <BS.Row className={"mt-2"}>
                <BS.Col lg="4">
                  <BS.Card>
                    <BS.Card.Body>
                      <BS.Card.Title>Despesas</BS.Card.Title>
                      <BS.Card.Text>
                        <Doughnut data={dataDespesa} />
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
                <BS.Col lg="4">
                  <BS.Card>
                    <BS.Card.Body>
                      <BS.Card.Title>Receitas</BS.Card.Title>
                      <BS.Card.Text>
                        <Doughnut data={dataReceita} />
                      </BS.Card.Text>
                    </BS.Card.Body>
                  </BS.Card>
                </BS.Col>
              </BS.Row>
            </BS.Container>
          </BS.Col>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
