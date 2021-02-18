import * as React from "react";
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

export const useFetchMovimentos = (
  page: number
): [data: IMovimento[], dataSize: number, error: any, isLoadig: boolean] => {
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

  const start = page === 1 ? 0 : page * 10;
  const end = start + 10;
  return [response.slice(start, end), response.length, error, isLoading];
};

export default useFetchMovimentos;
