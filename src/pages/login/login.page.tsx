import * as React from "react";
import * as S from "./login.styled";
import { ILoginData, SERVICE } from "./login.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required().max(35).min(1),
  password: yup.string().required().min(5),
});

const initialValues: ILoginData = {
  username: "",
  password: "",
};
interface ILoginPageProps {}

export const LoginPage: React.FC<ILoginPageProps> = (props) => {
  // Hook - função responsável por fazer os devidos redirects na página.
  const history = useHistory();

  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={3} className="flex-center-center">
            <S.FormContainer className="flex-center-center">
              <Formik
                validationSchema={schema}
                onSubmit={(values: ILoginData) => {
                  SERVICE.methods
                    .doLogin(values)
                    .then((result) => {
                      localStorage.setItem(
                        "token",
                        JSON.stringify(result.data)
                      );
                      console.log(
                        "LOGIN COM SUCESSO! -> Redirecionar para DASHBOARD"
                      );
                      history.push("/dashboard");
                    })
                    .catch((err) => {
                      console.log("Erro ao fazer login");
                    });
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
                  <BS.Form noValidate onSubmit={handleSubmit} className="w-100">
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
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isValid={touched.password && !errors.password}
                      />
                    </BS.Form.Group>

                    <BS.Row>
                      <BS.Col lg={6}>
                        <BS.Button
                          variant="secondary"
                          type="submit"
                          className="w-100 botao-entrar"
                        >
                          entrar
                        </BS.Button>
                      </BS.Col>
                      <BS.Col lg={6}>
                        <BS.Button
                          variant="link"
                          className="w-100 botao-registo"
                          onClick={() => {
                            history.push("/register");
                          }}
                        >
                          Novo registo
                        </BS.Button>
                      </BS.Col>
                    </BS.Row>
                  </BS.Form>
                )}
              </Formik>
            </S.FormContainer>
          </BS.Col>
          <BS.Col lg={9} className="flex-center-center">
            <S.WelcomeTitle>Bem vindo à Save iT</S.WelcomeTitle>
          </BS.Col>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
