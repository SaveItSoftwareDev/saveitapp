import axios from "axios";
import { ETipoTotal, ITotalMes } from "./fetchers/useFetchTotaisPorMes.hook";

export interface IMovimentoData {
  id_conta: number;
  tipo: string;
  descricao: string;
  categoria: number;
  sub_categoria: number;
  montante: number;
  data: string;
  recorrencia?: string;
}

export interface IConta {
  id_conta?: number;
  id_utilizador?: number;
  nome: string;
  saldo?: string;
  tipo?: string;
}

const authToken = JSON.parse(localStorage.getItem("token") || "{}");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${authToken.auth_token} `,
};

// https://www.w3schools.com/js/js_random.asp
const randomValue = () => {
  return Math.floor(Math.random() * 10000);
};

export const SERVICE = {
  routes: {
    perfis: "perfis",
    categorias: "categorias",
    subcategorias: "sub_categorias",
    registo: "registo",
    contas: "contas",
    me: "api/v1/users/me",
    totalMes: "totalMes",
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

    getTotalMes: (tipo: ETipoTotal) => {
      return new Promise<ITotalMes[]>((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { tipo, anoMes: "01/01/2020", total: randomValue() },
            { tipo, anoMes: "01/02/2020", total: randomValue() },
            { tipo, anoMes: "01/03/2020", total: randomValue() },
            { tipo, anoMes: "01/04/2020", total: randomValue() },
            { tipo, anoMes: "01/05/2020", total: randomValue() },
            { tipo, anoMes: "01/06/2020", total: randomValue() },
            { tipo, anoMes: "01/07/2020", total: randomValue() },
            { tipo, anoMes: "01/08/2020", total: randomValue() },
            { tipo, anoMes: "01/09/2020", total: randomValue() },
            { tipo, anoMes: "01/10/2020", total: randomValue() },
            { tipo, anoMes: "01/11/2020", total: randomValue() },
            { tipo, anoMes: "01/12/2020", total: randomValue() },
          ]);
        }, 1000);
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

    createConta: (data: IConta) => {
      return axios.post(
        `http://127.0.0.1:8000/${SERVICE.routes.contas}/`,
        data,
        {
          headers,
        }
      );
    },

    deleteConta: (id: number) => {
      return axios.delete(
        `http://127.0.0.1:8000/${SERVICE.routes.contas}/${id}/`,
        {
          headers,
        }
      );
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
    getMe: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.me}/`, {
        headers,
      });
    },
  },
};
