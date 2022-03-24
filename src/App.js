import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Home from "./screens/home/Home";
import Login from "./screens/login/Login";
import Signup from "./screens/signup/Signup";
import Pagenotfound from "./screens/pagenotfound/Pagenotfound";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route component={Pagenotfound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
