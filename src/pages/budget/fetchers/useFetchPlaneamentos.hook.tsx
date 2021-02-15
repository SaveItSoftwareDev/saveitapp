import * as React from "react";
import { string } from "yup/lib/locale";
import { SERVICE } from "../budget.service";

export interface IPlaneamento{

      id_planeamento: number;
      montante_limite?: number;  
      prazo: string;
      categoria: number;
  }

export const useFetchPlaneamentos = (): [
  data: IPlaneamento[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<IPlaneamento[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getPlaneamentos().then((r) => {
          setResponse([r.data]);
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

export default useFetchPlaneamentos;