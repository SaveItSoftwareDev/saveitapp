import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface ISubCategoria {
  //id: number;
  nome: string;
  id_categoria: number;
  id_utilizador: number;
}

export const useFetchSubCategorias = (): [
  data: ISubCategoria[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<ISubCategoria[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getSubCategorias().then((r) => {
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

export default useFetchSubCategorias;
