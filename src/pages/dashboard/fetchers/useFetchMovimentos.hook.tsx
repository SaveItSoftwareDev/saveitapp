import * as React from "react";
import { string } from "yup/lib/locale";
import { SERVICE } from "../dashboard.service";

export interface IMovimento {
  categoria: {
    id_categoria: number;
    nome: string;
  };
  data: string;
  descricao: string;
  id_conta: {
    id_conta: number;
    nome: string;
    saldo: string;
    tipo: string;
  };
  montante: string;
  sub_categoria: {
    id_subcategoria: number;
    id_categoria: {
      id_categoria: number;
      nome: string;
    };
    nome: string;
  };
  tipo: string;
}

export const useFetchMovimentos = (): [
  data: IMovimento[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<IMovimento[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getRegistos().then((r) => {
          setResponse(r.data);
          setIsLoading(false);
        });
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return [response, error, isLoading];
};

export default useFetchMovimentos;
