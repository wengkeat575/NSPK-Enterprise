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


class TopBar extends React.Component {
  render() {
    return (
<div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul style={{ "list-style": "none" }} className="navbar-nav mr-auto">
              
                <li style={{ float: "left", padding: "16px" }}>
                <Link to={"/profile"} className="nav-link">
                  {" "}
                  Profile{" "}
                </Link>
              </li>
              <li style={{ float: "left", padding: "16px" }}>
                <Link to={"/employees"} className="nav-link">
                  Employee
                </Link>
              </li>
              <li style={{ float: "left", padding: "16px" }}>
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
              <li style={{ float: "left", padding: "16px" }}>
                <Link to={"/signout"} className="nav-link">
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
          <br style={{ clear: "both" }} />

          </div>
    );
  }
}

export default TopBar;
