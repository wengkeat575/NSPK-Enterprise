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
import { BrowserRouter as Router } from "react-router-dom";


import auth0Client from './Auth/Auth';

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

  login = () =>{
	auth0Client.signIn();
	this.props.history.push('/profile')
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
          {/* <Grid container justify="center">
            <Paper style={style}>
              <Typography style={{ fontSize: "35px", color: "primary"}}>
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
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={this.login}
                >
                  Sign In
                </Button>
            </Paper>
          </Grid> */}
        </Paper>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
