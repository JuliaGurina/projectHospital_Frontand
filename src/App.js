import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";


import './App.css';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>

  );
}

export default App;
