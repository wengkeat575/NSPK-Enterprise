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
import List from "@material-ui/core/List";

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

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      desired_page: 1,
      page: 1
    };
  }

  handleNext() {
    this.setState(state => ({ desired_page: state.desired_page + 1 }));
    this.componentWillMount();
  }

  handlePrev() {
    this.setState(state => ({
      desired_page: Math.max(state.desired_page - 1, 1)
    }));
  }

  componentWillMount() {
    var page = this.state.desired_page;
    fetch(`http://localhost:4000/getallemployees?page=${page}`)
      .then(res => res.json())
      .then(employees =>
        this.setState({
          data: employees,
          page: page
        })
      );
  }

  render() {
    return (
      <div>
        {/* <TopBar/> */}
        <Paper
          style={{
            backgroundImage: "url(" + require("./technology.jpg") + ")",
            height: "100vh",
            overflow: "auto"
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
            <h2> Employees Page {this.state.page} </h2>
            <Button
              variant="contained"
              size="large"
              justifyContent="center"
              alignItems="center"
              onClick={this.handlePrev.bind(this)}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              size="large"
              justifyContent="center"
              alignItems="center"
              onClick={this.handleNext.bind(this)}
            >
              Next
            </Button>
            <List>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> First Name </TableCell>
                    <TableCell> Last Name </TableCell>
                    <TableCell> Department </TableCell>
                    <TableCell> Position </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map(user => (
                    <TableRow>
                      <TableCell> {user.first_name} </TableCell>
                      <TableCell> {user.last_name} </TableCell>
                      <TableCell> {user.dept_name} </TableCell>
                      <TableCell> {user.title} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Employee);
