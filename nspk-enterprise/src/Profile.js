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
		employeeData: undefined,

		 data : {
			employee: 1,
			title: 0,
			salary: 0,
			info: {
				emp_no: "",
				first_name: "",
				last_name: "",
				title: "",
				salary: ""
			}
		}

	}
		this.lastNameChange = this.lastNameChange.bind(this);
		this.firstNameChange = this.firstNameChange.bind(this);
		this.positionChange = this.positionChange.bind(this);
		this.salaryChange = this.salaryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
					this.setState({
						employeeData:result.response[0]});

					this.setState(() => ({
						
						data: {
							...this.state.data,
							info :{
								...this.state.data.info,
								emp_no: result.response[0].emp_no,
								first_name: result.response[0].first_name,
								last_name: result.response[0].last_name,
								title: result.response[0].title,
								salary: result.response[0].salary
							}
						}
					}))


				}
			})
			this.setState({ profile });
	  });
	} else {
	  this.setState({ profile: userProfile });
	}
  }

	lastNameChange(event) {
		this.setState(( {

			data: {
				...this.state.data,
				info: {
					...this.state.data.info,
					last_name: event.target.value

				}
			}
		}))
	}
	firstNameChange(event) {
		this.setState(({

			data: {
				...this.state.data,
				info: {
					...this.state.data.info,
					first_name: event.target.value

				}
			}
		}))
	}

	positionChange(event) {
		this.setState( ({

			data: {
				...this.state.data,
				title: 1,
				info: {
					...this.state.data.info,
					title: event.target.value

				}
			}
		}))
	}

	salaryChange(event) {
		this.setState( ({

			data: {
				...this.state.data,
				salary: 1,
				info: {
					...this.state.data.info,
					salary: event.target.value

				}
			}
		}))
	}
	


	handleSubmit(event) {
		event.preventDefault();

	

		fetch(`http://52.53.107.243:4000/admin/updateinfo`, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(this.state.data), // data can be `string` or {object}!
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				if (result.error == null){
					alert("Edit Succeed!")
				} else if (result.error != null){
					alert("Error!")
				} 
					
				
			});
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
									<form onSubmit={this.handleSubmit}>

										<label>Last Name:</label>	 <br />
										<input type="text" name="LastName" value={this.state.data.info.last_name} onChange={this.lastNameChange} required /><br />
										<label> 
											First Name:
											</label><br />
										<input type="text" name="FirstName" value={this.state.data.info.first_name} onChange={this.firstNameChange} required /><br />
										<label>
											ID:
											</label><br />
										<input type="text" name="ID" value={this.state.data.info.emp_no}  readOnly /><br />

										<label>
											Position:
											</label><br />
										<input type="text" name="Position" value={this.state.data.info.title} onChange={this.positionChange} required /><br />
										<label>
											Salary:
										</label><br />
										<input type="text" name="Salary" value={this.state.data.info.salary} onChange={this.salaryChange} required /><br /><br />
										<input type="submit" value="Submit" />
									</form>
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
