import axios from "axios";

export interface IRegistoData {
  descricao: string;
  categoria: string;
  subcategoria?: string;
  montante: number;
  data: string;
  recorrencia?: string;
}

const headers = { "Content-Type": "application/json" };

export const SERVICE = {
  routes: {
    perfis: "perfis",
  },
  methods: {
    doRegister: (data: IRegistoData) => {
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
