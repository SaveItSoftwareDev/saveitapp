import * as React from "react";
import * as S from "./login.styled";
import { ILoginData, SERVICE } from "./login.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const initialValues: ILoginData = {
  username: "",
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
                  <BS.Form className="w-100">
                    <BS.Form.Group controlId="formBasicEmail">
                      <BS.Form.Control
                        type="email"
                        name="username"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        isValid={touched.username && !errors.username}
                      />
                    </BS.Form.Group>

                    <BS.Form.Group controlId="formBasicPassword">
                      <BS.Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isValid={touched.password && !errors.password}
                      />
                    </BS.Form.Group>

                    <BS.Row>
                      <BS.Col lg={6}>
                        <BS.Button className="w-100">Criar registo</BS.Button>
                      </BS.Col>
                      <BS.Col lg={6}>
                        <BS.Button
                          type="submit"
                          className="w-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubmit();
                          }}
                        >
                          Entrar
                        </BS.Button>
                      </BS.Col>
                    </BS.Row>
                  </BS.Form>
                )}
              </Formik>
            </S.FormContainer>
          </BS.Col>
          <BS.Col lg={9} className="flex-center-center">
            <S.WelcomeTitle>Bem vindo à SaveIt</S.WelcomeTitle>
          </BS.Col>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
