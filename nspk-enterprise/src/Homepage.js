import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import About from "./About";
import Employee from "./Employee";
import Signout from "./Signout";
//import Homepage from './Homepage';

const Header = styled("h2")`
  background: #cbdcf3;
  color: #394351;
  font-size: 25px;
  text-align: center;
  margin: 0px;
`;
class Homepage extends React.Component {
  render() {
    return (
      <Router>
            <Header>
              <h1>NSPK</h1>
              
          <Switch>
            <Route path="/signin" component={App} />
            <Route path="/profile" component={Profile} />
            <Route path="/employees" component={Employee} />
            <Route path="/about" component={About} />
            <Route path="/signout" component={Signout} />
          </Switch>
          </Header>
      </Router>
    );
  }
}

export default Homepage;
