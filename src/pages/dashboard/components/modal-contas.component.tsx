import * as React from "react";
import * as BS from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

import * as yup from "yup";

import { IConta, SERVICE } from "../dashboard.service";

import { useHistory } from "react-router-dom";

import { Formik } from "formik";
import useFetchContas from "../fetchers/useFetchContas.hook";

export enum ETipoConta {
  Banco = "Banco",
  Carteira = "Carteira",
}

interface IModalContasProps {
  show: boolean;
  onHide: (show: boolean) => void;
}

const schema = yup.object({
  nome: yup.string().trim().required().min(1).max(30),
  tipo: yup.string().trim().notOneOf(["-1"]),
});

export const ModalContas = (props: IModalContasProps) => {
  const initialValues: IConta = {
    nome: "",
  };

  const [contasData, errorContas, isLoadingContas] = useFetchContas();

  return (
    <BS.Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <BS.Modal.Header closeButton>
        <BS.Modal.Title id="example-custom-modal-styling-title">
          Inserir nova conta
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values: IConta) => {
            SERVICE.methods
              .createConta(values)
              .then((result) => {
                props.onHide(false);
                // depois de inserir com sucesso, faz refresh à pagina
                window.location.reload();
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
              {/*<div>{JSON.stringify(errors)}</div>*/}
              <BS.Row>
                <BS.Col>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      type="text"
                      name="nome"
                      placeholder="nome da conta"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nome}
                      isValid={touched.nome && !errors.nome}
                    />
                  </BS.Form.Group>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="tipo"
                      placeholder="tipo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tipo}
                      isValid={touched.tipo && !errors.tipo}
                    >
                      <option value="-1">Selecione um</option>
                      <option value="Banco">Banco</option>
                      <option value="Carteira">Carteira</option>
                    </BS.Form.Control>
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
                      props.onHide(false);
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
                  >
                    salvar
                  </BS.Button>
                </BS.Col>
              </BS.Row>
            </BS.Form>
          )}
        </Formik>

        <BS.Container
          className="mt-2 overflow-auto"
          style={{ maxHeight: "300px" }}
        >
          <h5>Contas existentes na BD</h5>
          <BS.Table className="table-sm table">
            <thead>
              <tr>
                <th>id</th>
                <th>nome</th>
                <th>tipo</th>
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {contasData.map((c) => {
                return (
                  <tr>
                    <td>{c.id_conta}</td>
                    <td>{c.nome}</td>
                    <td>{c.tipo}</td>
                    <td>
                      <div
                        role="button"
                        onClick={() => {
                          SERVICE.methods
                            .deleteConta(c.id_conta || -1)
                            .then(() => {})
                            .catch((e) => {});
                        }}
                      >
                        <Icon.Trash></Icon.Trash>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </BS.Table>
        </BS.Container>
      </BS.Modal.Body>
    </BS.Modal>
  );
};

export default ModalContas;
