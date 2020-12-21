import * as React from "react";
import { SERVICE } from "../dashboard.service";

interface ISaldoTotal {
  saldoTotal: string;
  currency: string;
}

export const useFetchSaldoTotal = (): [
  data: ISaldoTotal,
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<ISaldoTotal>({
    saldoTotal: "0",
    currency: "€",
  });
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getSaldoTotal().then((r) => {
          setResponse(r as ISaldoTotal);
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

export default useFetchSaldoTotal;
