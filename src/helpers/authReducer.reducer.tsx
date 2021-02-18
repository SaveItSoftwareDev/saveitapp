import { SERVICE } from "../pages/login/login.service";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const doLogout = (history: any) => {
  SERVICE.methods.doLogout().then((r) => {
    localStorage.clear();
    history.push("/login");
  });
};

export const asyncLocalStorage = {
  setItem: function (key: string, value: any) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key: string) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};
