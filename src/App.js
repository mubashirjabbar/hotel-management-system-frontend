import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import React from "react";

import AddReservation from "./screens/addReservation/AddReservation";
import Pagenotfound from "./screens/pagenotfound/Pagenotfound";
import Header from "./components/header/Header";
import Profile from "./screens/profile/Profile";
import Store from '../src/redux/store/store';
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Provider store={Store}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/addReservation" exact component={AddReservation} />
            <Route path="/header" exact component={Header} />
            <Route component={Pagenotfound} />
          </Switch>
        </div>
        </Router>
        </Provider>
    </div>
  );
}

export default App;
