import * as React from "react";
import * as BS from "react-bootstrap";
import * as yup from "yup";

import { IRegistoData, SERVICE } from "../dashboard.service";

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
    .required()
    .min(2)
    .max(30),
  subcategoria: yup.string().min(2).max(100),
  montante: yup.number().required(),
  data: yup.date().required(),
  recorrencia: yup.string().oneOf(["Mensal", "Anual"]),
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
  return (
    <BS.Modal
      show={props.show}
      onHide={() => props.onHide(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <BS.Modal.Header closeButton>
        <BS.Modal.Title id="example-custom-modal-styling-title">
          Custom Modal Styling
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body></BS.Modal.Body>
    </BS.Modal>
  );
};

export default ModalRegisto;
