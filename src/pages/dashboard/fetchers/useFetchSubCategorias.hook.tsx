import * as React from "react";
import { SERVICE } from "../dashboard.service";
import { ICategoria } from "../fetchers/useFetchCategorias.hook";

export const useFetchSubCategorias = (): [
  data: ICategoria[],
  error: any,
  isLoadig: boolean
] => {
  const [response, setResponse] = React.useState<ICategoria[]>([]);
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
