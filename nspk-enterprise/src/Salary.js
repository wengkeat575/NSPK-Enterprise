import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import TopBar from "./TopBar";
var bg = require("./technology.jpg");

const styles = {
  paperContainer: {
    
    height: "100vh"
  },
  height: "100%"
};

class Salary extends Component {
  render() {
    return (
      <div>
		  {/* <TopBar/> */}
      <Paper style={styles.paperContainer}>
        <Paper
          style={{
            margin: "48px",
            padding: "32px",
            margin: "auto",
            width: "480px"
          }}
        >

          <h2>Salary</h2>
          <List>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> First Name </TableCell>
                    <TableCell> Last Name </TableCell>
                    <TableCell> Date </TableCell>
                    <TableCell> Salary </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                </TableBody>
              </Table>
            </List>
        </Paper>
      </Paper>
      </div>
    );
  }
}

export default Salary;
