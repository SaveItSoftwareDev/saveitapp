import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface ISubCategoria {
  id_categoria: { id_categoria: number; nome?: string };
  nome: string;
  id_subcategoria: number;
}

export const useFetchSubCategorias = (): [
  data: ISubCategoria[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<ISubCategoria[]>([
    {
      id_subcategoria: -1,
      id_categoria: { id_categoria: -1 },
      nome: "Selecione...",
    },
  ]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getSubCategorias().then((r) => {
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

export default useFetchSubCategorias;
