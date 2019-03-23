import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import FontSizeChanger from 'react-font-size-changer';
import { withRouter } from 'react-router-dom';

const Header = styled('h1')`
  background: #CBDCF3;
  color: #394351;
  font-size: 45px;
  text-align: center;
`

const style = {
  height: 500,
  width: 700,
  margin: 20,
  textAlign: 'center',
  display: 'middle',
  justifyContent:'center', 
  alignItems:'center',
};

class App extends React.Component{

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = `newPath`;
    this.props.history.push(path);
  }


  render() {
    //const { classes } = this.props;
    return (
      <div> 
      <div>
            <Header>
              NSPK
            </Header>
      </div>
      <div>
        <Grid container justify = "center">
    <Paper style={style} >
    <Typography  style={{'fontSize': '35px', color : 'primary'}}>
      Employee LogIn
      </Typography>
      <TextField
          id="standard-uncontrolled"
          label="Employee ID"
          type="enter your employee ID"
          autoComplete="current-ID"
          margin="normal"
          variant="filled"
          style={{ Width:450 }}
        />
        <div></div>
        <TextField
          id="standar-uncontrolled"
          label="Password"
          type="enter your password"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
          style={{ Width:450 }}
        />
       <div></div>
       
       <Button variant="contained" size="large" color="primary" onClick="this.routeChange">
        Sign In
      </Button>
      
  </Paper> 
  </Grid>
  </div>
     </div>
      );
   }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(App);