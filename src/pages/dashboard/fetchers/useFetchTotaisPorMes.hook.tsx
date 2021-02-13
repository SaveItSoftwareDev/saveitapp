import * as React from "react";
import { SERVICE } from "../dashboard.service";

export enum ETipoTotal {
  DEBITO = "DEBITO",
  CREDITO = "CREDITO",
}

export interface ITotalMes {
  tipo: ETipoTotal;
  anoMes: string;
  total: number;
}

export const useFetchTotaisPorMes = (
  tipo: ETipoTotal
): [data: ITotalMes[], error: any, isLoadig: boolean] => {
  const [response, setResponse] = React.useState<ITotalMes[]>([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getTotalMes(tipo).then((r) => {
          setResponse(r);
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

export default useFetchTotaisPorMes;
