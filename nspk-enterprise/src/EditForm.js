import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class EditForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			info: {
				id: "",
				emp_no: "",
				first_name: "",
				last_name: "",
				title: "",
				salary: ""
			}
		}
		this.lastNameChange = this.lastNameChange.bind(this);
		this.firstNameChange = this.firstNameChange.bind(this);
		this.positionChange = this.positionChange.bind(this);
		this.salaryChange = this.salaryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	// componentWillMount(){
	// }
	componentWillMount() {
		this.setState({info: this.props.employeeData})
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
	lastNameChange(event) {
		this.setState( {
			info: {
				...this.state.info,
				last_name: event.target.value
			}
		})
	}
	firstNameChange(event) {
		this.setState({
			info: {
				...this.state.info,
				first_name: event.target.value
			}
		})
	}

	positionChange(event) {
		this.setState({
			info: {
				...this.state.info,
				title: event.target.value
			}
		})
	}

	salaryChange(event) {
		this.setState({
			info: {
				...this.state.info,
				salary: event.target.value
			}
		})
	}
	


	handleSubmit(event) {
		event.preventDefault();
		let postbody = JSON.stringify(this.state.info)
		console.log('postbody', postbody)
		const { getIdToken } = this.props.auth;
		const headers = { 'Authorization': `Bearer ${getIdToken()}`}
		axios.post(`http://52.53.107.243:4000/admin/updateinfo?employeeid=${this.state.employeeData.emp_no}`,this.state.info, { headers })
		  .then(result => {
			console.log("result",result)
			if (result.data.error == null){
				alert("Edit Succeed!")
				this.props.searchEmployeeId()
				this.props.handleClose()
			} else if (result.data.error != null){
				alert("Error!")
			} 
		  })
		  .catch(error => console.log(error));
		
		//   fetch(`http://52.53.107.243:4000/admin/updateinfo?employeeid=${this.state.employeeData.emp_no}`, {
		// 	method: 'POST', // or 'PUT'
		// 	body: postbody, // data can be `string` or {object}!
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// })
		// 	.then(res => res.json())
		// 	.then(result => {
		// 		console.log("result",result)
		// 		if (result.error == null){
		// 			alert("Edit Succeed!")
		// 			this.props.searchEmployeeId()
		// 			this.props.handleClose()
		// 		} else if (result.error != null){
		// 			alert("Error!")
		// 		} 
		// 	});
	}

render(){
	const { classes } = this.props;
	return (
	  <main className={classes.main}>
		<CssBaseline />
		<Paper className={classes.paper}>
		  <Avatar className={classes.avatar}>
			<LockOutlinedIcon />
		  </Avatar>
		  <Typography component="h1" variant="h5">
			Edit Employee Data
		  </Typography>
		  <form className={classes.form}>
			{/* <FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="email">Employee ID</InputLabel>
			  <Input id="Id" name="Id" autoComplete="Id" autoFocus value={this.state.info.id} onChange={this.handleChangeId}/>
			</FormControl> */}
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="code">Last Name</InputLabel>
			  <Input autoComplete="code" autoFocus value={this.state.info.last_name} onChange={this.lastNameChange}/>
			</FormControl>
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="code">First Name</InputLabel>
			  <Input autoComplete="code" autoFocus value={this.state.info.first_name} onChange={this.firstNameChange}/>
			</FormControl>
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="code">Position</InputLabel>
			  <Input autoComplete="code" autoFocus value={this.state.info.title} onChange={this.positionChange}/>
			</FormControl>
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="code">Salary</InputLabel>
			  <Input autoComplete="code" autoFocus value={this.state.info.salary} onChange={this.salaryChange}/>
			</FormControl>
			<Button
			  type="submit"
			  fullWidth
			  variant="contained"
			  color="primary"
			  className={classes.submit}
			  onClick={this.handleSubmit}
			>
			  Save
			</Button>
		  </form>
		</Paper>
	  </main>
	);
}
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditForm);