import * as React from "react";
import * as BS from "react-bootstrap";
import * as yup from "yup";

import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import { IOrcamentoData, SERVICE } from "../budget.service";

import useFetchCategorias, {
  ICategoria,
} from "../../dashboard/fetchers/useFetchCategorias.hook";


import useFetchSubCategoria, {ISubCategoria,} from "../../dashboard/fetchers/useFetchSubCategorias.hook";


interface IModalOrcamentoProps {
  show: boolean;
  onHide: (show: boolean) => void;
}


const schema = yup.object({

    id_planeamento: yup.number(),
    id_utilizador: yup.number(),
    categoria: yup.number(),
    sub_categoria: yup.number(),
    montante_limite: yup.number().required(),
    //prazo: yup.string().required(),
  });

  const initialValues: IOrcamentoData = {

    id_planeamento: 1,
    id_utilizador: 0,
    categoria: 0,
    sub_categoria: 0,
    montante_limite: 0,
    //prazo: "",
    //prazo: new Date().toDateString(),
    
  };

  export const ModalRegisto = (props: IModalOrcamentoProps) => {
    const history = useHistory();
    const [
      categoriasData,
      errorCategorias,
      isLoadingCategorias,
    ] = useFetchCategorias();
    const [
      subcategoriasData,
      errorSubcategorias,
      isLoadingSubcategorias,
    ] = useFetchSubCategoria();

    return (
      <BS.Modal
        show={props.show}
        onHide={() => props.onHide(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <BS.Modal.Header closeButton>
          <BS.Modal.Title id="example-custom-modal-styling-title">
            Orçamento{" "}
          </BS.Modal.Title>
        </BS.Modal.Header>
        <BS.Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values: IOrcamentoData) => {
              SERVICE.methods
                .createBudget(values)
                .then((result) => {
                  console.log(
                    "Planeamento adicionado com sucesso! -> Redirecionar para não sei"
                  );
                  props.onHide(false);
                })
                .catch((err) => console.log("Erro ao registar planeamento"));
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
                            <option value={categoria.id_categoria}>{categoria.nome}</option>
                    
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
                            <option value={subcategoria.id_subcategoria}>{subcategoria.nome}</option>
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
                        name="montante_limite"
                        placeholder="Montante Limite"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.montante_limite}
                        isValid={touched.montante_limite && !errors.montante_limite}
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
                      />
                    </BS.Form.Group>

  
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