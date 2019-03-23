import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

import withStyles from "@material-ui/core/styles/withStyles";

import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FontSizeChanger from 'react-font-size-changer';

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
          defaultValue="enter your unique employee Id"
          
          margin="normal"
        />
       
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