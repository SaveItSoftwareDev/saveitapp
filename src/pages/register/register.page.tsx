import * as React from "react";
import * as S from "./register.styled";
import { IRegisterData, SERVICE } from "./register.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";
import { useHistory } from "react-router-dom";

//https://stackoverflow.com/questions/55451304/formik-yup-password-strength-validation-with-react
const schema = yup.object({
  //primeiro_nome: yup.string().trim().required().min(1).max(20),
  //ultimo_nome: yup.string().trim().required().min(1).max(20),
  email: yup.string().trim().required().max(35).min(1),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required(),
  username: yup.string().trim().required().min(5),
  //idade: yup.number().min(2),
  //genero: yup.string().min(1).max(30),
  //cidade: yup.string().min(2).max(20),
  //profissao: yup.string().min(2).max(20),
});

const initialValues: IRegisterData = {
  //primeiro_nome: "",
  //ultimo_nome: "",
  email: "",
  password: "",
  username: "",
  //idade: undefined,
  //genero: "",
  //cidade: "",
  //profissao: "",
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
                              name="username"
                              placeholder="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                              isValid={touched.username && !errors.username}
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

                          <BS.Form.Group>
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
                            <span>{errors.password}</span>
                          </BS.Form.Group>
                        </BS.Col>
                      </BS.Row>

                      <BS.Row className="justify-content-between">
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
                        <BS.Col lg={3}>
                          <BS.Button
                            variant="secondary"
                            type="submit"
                            className="w-100 negrito"
                            disabled={isValid && !errors}
                          >
                            salvar
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
