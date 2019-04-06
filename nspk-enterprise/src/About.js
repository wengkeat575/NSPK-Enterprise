import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";

import TopBar from "./TopBar";
var bg = require("./technology.jpg");

const styles = {
  paperContainer: {
    backgroundImage: "url(" + bg + ")",
    height: "100vh"
  },
  height: "100%"
};

class About extends Component {
  render() {
    return (
      <div><TopBar/>
      <Paper style={styles.paperContainer}>
        <Paper
          style={{
            margin: "48px",
            padding: "32px",
            margin: "auto",
            width: "480px"
          }}
        >

<h2>About</h2>
          NSPK is an
        </Paper>
      </Paper>
      </div>
    );
  }
}

export default About;
