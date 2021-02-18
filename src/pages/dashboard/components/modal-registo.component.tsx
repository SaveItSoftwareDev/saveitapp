import * as React from "react";
import * as BS from "react-bootstrap";
import * as yup from "yup";

import { IMovimentoData, IConta, SERVICE } from "../dashboard.service";

import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import useFetchCategorias, {
  ICategoria,
} from "../fetchers/useFetchCategorias.hook";

import useFetchSubCategoria, {
  ISubCategoria,
} from "../fetchers/useFetchSubCategorias.hook";

import useFetchContas from "../fetchers/useFetchContas.hook";

export enum ETipoRegisto {
  receita = "receita",
  despesa = "despesa",
}

interface IModalRegistoProps {
  tipo: ETipoRegisto;
  show: boolean;
  onHide: (show: boolean) => void;
}

const schema = yup.object({
  descricao: yup.string().trim().required().min(1).max(30),
  categoria: yup.number().required().notOneOf([-1]),
  sub_categoria: yup.number().notOneOf([-1]),
  montante: yup.number().required().min(0.1).max(10000),
  data: yup.string().required(),
  // recorrencia: yup.string().trim().oneOf(["Mensal", "Anual"]),
  id_conta: yup.number().required().notOneOf([-1]),
  tipo: yup.string().trim(),
});

export const ModalRegisto = (props: IModalRegistoProps) => {
  const initialValues: IMovimentoData = {
    descricao: "",
    categoria: -1,
    sub_categoria: -1,
    montante: 0,
    data: "",
    //recorrencia: "",
    id_conta: -1,
    tipo: props.tipo,
  };

  const [
    categoriasData,
    errorCategorias,
    isLoadingCategorias,
  ] = useFetchCategorias(true);
  const [
    subcategoriasData,
    errorSubcategorias,
    isLoadingSubcategorias,
  ] = useFetchSubCategoria();
  const [contasData, errorContas, isLoadingContas] = useFetchContas(true);

  return (
    <BS.Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <BS.Modal.Header closeButton>
        <BS.Modal.Title id="example-custom-modal-styling-title">
          {props.tipo}
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values: IMovimentoData) => {
            SERVICE.methods
              .createReceita(values)
              .then((result) => {
                // depois de inserir com sucesso, faz refresh à pagina
                window.location.reload();
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
              {/*<div>{JSON.stringify(errors)}</div>*/}
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
                      disabled={isLoadingCategorias}
                    >
                      {isLoadingCategorias ? (
                        <option>Loading...</option>
                      ) : (
                        categoriasData.map((categoria: ICategoria) => (
                          <option value={categoria.id_categoria}>
                            {categoria.nome}
                          </option>
                        ))
                      )}
                    </BS.Form.Control>
                  </BS.Form.Group>
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="sub_categoria"
                      placeholder="subcategoria"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sub_categoria}
                      isValid={touched.sub_categoria && !errors.sub_categoria}
                      disabled={isLoadingCategorias}
                    >
                      {isLoadingSubcategorias ? (
                        <option>Loading...</option>
                      ) : (
                        subcategoriasData.map((subcategoria: ISubCategoria) => (
                          <option value={subcategoria.id_subcategoria}>
                            {subcategoria.nome}
                          </option>
                        ))
                      )}
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

                  {/* <BS.Form.Group>
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
                  </BS.Form.Group> */}
                  <BS.Form.Group>
                    <BS.Form.Control
                      className="italico"
                      as="select"
                      name="id_conta"
                      placeholder="conta"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.id_conta}
                      isValid={touched.id_conta && !errors.id_conta}
                      disabled={isLoadingContas}
                    >
                      {isLoadingContas ? (
                        <option>Loading...</option>
                      ) : (
                        contasData.map((conta: IConta) => (
                          <option value={conta.id_conta}>{conta.nome}</option>
                        ))
                      )}
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
