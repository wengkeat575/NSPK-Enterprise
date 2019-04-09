import React, { Component } from "react";
import TopBar from "./TopBar";
import Paper from "@material-ui/core/Paper";


var bg = require("./technology.jpg");

const styles = {
  paperContainer: {
    backgroundImage: "url(" + bg + ")"
  }
};

class Salary extends React.Component {
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
            hello
        </Paper>
      </Paper>
      </div>
    );
  }
}

export default Salary;
