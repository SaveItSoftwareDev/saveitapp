import axios from "axios";

export interface IDefinicoesData {
  email: string;
  current_password: string;
  new_password: string;
}

const authToken = JSON.parse(localStorage.getItem("token") || "{}");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${authToken.auth_token} `,
};

export const SERVICE = {
  routes: {
    update: "api/v1/users/set_password",
    delete: "api/v1/users/me",
    me: "api/v1/users/me",
  },
  methods: {
    doUpdate: (data: IDefinicoesData) => {
      return axios.post(
        `http://127.0.0.1:8000/${SERVICE.routes.update}/`,

        data,
        {
          headers,
        }
      );
    },

    delete: (current_password: string) => {
      return axios.delete(
        `http://127.0.0.1:8000/${SERVICE.routes.delete}/`,

        {
          headers,
          data: { current_password },
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
