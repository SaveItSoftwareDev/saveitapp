import * as React from "react";
import * as S from "./defenicoes.styled";
import { IDefinicoesData, SERVICE } from "./defenicoes.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";
import { useHistory } from "react-router-dom";
import useFetchMe from "../dashboard/fetchers/useFetchMe.hook";
import { isLoggedIn } from "../../helpers/authReducer.reducer";

const schema = yup.object({
  current_password: yup.string().trim().required(),
  new_password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required(),
});

interface IDefinicoesPageProps {}

interface IDefinicoesMessage {
  hasMessage: boolean;
  type: "danger" | "success";
  message: string;
}

export const DefinicoesPage: React.FC<IDefinicoesPageProps> = (props) => {
  const history = useHistory();

  // este effect serve para verificar se o user está logado (usa uma função que verifica se existe um token em localstorage)
  // caso o user n esteja logado é mandado para a página de login
  // este fetcher executa uma vez quando a página é renderizada
  React.useEffect(() => {
    if (!isLoggedIn()) {
      history.push("login");
    }
  }, []);

  const [
    messageOnDefinicoes,
    setMessageOnDefinicoes,
  ] = React.useState<IDefinicoesMessage>({
    hasMessage: false,
    type: "danger",
    message: "",
  });

  const [meData] = useFetchMe();

  const initialValues: IDefinicoesData = {
    email: meData.email,
    current_password: "",
    new_password: "",
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
                <h1>Save iT</h1>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <h5 className="branco">{`Bem vindo(a) ${meData.username}`}</h5>
                </BS.Col>
              </BS.Row>
              <BS.Row className="mt-2">
                <BS.Col lg={12}>
                  <BS.Button
                    variant="secondary"
                    className="fundo-cizento"
                    onClick={() => {
                      history.push("/dashboard");
                    }}
                  >
                    Dashboard
                  </BS.Button>
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
                  <BS.Button
                    variant="secondary"
                    className="fundo-cizento"
                    onClick={() => {
                      history.push("/definicoes");
                    }}
                  >
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
          <BS.Col lg={8} className="flex-center-center">
            <BS.Container fluid>
              <S.FormContainer>
                <Formik
                  validationSchema={schema}
                  onSubmit={(values: IDefinicoesData) => {
                    SERVICE.methods
                      .doUpdate(values)
                      .then((result) => {
                        setMessageOnDefinicoes({
                          hasMessage: true,
                          type: "success",
                          message: "Atualizado com sucesso",
                        });
                      })
                      .catch((err) => {
                        setMessageOnDefinicoes({
                          hasMessage: true,
                          type: "danger",
                          message: "Erro ao atualizar password",
                        });
                      });
                  }}
                  initialValues={initialValues}
                >
                  {({
                    handleSubmit,
                    resetForm,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                  }) => (
                    <BS.Form
                      noValidate
                      onSubmit={handleSubmit}
                      className="w-100"
                    >
                      <BS.Row>
                        <BS.Col>
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="email"
                              name="email"
                              disabled
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={meData.email}
                              isValid={touched.email && !errors.email}
                            />
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="password"
                              name="current_password"
                              placeholder="password atual"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.current_password}
                              isValid={
                                touched.current_password &&
                                !errors.current_password
                              }
                            />
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="password"
                              name="new_password"
                              placeholder="password nova"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.new_password}
                              isValid={
                                touched.new_password && !errors.new_password
                              }
                            />
                          </BS.Form.Group>
                        </BS.Col>
                      </BS.Row>
                      <BS.Row className="mt-2">
                        <BS.Col>
                          {messageOnDefinicoes.hasMessage && (
                            <BS.Alert variant={messageOnDefinicoes.type}>
                              {messageOnDefinicoes.message}
                            </BS.Alert>
                          )}
                        </BS.Col>
                      </BS.Row>

                      <BS.Row className="justify-content-between">
                        <BS.Col lg={3}>
                          <BS.Button
                            variant="outline-secondary"
                            type="button"
                            className="w-100 negrito"
                            onClick={() => {
                              resetForm();
                            }}
                          >
                            cancelar
                          </BS.Button>
                        </BS.Col>
                        <BS.Col lg={3}>
                          <BS.Button
                            variant="secondary"
                            type="submit"
                            className="w-100 negrito"
                          >
                            salvar
                          </BS.Button>
                        </BS.Col>
                      </BS.Row>
                    </BS.Form>
                  )}
                </Formik>
                <BS.Row className="justify-content-between mt-2">
                  <BS.Col lg={9}></BS.Col>
                  <BS.Col lg={3}>
                    <BS.Button
                      variant="danger"
                      type="button"
                      className="w-100 negrito"
                      onClick={() => {
                        SERVICE.methods
                          .delete()
                          .then((result) => {
                            console.log("ELIMINADO COM SUCESSO!");
                            localStorage.clear();
                            history.push("/login");
                          })
                          .catch((err) => {
                            setMessageOnDefinicoes({
                              hasMessage: true,
                              type: "danger",
                              message: "Erro ao eliminar o utilizador",
                            });
                          });
                      }}
                    >
                      eliminar conta
                    </BS.Button>
                  </BS.Col>
                </BS.Row>
              </S.FormContainer>
            </BS.Container>
          </BS.Col>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
