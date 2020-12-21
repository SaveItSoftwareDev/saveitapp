import * as React from "react";
import * as BS from "react-bootstrap";
import * as yup from "yup";

import { IRegistoData, SERVICE } from "../dashboard.service";

import { useHistory } from "react-router-dom";

import { Formik } from "formik";

interface IModalRegistoProps {
  show: boolean;
  onHide: (show: boolean) => void;
}

const schema = yup.object({
  descricao: yup.string().trim().required().min(2).max(100),
  categoria: yup
    .string()
    .oneOf(["Alimentação", "Ensino", "Carro"])
    .trim()
    .required(),
  subcategoria: yup.string().min(2).max(100),
  montante: yup.number().required().min(0.1).max(10000),
  data: yup.date().required(),
  recorrencia: yup.string().trim().oneOf(["Mensal", "Anual"]),
});

const initialValues: IRegistoData = {
  descricao: "",
  categoria: "",
  subcategoria: "",
  montante: 0,
  data: new Date().toDateString(),
  recorrencia: "",
};

export const ModalRegisto = (props: IModalRegistoProps) => {
  const history = useHistory();
  return (
    <BS.Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <BS.Modal.Header closeButton>
        <BS.Modal.Title id="example-custom-modal-styling-title">
          Receita{" "}
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values: IRegistoData) => {
            SERVICE.methods
              .doRegister(values)
              .then((result) => {
                console.log(
                  "REGISTO COM SUCESSO! -> Redirecionar para DASHBOARD"
                );
                props.onHide(false);
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
            <BS.Form noValidate onSubmit={handleSubmit} className="w-100">
              <BS.Row>
                <BS.Col>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      type="text"
                      name="descricao"
                      placeholder="descrição"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.descricao}
                      isValid={touched.descricao && !errors.descricao}
                    />
                  </BS.Form.Group>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="categoria"
                      placeholder="categoria"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.categoria}
                      isValid={touched.categoria && !errors.categoria}
                      defaultValue="categoria"
                    >
                      <option>categoria</option>
                      <option>Alimentação</option>
                      <option>Ensino</option>
                      <option>Carro</option>
                    </BS.Form.Control>
                  </BS.Form.Group>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="subcategoria"
                      placeholder="subcategoria"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subcategoria}
                      isValid={touched.subcategoria && !errors.subcategoria}
                      defaultValue="subcategoria"
                    >
                      <option>subcategoria</option>
                    </BS.Form.Control>
                  </BS.Form.Group>

                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      type="number"
                      min="0.1"
                      max="100000.00"
                      step="0.01"
                      name="montante"
                      placeholder="montante"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.montante}
                      isValid={touched.montante && !errors.montante}
                    />
                  </BS.Form.Group>

                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      type="date"
                      name="data"
                      placeholder="data"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.data}
                      isValid={touched.data && !errors.data}
                    />
                  </BS.Form.Group>

                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="recorrencia"
                      placeholder="recorrência"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.recorrencia}
                      isValid={touched.recorrencia && !errors.recorrencia}
                      defaultValue="recorrência"
                    >
                      <option>recorrência</option>
                      <option>Mensal</option>
                      <option>Anual</option>
                    </BS.Form.Control>
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
                      props.onHide(false);
                    }}
                  >
                    voltar
                  </BS.Button>
                </BS.Col>
              </BS.Row>
            </BS.Form>
          )}
        </Formik>
      </BS.Modal.Body>
    </BS.Modal>
  );
};

export default ModalRegisto;
