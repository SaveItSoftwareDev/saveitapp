import axios from "axios";

// export enum EGender {
//   MALE = "Masculino",
//   FEMALE = "Feminino",
// }

export interface IRegisterData {
  firtsName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  city?: string;
  job?: string;
}

export const SERVICE = {
  methods: {
    doRegister: (data: IRegisterData) => {
      return axios.post("localhost:3000/register", data);
    },
  },
};
