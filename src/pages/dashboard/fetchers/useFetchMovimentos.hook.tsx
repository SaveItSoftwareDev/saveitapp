import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface IMovimento {
  categoria: number;
  data: string;
  descricao: string;
  id_conta: number;
  montante: string;
  sub_categoria: number;
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
          debugger;
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
