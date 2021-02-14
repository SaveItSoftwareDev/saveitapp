import * as React from "react";
import { SERVICE, IConta } from "../dashboard.service";

export const useFetchContas = (
  addSelectOption?: boolean
): [data: IConta[], error: any, isLoadig: boolean] => {
  const [contas, setContas] = React.useState<IConta[]>(
    addSelectOption
      ? [
          {
            id_conta: -1,
            id_utilizador: -1,
            nome: "Selecione...",
            saldo: "",
            tipo: "",
          },
        ]
      : []
  );
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        SERVICE.methods.getContas().then((r) => {
          setContas([...contas, ...r.data]);
          setIsLoading(false);
        });
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return [contas, error, isLoading];
};

export default useFetchContas;
