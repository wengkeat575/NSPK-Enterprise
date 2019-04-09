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
          NSPK Inc. operates and markets a personal services mobile application.
          NSPK started in San Jose, California in January 2019. 
          NPSK offers all sorts of personal services to any people who needed help during their busy schedule. 
          NPSK is the fastest enterprise company to earned 1 billion dollars in the first quarter of the year.    
        </Paper>
      </Paper>
      </div>
    );
  }
}

export default About;
