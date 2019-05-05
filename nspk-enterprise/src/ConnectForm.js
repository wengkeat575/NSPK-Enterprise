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

class ConnectForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			code:'',
			id:''
		}

	}

  onSubmit = (event) =>{
	  event.preventDefault()
	  console.log(this.state)
	  let data = {
		info: {
			email: this.props.profiledata.email,
			secKey:this.state.code,
			emp_no: this.state.id
		}
	}
	console.log(data)
	  fetch(`http://52.53.107.243:4000/employees/insert`, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers:{
		  'Content-Type': 'application/json'
		}
	  })
	  .then(res => res.json())
	  .then(result =>{
		  console.log("get result data")
		  console.log(result)
	  });
  }
  handleChangeId = (event) =>{
    this.setState({id: event.target.value});
  }
  handleChangeCode = (event) =>{
    this.setState({code: event.target.value});
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
			Connect to your account
		  </Typography>
		  <form className={classes.form}>
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="email">Employee ID</InputLabel>
			  <Input id="Id" name="Id" autoComplete="Id" autoFocus value={this.state.id} onChange={this.handleChangeId}/>
			</FormControl>
			<FormControl margin="normal" required fullWidth>
			  <InputLabel htmlFor="code">Private Code</InputLabel>
			  <Input id="code" type="password" name="code" autoComplete="code" autoFocus value={this.state.code} onChange={this.handleChangeCode}/>
			</FormControl>
			<Button
			  type="submit"
			  fullWidth
			  variant="contained"
			  color="primary"
			  className={classes.submit}
			  onClick={this.onSubmit}
			>
			  Sign in
			</Button>
		  </form>
		</Paper>
	  </main>
	);
}
}

ConnectForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConnectForm);