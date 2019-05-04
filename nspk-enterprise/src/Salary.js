import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import SearchBar from "react-js-search";
import { Button } from "@material-ui/core";

var bg = require("./technology.jpg");

const styles = {
  paperContainer: {

    backgroundImage: "url(" + require("./technology.jpg") + ")",
    height: "100vh"
  },
  height: "100%"
};

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.id = 0;
  }

  onSearchChange(event) {
    this.id = event.target.value;
    console.log(event.target.value);
    this.setState({ a: 1 });
  }

  searchEmployeeId() {
    console.log('search');
    this.componentWillMount();
  }

  componentWillMount() {
    var id = this.id;
    console.log(`fetching ${id}`);
    fetch(`http://localhost:4000/admin/get1employees/${id}`)
      .then(res => res.json())
      .then(employees =>
        this.setState({
          data: employees.response ? employees.response : []
        })
      );
  }
  render() {
    console.log(this.state.data);
    return (
      <div>
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> First Name </TableCell>
                    <TableCell> Last Name </TableCell>
                    <TableCell> Hired Date </TableCell>
                    <TableCell> Title </TableCell>
                    <TableCell> Salary </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map(user => (
                    <TableRow>
                      <TableCell> {user.first_name} </TableCell>
                      <TableCell> {user.last_name} </TableCell>
                      <TableCell> {user.hire_date} </TableCell>
                      <TableCell> {user.title} </TableCell>
                      <TableCell> {user.salary} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
            <div style={{textAlign:"center"}}>
            <Button variant="contained" size="large" color="secondary">
              Edit
            </Button>
            </div>
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default Salary;
