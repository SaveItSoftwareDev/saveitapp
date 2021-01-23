import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface ICategoria {
  id_categoria: number;
  nome: string;
}

export const useFetchCategorias = (): [
  data: ICategoria[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<ICategoria[]>([
    { id_categoria: -1, nome: "Selecione..." },
  ]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getCategorias().then((r) => {
          setResponse([...response, ...r.data]);
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

export default useFetchCategorias;
