import axios from "axios";

export interface ILoginData {
  username: string;
  password: string;
}

const authToken = JSON.parse(localStorage.getItem("token") || "{}");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${authToken.auth_token} `,
};

export const SERVICE = {
  routes: {
    login: "api/v1/token/login/",
    me: "api/v1/users/me/",
  },
  methods: {
    doLogin: (data: ILoginData) => {
      return axios.post(`http://127.0.0.1:8000/${SERVICE.routes.login}`, data);
    },
  },
};
