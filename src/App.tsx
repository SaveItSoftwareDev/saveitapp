import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import { DashboarPage } from "./pages/dashboard/dashboard.page";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";

function App() {
  return (
    <BrowserRouter>
      {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
      <Switch>
        <Route exact path="/" render={() => <LoginPage />}></Route>
        <Route exact path="/dashboard" render={() => <DashboarPage />}></Route>
        <Route exact path="/login" render={() => <LoginPage />}></Route>
        <Route exact path="/register" render={() => <RegisterPage />}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
