import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import About from "./About";
import Employee from "./Employee";
import Signout from "./Signout";
import auth0Client from './Auth/Auth';
import Salary from './Salary';

//import Homepage from './Homepage';


class TopBar extends React.Component {
	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this);
	  }
	
	signOut = () => {
		auth0Client.signOut();
		this.props.history.replace('/');
	};


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
              <Link to={"/salary"} className="nav-link">
                  Salary
                </Link>
              </li>
              <li style={{ float: "left", padding: "16px" }}>
              
				{
					!auth0Client.isAuthenticated() &&
					<button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
				}
				{
					auth0Client.isAuthenticated() &&
					<div>
						<label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
						<button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
					</div>
				}
                {/* <Link to={"/signout"} className="nav-link">
                  Sign Out
                </Link> */}
              </li>
            </ul>
          </nav>
          <br style={{ clear: "both" }} />

          </div>
    );
  }
}

export default TopBar;
