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
import EditForm from "./EditForm";
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';

class SimpleModal extends React.Component {
	state = {
	  open: false,
	};
  
	handleOpen = () => {
	  this.setState({ open: true });
	};
  
	handleClose = () => {
	  this.setState({ open: false });
	};
  
	render() {
	  const { classes, profiledata, employeeData } = this.props;
  
	  return (
		<div>
			{
				employeeData != undefined &&
				<Button variant="contained" size="large" color="secondary" onClick={this.handleOpen}>Edit Employee Data</Button>
			}
		<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={this.state.open}
			onClose={this.handleClose}
		>
			<div className={classes.paper} style={{top: `${20}%`,left: `${50}%`,transform: `translate(-${50}%, -${50}%)`}}>
			<EditForm employeeData={employeeData} searchEmployeeId={this.props.searchEmployeeId} handleClose={this.handleClose} auth={this.props.auth}/>
			</div>
		  </Modal>
		</div>
	  );
	}
  }
  
  SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired,
  };


  const styles = theme => ({
	paper: {
	  position: 'absolute',
	  width: theme.spacing.unit * 50,
	//   backgroundColor: theme.palette.background.paper,
	//   boxShadow: theme.shadows[5],
	  padding: theme.spacing.unit * 4,
	  outline: 'none',
	},
	root: {
	  flexGrow: 1,
	  maxWidth: 752,
	},
	demo: {
	  backgroundColor: theme.palette.background.paper,
	},
	title: {
	  margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
	},
  });

  // We need an intermediary variable for handling the recursive nesting.
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);

var bg = require("./technology.jpg");

const styless = {
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
	  user: undefined,
	  id: ""
	};
	
  }

  componentWillMount() {
	this.setState({ profile: {} });
	const { userProfile, getProfile, getEmployeeProfile, employeeData, setemployeeData } = this.props.auth;
	if (!userProfile) {
		getProfile((err, profile) => {
			getEmployeeProfile(profile.email,(result)=>{
				console.log("result",result)
				if (result.connected){
					this.setState({
						employeeData:result.response[0]
					});
				}
			})
			this.setState({ profile });
	  });
	} else {
		if (employeeData){
			this.setState({ profile: userProfile, employeeData });
		} else{
			this.setState({ profile: userProfile });
		}
	}
  }

  onSearchChange(event) {
	this.setState({ id: event.target.value });
  }

  searchEmployeeId() {
	console.log('search');
	var id = this.state.id;
	console.log(`fetching ${id}`);
	const { getIdToken } = this.props.auth;
	const headers = { 'Authorization': `Bearer ${getIdToken()}`}
    axios.get(`http://52.53.107.243:4000/admin/get1employees/${id}?employeeid=${this.state.employeeData.emp_no}`, { headers })
      .then(response => {
		  console.log("response",response)
        this.setState({
			user: response.data.response ? response.data.response[0] : undefined
	    })
	  })
      .catch(error => console.log(error));
	// fetch(`http://52.53.107.243:4000/admin/get1employees/${id}?employeeid=${this.state.employeeData.emp_no}`)
	//   .then(res => res.json())
	//   .then(employees =>
	// 	this.setState({
	// 	  user: employees.response ? employees.response[0] : undefined
	// 	})
	//   );
  }

  componentWillMount() {
	this.setState({ profile: {} });
	const { userProfile, getProfile, getEmployeeProfile, employeeData, setemployeeData } = this.props.auth;
	if (!userProfile) {
		getProfile((err, profile) => {
			getEmployeeProfile(profile.email,(result)=>{
				console.log("result",result)
				if (result.connected){
					this.setState({
						employeeData:result.response[0]
					});
				}
			})
			this.setState({ profile });
	  });
	} else {
		if (employeeData){
			this.setState({ profile: userProfile, employeeData });
		} else{
			this.setState({ profile: userProfile });
		}
	}
  }

  render() {
	const {user, id} = this.state
	return (
	  <div>
		{/* <TopBar/> */}
		<Paper style={styless.paperContainer}>
		  <Paper
			style={{
			  margin: "48px",
			  padding: "32px",
			  margin: "auto",
			  width: "680px",
			  
			}}
		   
		  >
			<h2 style={{color:"#131212", textAlign:"center", fontSize:"30px"}}>Manage Employee Data</h2>
			<div style={{textAlign:"center"}}>
			<input
			  placeholder="Enter Employee Id"
			  value={id}
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
					<TableRow>
					  <TableCell> {user ? user.first_name : ""} </TableCell>
					  <TableCell> {user ? user.last_name : ""} </TableCell>
					  <TableCell> {user ? user.hire_date : ""} </TableCell>
					  <TableCell> {user ? user.title : ""} </TableCell>
					  <TableCell> {user ? user.salary : ""} </TableCell>
					</TableRow>
				</TableBody>
			  </Table>
			</List>
			<div style={{textAlign:"center"}}>
			<SimpleModalWrapped employeeData={this.state.user} profiledata={this.state.profile} searchEmployeeId={this.searchEmployeeId.bind(this)} auth={this.props.auth}/>
			</div>
		  </Paper>
		</Paper>
	  </div>
	);
  }
}

export default Salary;