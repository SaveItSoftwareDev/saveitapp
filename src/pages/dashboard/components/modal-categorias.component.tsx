import * as BS from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

import * as yup from "yup";

import { SERVICE } from "../dashboard.service";

import { Formik } from "formik";
import useFetchCategorias, {
  ICategoria,
} from "../fetchers/useFetchCategorias.hook";

interface IModalCategoriasProps {
  show: boolean;
  onHide: (show: boolean) => void;
}

const schema = yup.object({
  nome: yup.string().trim().required().min(1).max(30),
});

export const ModalCategorias = (props: IModalCategoriasProps) => {
  const initialValues: ICategoria = {
    nome: "",
  };

  const [
    categoriasData,
    errorCategorias,
    isLoadingCategorias,
  ] = useFetchCategorias(false);

  return (
    <BS.Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <BS.Modal.Header closeButton>
        <BS.Modal.Title id="example-custom-modal-styling-title">
          Inserir nova categoria
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values: ICategoria) => {
            SERVICE.methods
              .createCategoria(values)
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
                      placeholder="nome da categoria"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nome}
                      isValid={touched.nome && !errors.nome}
                    />
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
          <h5>Categorias existentes na BD</h5>
          <BS.Table className="table-sm table">
            <thead>
              <tr>
                <th>id</th>
                <th>nome</th>
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {categoriasData.map((cat) => {
                return (
                  <tr>
                    <td>{cat.id_categoria}</td>
                    <td>{cat.nome}</td>
                    <td>
                      <div
                        role="button"
                        onClick={() => {
                          SERVICE.methods
                            .deleteCategoria(cat.id_categoria || -1)
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

export default ModalCategorias;
