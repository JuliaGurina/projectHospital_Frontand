import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
// import Reception from "./components/reception/Reception"

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        {/* <Route path='/reception' component={Reception} /> */}
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
