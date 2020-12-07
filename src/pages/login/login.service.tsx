import axios from "axios";

export interface ILoginData {
  email: string;
  password: string;
}

export const SERVICE = {
  methods: {
    doLogin: (data: ILoginData) => {
      return axios.post("localhost:3000/login", data);
    },
  },
};
