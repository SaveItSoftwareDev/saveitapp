import * as React from "react";
import * as S from "./login.styled";
import { ILoginData, SERVICE } from "./login.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";
import { useHistory } from "react-router-dom";
import {
  asyncLocalStorage,
  isLoggedIn,
} from "../../helpers/authReducer.reducer";

const schema = yup.object({
  username: yup.string().required().max(35).min(1),
  password: yup.string().required().min(5),
});

const initialValues: ILoginData = {
  username: "",
  password: "",
};
interface ILoginPageProps {}

interface ILoginError {
  hasError: boolean;
  message: string;
}

export const LoginPage: React.FC<ILoginPageProps> = (props) => {
  // Hook - função responsável por fazer os devidos redirects na página.
  const history = useHistory();
  const [errorOnLogin, setErrorOnLogin] = React.useState<ILoginError>({
    hasError: false,
    message: "",
  });

  React.useEffect(() => {
    if (isLoggedIn()) {
      history.push("dashboard");
    }
  }, []);

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
                      asyncLocalStorage
                        .setItem("token", JSON.stringify(result.data))
                        .then(() => {
                          setErrorOnLogin({
                            hasError: false,
                            message: "",
                          });

                          history.push("/dashboard");
                        });
                    })
                    .catch(() => {
                      setErrorOnLogin({
                        hasError: true,
                        message: "Erro ao fazer login",
                      });
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
                      <BS.Row className="mt-2">
                        <BS.Col>
                          {errorOnLogin.hasError && (
                            <BS.Alert variant="danger">
                              {errorOnLogin.message}
                            </BS.Alert>
                          )}
                        </BS.Col>
                      </BS.Row>
                    </BS.Form.Group>

                    <BS.Row>
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
                      <BS.Col lg={6}>
                        <BS.Button
                          variant="secondary"
                          type="submit"
                          className="w-100 botao-entrar"
                        >
                          entrar
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
