import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//import { Typography, Button } from "@material-ui/core";
import "./index.css";
import { borders } from "@material-ui/system";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TopBar from "./TopBar";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: "blue"
  },
  Grid: {}
});

function Employee(props) {
  const { classes } = props;
  var data = [
    {
      name: "Kat",
      department: "Software",
      position: "Manager",
      email: "kat@gmail.com"
    },
    {
      name: "Phuc",
      department: "Software",
      position: "Programmer",
      email: "phuc@gmail.com"
    },
    {
      name: "Steve",
      department: "Sales",
      position: "Coder",
      email: "steve@gmail.com"
    }
  ];
  return (
    <div>
      <TopBar/>
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
          margin: "auto",
          width: "680px"
        }}
      >
      <h2>Employees</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(user => (
              <TableRow>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outlined" color="primary" style={{marginTop: 20}}>
        Edit
      </Button>
      </Paper>
    </Paper>
    </div>
  );
}

Employee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Employee);
