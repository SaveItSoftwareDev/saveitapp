import * as React from "react";
import { SERVICE } from "../dashboard.service";

export interface IMe {
  username: string;
  email: string;
}

export const useFetchMe = (): [data: IMe, error: any, isLoadig: boolean] => {
  const [response, setResponse] = React.useState<IMe>({
    email: "",
    username: "",
  });
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      try {
        const meOnLocalStorage = JSON.parse(
          localStorage.getItem("me") || "{}"
        ) as IMe;

        if (meOnLocalStorage.username) {
          setResponse(meOnLocalStorage);
          setIsLoading(false);
        } else {
          SERVICE.methods.getMe().then((r) => {
            setResponse(r.data);
            localStorage.setItem("me", JSON.stringify(r.data));
            setIsLoading(false);
          });
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return [response, error, isLoading];
};

export default useFetchMe;
