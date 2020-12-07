import * as React from "react";
import * as S from "./register.styled";
import { IRegisterData, SERVICE } from "./register.service";

import * as BS from "react-bootstrap";

import { Formik } from "formik";

import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().trim().required().min(2).max(30),
  lastName: yup.string().trim().required().min(2).max(30),
  email: yup.string().trim().required(),
  password: yup.string().trim().required().min(5),
  age: yup.number().min(2),
  gender: yup.string().min(1).max(30),
  city: yup.string().min(2).max(50),
  job: yup.string().min(2).max(30),
});

const initialValues: IRegisterData = {
  firtsName: "",
  lastName: "",
  email: "",
  password: "",
  age: undefined,
  gender: "",
  city: "",
  job: "",
};

interface IRegisterPageProps {}

export const RegisterPage: React.FC<IRegisterPageProps> = (props) => {
  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={2} className="sidebar">
            <BS.Container>
              <BS.Row className="branco">
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
                              name="firstName"
                              placeholder="primeiro nome"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firtsName}
                              isValid={touched.firtsName && !errors.firtsName}
                            />
                          </BS.Form.Group>
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="lastName"
                              placeholder="último nome"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                              isValid={touched.lastName && !errors.lastName}
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
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="number"
                              name="age"
                              placeholder="idade"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.age}
                              isValid={touched.age && !errors.age}
                            />
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="gender"
                              placeholder="género"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.gender}
                              isValid={touched.gender && !errors.gender}
                            />
                          </BS.Form.Group>
                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="city"
                              placeholder="cidade"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                              isValid={touched.city && !errors.city}
                            />
                          </BS.Form.Group>

                          <BS.Form.Group>
                            <BS.Form.Control
                              className="italico"
                              type="text"
                              name="job"
                              placeholder="profissão"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.job}
                              isValid={touched.job && !errors.job}
                            />
                          </BS.Form.Group>
                        </BS.Col>
                      </BS.Row>

                      <BS.Row>
                        <BS.Col lg={3}>
                          <BS.Button
                            type="submit"
                            className="w-100 botao-entrar"
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
