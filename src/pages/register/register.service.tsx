import axios from "axios";

// export enum EGender {
//   MALE = "Masculino",
//   FEMALE = "Feminino",
// }

export interface IRegisterData {
  //primeiro_nome: string;
  //ultimo_nome: string;
  username: string;
  email: string;
  password: string;
  //idade?: number;
  //  genero?: string;
  //cidade?: string;
  //profissao?: string;
}

const headers = { "Content-Type": "application/json" };

export const SERVICE = {
  routes: {
    perfis: "api/v1/users",
  },
  methods: {
    doRegister: (data: IRegisterData) => {
      return axios.post(
        `http://127.0.0.1:8000/${SERVICE.routes.perfis}/`,
        data,
        {
          headers,
        }
      );
    },
  },
};
