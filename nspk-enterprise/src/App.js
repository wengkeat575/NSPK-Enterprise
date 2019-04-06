import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import FontSizeChanger from 'react-font-size-changer';
import { withRouter } from "react-router-dom";
import Homepage from "./Homepage.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import About from "./About";
import Employee from "./Employee";
import Signout from "./Signout";

import Profile from "./Profile";
import { BrowserRouter as Switch, Route } from "react-router-dom";

const Header = styled("h1")`
  background: #cbdcf3;
  color: #394351;
  font-size: 45px;
  text-align: center;
`;

const style = {
  height: 500,
  width: 700,
  margin: 20,
  textAlign: "center",
  display: "middle",
  justifyContent: "center",
  alignItems: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  routeChange() {
    //let path = '/homepage';
    // this.props.history.push('/profile');
    console.log("hello");
  }

  render() {
    //const { classes } = this.props;
    return (
      
      <Paper
        style={{
          backgroundImage: "url(" + require("./technology.jpg") + ")",
          height: "100vh"
        }}
      >
          <Grid container justify="center">
            <Paper style={style}>
              <Typography style={{ fontSize: "35px", color: "primary" }}>
                Employee Login
              </Typography>
              <TextField
                id="standard-uncontrolled"
                label="Employee ID"
                type="enter your employee ID"
                autoComplete="current-ID"
                margin="normal"
                variant="filled"
                style={{ Width: 450 }}
              />
              <div />
              <TextField
                id="standar-uncontrolled"
                label="Password"
                type="enter your password"
                autoComplete="current-password"
                margin="normal"
                variant="filled"
                style={{ Width: 450 }}
              />
              <div />
              <Router>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={()=> this.props.history.push('/profile')}
                >
                  Sign In
                </Button>
              </Router>
            </Paper>
          </Grid>
        </Paper>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
