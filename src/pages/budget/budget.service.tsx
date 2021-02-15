import axios from "axios";

export interface IOrcamentoData {
  
   id_planeamento?: number,
   id_utilizador: number,
   categoria: number,
   sub_categoria: number,
   montante_limite: number,
   prazo: string,

  }

  const authToken = JSON.parse(localStorage.getItem("token") || "{}");


  const headers = { 
    "Content-Type": "application/json",
    Authorization: `Token ${authToken.auth_token} `,
 };

  export const SERVICE = {
    routes: {
      categorias: "categorias",
      subcategorias: "sub_categorias",
      planeamentos: "planeamentos",
    },

    methods: {

    getCategorias: () => {
      return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.categorias}/`);
    },

    getSubCategorias: () => {
      return axios.get(
        `http://127.0.0.1:8000/${SERVICE.routes.subcategorias}/`
      );
    },

      createBudget: (data: IOrcamentoData) => {
        return axios.post(
          `http://127.0.0.1:8000/${SERVICE.routes.planeamentos}/`,
          data,
          {
            headers,
          }
        );
      },

      getPlaneamentos: () => {
        return axios.get(`http://127.0.0.1:8000/${SERVICE.routes.planeamentos}/`, {
          headers,
        });
      },
    },
  };
  