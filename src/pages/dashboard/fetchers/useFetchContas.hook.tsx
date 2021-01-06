import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface IConta {
  id_utilizador: number;
  nome: string;
  saldo: string;
  tipo: string;
}

export const useFetchContas = (): [
  data: IConta[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<IConta[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getContas().then((r) => {
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

export default useFetchContas;
