import axios from "axios";
import { string } from "yup";

export interface ILoginData {
  username: string;
  password: string;
}

export const SERVICE = {
  methods: {
    doLogin: (data: ILoginData) => {
      axios.post("localhost:3000/login", data);
    },
  },
};
