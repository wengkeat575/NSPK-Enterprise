import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TopBar from "./TopBar";
import ConnectForm from "./ConnectForm";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const style = {
  marginLeft: 20
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
	  const { classes, profiledata } = this.props;
  
	  return (
		<div>
			{
				this.props.employeeData == undefined &&
				<Button variant="contained" size="large" color="secondary" onClick={this.handleOpen}>Connect with Database</Button>
			}
		  <Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={this.state.open}
			onClose={this.handleClose}
		  >
			<div className={classes.paper} style={{top: `${20}%`,left: `${50}%`,transform: `translate(-${50}%, -${50}%)`}}>
			<ConnectForm profiledata={profiledata}/>
			</div>
		  </Modal>
		</div>
	  );
	}
  }
  
  SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  // We need an intermediary variable for handling the recursive nesting.
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);
  


class Profile extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  editMode: false,
	  profile: {},
	  employeeData: undefined
	};
  }

  componentWillMount() {
	this.setState({ profile: {} });
	const { userProfile, getProfile, getEmployeeProfile } = this.props.auth;
	if (!userProfile) {
		getProfile((err, profile) => {
			// console.log('profile',profile)
			getEmployeeProfile(profile.email,(result)=>{
				console.log("result",result)
				if (result.connected){
					this.setState({employeeData:result.response[0]})
				}
			})
			this.setState({ profile });
	  });
	} else {
	  this.setState({ profile: userProfile });
	}
  }

  handleEdit() {
	this.setState({ editMode: true });
  }

  render() {
	const { profile, employeeData } = this.state;

	console.log('employeeData',employeeData)
	console.log('profile',profile)
	console.log("name", profile.name)
	if (this.state.editMode) {
	  var fieldProps = {
		readOnly: false
	  };
	} else {
	  var fieldProps = {
		readOnly: true
	  };
	}
	const { classes } = this.props;
	return (
	  <div>
	  <Paper
		style={{
			// backgroundImage: "url(" + require("./technology.jpg") + ")",
			height: "100vh"
		}}
		>
		<Paper
		//   style={{
		// 	  margin: "48px",
		// 	  padding: "32px",
		// 	  margin: "auto",
		// 	  width: "480px"
		// 	}}
			>

		{/* <Grid 
		container spacing={16}
	  justify="center"
	  alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" >
              Text only
            </Typography>
            <div >
              <List>
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                      secondary={'Secondary text'}
                    />
                  </ListItem>
              </List>
            </div>
          </Grid>
	  </Grid> */}
		  <React.Fragment>
			<Grid
			  container
			  direction="column"
			  justify="center"
			  alignItems="center"
			  spacing={50}
			  fullWidth
			  >
			<h2>Employee Profile</h2>
			{
				this.state.employeeData &&
				<div>
					<Grid item xs={12}>
					<ListItemText
                      primary="Employee Last Name"
                      secondary={employeeData.last_name}
                    />

					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.last_name}
					  id="Last Name"
					  label="Employee Last Name"
					  fullWidth
					  /> */}
					</Grid>
					<Grid item xs={12}>
					<ListItemText
                      primary="Employee First Name"
                      secondary={employeeData.first_name}
                    />
					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.first_name}
					  id="First Name"
					  label="Employee First Name"
					  fullWidth
					  /> */}
					</Grid>
					<Grid item xs={12}>
					<ListItemText
                      primary="Employee ID"
                      secondary={employeeData.emp_no}
                    />
					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.emp_no}
					  id="EmployeeID"
					  label="Employee ID"
					  fullWidth
					/> */}
					</Grid>
					<Grid item xs={12}>
					<ListItemText
                      primary="Date of Birth"
                      secondary={new Date(employeeData.emp_no).toISOString().slice(0, 10)}
                    />
					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.birth_date}
					  id="DateOfBirth"
					  label="Date of Birth"
					  fullWidth
					/> */}
					</Grid>
					<Grid item xs={12}>
					<ListItemText
                      primary="Position"
                      secondary={employeeData.title}
                    />
					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.title}
					  id="position"
					  label="Position"
					  fullWidth
					/> */}
					</Grid>
					<Grid item xs={12}>
					<ListItemText
                      primary="Salary"
                      secondary={employeeData.salary}
                    />
					{/* <TextField
					  required
					  inputProps={fieldProps}
					  defaultValue={employeeData.salary}
					  id="salary"
					  label="current salary"
					  fullWidth
					/> */}
					</Grid>
				</div>
			}
			  <div
				  style={{
					justifyContent: "center",
					alignItems: "center",
					marginLeft: "50"
				  }}
				>
		  <SimpleModalWrapped employeeData={this.state.employeeData} profiledata={this.state.profile}/>
		</div>
			</Grid>
		  </React.Fragment>
		</Paper>

	  </Paper>
	  </div>
	);
  }
}

export default Profile;
