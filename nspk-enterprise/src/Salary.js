import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import TopBar from "./TopBar";
<<<<<<< HEAD
import SearchBar from "react-js-search";
import { Button } from "@material-ui/core";
=======
>>>>>>> parent of 3860ca7... Add salary function
var bg = require("./technology.jpg");

const styles = {
  paperContainer: {
<<<<<<< HEAD
    backgroundImage: "url(" + require("./technology.jpg") + ")",
=======
    
>>>>>>> parent of 3860ca7... Add salary function
    height: "100vh"
  },
  height: "100%"
};


class Salary extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
		  
        {/* <TopBar/> */}
        <Paper style={styles.paperContainer}>
          <Paper
            style={{
              margin: "48px",
              padding: "32px",
              margin: "auto",
              width: "680px",
              
            }}
           
          >
            <h2 style={{color:"#131212", textAlign:"center", fontSize:"30px"}}>Employee Salary</h2>
            <div style={{textAlign:"center"}}>
            <input
              placeholder="Enter employee Id"
              value={this.id}
              onChange={this.onSearchChange.bind(this)}
            />
            <Button onClick={this.searchEmployeeId.bind(this)}>
              Search
            </Button>
            </div>
            <List>
=======
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
>>>>>>> parent of 3860ca7... Add salary function
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
                 
<<<<<<< HEAD
                  {this.state.data.map(user => (
                    <TableRow>
                      <TableCell> {user.first_name} </TableCell>
                      <TableCell> {user.last_name} </TableCell>
                      <TableCell> {user.hire_date} </TableCell>
                      <TableCell> {user.title} </TableCell>
                      <TableCell> {user.salary} </TableCell>
                    </TableRow>
                  ))}
=======
>>>>>>> parent of 3860ca7... Add salary function
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
