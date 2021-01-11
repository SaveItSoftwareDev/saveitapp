import * as React from "react";
import * as S from "../../pages/dashboard/dashboard.styled";

import * as BS from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import ModalRegisto from "./components/modal-registo.component";


  interface IBudgetPageProps {}


  export const BudgetPage: React.FC<IBudgetPageProps> = (props) => {
    const history = useHistory();

    const [showModalOrcamento, setShowModalOrcamento] = React.useState<boolean>(
        false
      );
    
      const renderModalOrcamento= () => {
        return (
          <ModalRegisto
            show={showModalOrcamento}
            onHide={setShowModalOrcamento}
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
                  <BS.Button variant="secondary" className="fundo-cizento">
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
            setShowModalOrcamento(!showModalOrcamento);
          }}
        >Novo Orçamento
        </BS.Dropdown.Item>
      </BS.DropdownButton>
      {renderModalOrcamento()}
      </S.PageContainer>      
    );
};