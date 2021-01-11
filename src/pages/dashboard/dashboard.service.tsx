import axios from "axios";

export interface IMovimentoData {
  id_utilizador: number;
  descricao: string;
  categoria: number;
  sub_categoria?: number;
  montante: number;
  data: string;
  recorrencia?: string;
  id_conta: number;
  tipo: string;
}

const headers = { "Content-Type": "application/json" };

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
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.categorias}/`);
    },

    getSubCategorias: () => {
      return axios.get(
        `http://127.0.0.1:8000/${SERVICE.routes.subcategorias}/`
      );
    },

    getContas: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.contas}/`);
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
  },
};
