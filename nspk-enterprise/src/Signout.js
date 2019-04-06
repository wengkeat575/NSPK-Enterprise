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
          zDepth={2}
          style={{
            margin: "48px",
            padding: "32px",
            margin: "auto",
            width: "300px"
          }}
        >

<h2>Sign out</h2>
          Are you sure you want to log out?
          <Button
            variant="contained"
            color="secondary"
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
