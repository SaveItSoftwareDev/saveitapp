import axios from "axios";

export interface IMovimentoData {
  id_conta: number;
  id_utilizador: number;
  tipo: string;
  descricao: string;
  categoria: number;
  sub_categoria: number;
  montante: number;
  data: string;
  recorrencia?: string;
}

const authToken = JSON.parse(localStorage.getItem("token") || "{}");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${authToken.auth_token} `,
};

export const SERVICE = {
  routes: {
    perfis: "perfis",
    categorias: "categorias",
    subcategorias: "sub_categorias",
    registo: "registo",
    contas: "contas",
  },
  methods: {
    getSaldoTotal: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            saldoTotal: 13464.23,
            currency: "€",
          });
        }, 2000);
      });
    },

    getCategorias: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.categorias}/`, {
        headers,
      });
    },

    getSubCategorias: () => {
      return axios.get(
        `http://127.0.0.1:8000/${SERVICE.routes.subcategorias}/`,
        { headers }
      );
    },

    getContas: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.contas}/`, {
        headers,
      });
    },

    createReceita: (data: IMovimentoData) => {
      return axios.post(
        `http://127.0.0.1:8000/${SERVICE.routes.registo}/`,
        data,
        {
          headers,
        }
      );
    },
    getRegistos: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.registo}/`, {
        headers,
      });
    },
  },
};
