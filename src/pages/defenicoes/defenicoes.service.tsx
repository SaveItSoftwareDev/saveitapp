import axios from "axios";

// export enum EGender {
//   MALE = "Masculino",
//   FEMALE = "Feminino",
// }

export interface IRegisterData {
  primeiro_nome: string;
  ultimo_nome: string;
  email: string;
  //  password: string;
  idade?: number;
  //  genero?: string;
  cidade?: string;
  profissao?: string;
}

const headersNotAuth = { "Content-Type": "application/json" };

const authToken = JSON.parse(localStorage.getItem("token") || "{}");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${authToken.auth_token} `,
};

export const SERVICE = {
  routes: {
    perfis: "perfis",
    me: "api/v1/users/me",
  },
  methods: {
    doRegister: (data: IRegisterData) => {
      return axios.post(
        `http://127.0.0.1:8000/${SERVICE.routes.perfis}/`,
        data,
        {
          headers: headersNotAuth,
        }
      );
    },
    getMe: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.me}/`, {
        headers,
      });
    },
  },
};
