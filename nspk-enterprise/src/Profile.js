import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

function Profile() {

    return (
      <div>
       <Typography align='center' fontweight='bold'>Employee information</Typography>
        <div>
        <React.Fragment>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={24}>
          <Grid item xs={8} md={6}>
            <TextField required id="Full Name" label="Enter your full name" fullWidth />
          </Grid>
          <Grid item xs={8} md={6}>
          <Paper>Full name: </Paper>
        </Grid>
          <Grid item xs={8} md={6}>
            <TextField required id="EmployeeID" label="Enter employee ID" fullWidth />
          </Grid>
          <Grid item xs={8} md={6}>
            <TextField required id="DateOfBirth" label="your birthday" fullWidth />
          </Grid>
          <Grid item xs={8} md={6}>
            <TextField
              required
              id="position"
              label="position"
              helperText="your current position"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained">Save</Button>
          </Grid>
        </Grid>
      </React.Fragment>
      </div>
      </div>
  
    );
  }
  export default Profile;