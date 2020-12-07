import * as React from "react";
import * as S from "./login.styled";
import { ILoginData, SERVICE } from "./login.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required().min(5),
});

const initialValues: ILoginData = {
  email: "",
  password: "",
};
interface ILoginPageProps {}

export const LoginPage: React.FC<ILoginPageProps> = (props) => {
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
                      console.log(
                        "LOGIN COM SUCESSO! -> Redirecionar para DASHBOARD"
                      );
                    })
                    .catch((err) => console.log("Erro ao fazer login"));
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
                    </BS.Form.Group>

                    <BS.Row>
                      <BS.Col lg={6}>
                        <BS.Button type="submit" className="w-100 botao-entrar">
                          entrar
                        </BS.Button>
                      </BS.Col>
                      <BS.Col lg={6}>
                        <BS.Button className="w-100 botao-registo">
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
