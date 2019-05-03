import React, { Component } from "react";
import TopBar from "./TopBar";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

var bg = require("./technology.jpg");

const styles = {
  paperContainer: {
    backgroundImage: "url(" + bg + ")"
  }
};



class Signout extends Component {
  render() {
    return (
        <div><TopBar/>
      <Paper
        style={{
          backgroundImage: "url(" + require("./technology.jpg") + ")",
          height: "100vh"
        }}
      >
        <Paper
          style={{
            margin: "48px",
            padding: "32px",
            width: "300px"            
          }}
        >

            <h2>Sign out</h2>
            <h3>Are you sure you want to log out?</h3>
          
          <Button
            variant="contained"
            color="secondary"
            style={{marginRight: 20}}
            onClick={()=> this.props.history.push('/signin')}
          >
            {" "}
            Yes
          </Button>
          <Button variant="contained" color="primary">
            No
          </Button>
          
        </Paper>
      </Paper>
      </div>
    );
  }
}

export default Signout;
