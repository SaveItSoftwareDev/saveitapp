import * as React from "react";
import * as S from "./register.styled";
import { IRegisterData, SERVICE } from "./register.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  primeiro_nome: yup.string().trim().required().min(2).max(30),
  ultimo_nome: yup.string().trim().required().min(2).max(30),
  email: yup.string().trim().required(),
  // password: yup.string().trim().required().min(5),
  idade: yup.number().min(2),
  //genero: yup.string().min(1).max(30),
  cidade: yup.string().min(2).max(50),
  profissao: yup.string().min(2).max(30),
});

const initialValues: IRegisterData = {
  primeiro_nome: "",
  ultimo_nome: "",
  email: "",
  //password: "",
  idade: undefined,
  //genero: "",
  cidade: "",
  profissao: "",
};

interface IRegisterPageProps {}

export const RegisterPage: React.FC<IRegisterPageProps> = (props) => {
  const history = useHistory();
  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={2} className="sidebar">
            <BS.Container>
              <BS.Row
                className="branco"
                onClick={() => {
                  history.push("/login");
                }}
              >
                <h1>Save iT</h1>
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
            </BS.Container>
          </BS.Col>
          <BS.Col lg={8} className="flex-center-center">
            <BS.Container fluid>
              <S.FormContainer>
                <Formik
                  validationSchema={schema}
                  onSubmit={(values: IRegisterData) => {
                    SERVICE.methods
                      .doRegister(values)
                      .then((result) => {
                        console.log(
                          "REGISTO COM SUCESSO! -> Redirecionar para DASHBOARD"
                        );
                        history.push("/login");
                      })
                      .catch((err) => console.log("Erro ao fazer registo"));
                  }}
                  initialValues={initialValues}
                >
                  {({
                    handleSubmit,
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
                              type="text"
                              name="primeiro_nome"
                              placeholder="primeiro nome"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.primeiro_nome}
                              isValid={
                                touched.primeiro_nome && !errors.primeiro_nome
                              }
                            />
                          </BS.Form.Group>
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="ultimo_nome"
                              placeholder="último nome"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ultimo_nome}
                              isValid={
                                touched.ultimo_nome && !errors.ultimo_nome
                              }
                            />
                          </BS.Form.Group>
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="email"
                              name="email"
                              placeholder="e-mail"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              isValid={touched.email && !errors.email}
                            />
                          </BS.Form.Group>

                          {/* <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="password"
                              name="password"
                              placeholder="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              isValid={touched.password && !errors.password}
                            />
                          </BS.Form.Group> */}

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="number"
                              name="idade"
                              placeholder="idade"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.idade}
                              isValid={touched.idade && !errors.idade}
                            />
                          </BS.Form.Group>

                          {/* <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="genero"
                              placeholder="género"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.genero}
                              isValid={touched.genero && !errors.genero}
                            />
                          </BS.Form.Group> */}
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="cidade"
                              placeholder="cidade"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.cidade}
                              isValid={touched.cidade && !errors.cidade}
                            />
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="profissao"
                              placeholder="profissão"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.profissao}
                              isValid={touched.profissao && !errors.profissao}
                            />
                          </BS.Form.Group>
                        </BS.Col>
                      </BS.Row>

                      <BS.Row className="justify-content-between">
                        <BS.Col lg={3}>
                          <BS.Button
                            variant="secondary"
                            type="submit"
                            className="w-100 negrito"
                          >
                            salvar
                          </BS.Button>
                        </BS.Col>
                        <BS.Col lg={3}>
                          <BS.Button
                            variant="outline-secondary"
                            type="submit"
                            className="w-100 negrito"
                            onClick={() => {
                              history.push("/login");
                            }}
                          >
                            voltar
                          </BS.Button>
                        </BS.Col>
                      </BS.Row>
                    </BS.Form>
                  )}
                </Formik>
              </S.FormContainer>
            </BS.Container>
          </BS.Col>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
