import axios from "axios";

export interface ILoginData {
  username: string;
  password: string;
}

export const SERVICE = {
  routes: {
    login: "api/v1/token/login/",
  },
  methods: {
    doLogin: (data: ILoginData) => {
      return axios.post(`http://127.0.0.1:8000/${SERVICE.routes.login}`, data);
    },
  },
};
