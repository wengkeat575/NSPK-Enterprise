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
	  const { classes } = this.props;
  
	  return (
		<div>
		  <Button variant="contained" size="large" color="secondary" onClick={this.handleOpen}>
              Connect with Database
          </Button>
		  <Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={this.state.open}
			onClose={this.handleClose}
		  >
			<div className={classes.paper} style={{top: `${20}%`,left: `${50}%`,transform: `translate(-${50}%, -${50}%)`}}>
			<ConnectForm/>
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
      editMode: false
    };
  }

  handleEdit() {
    this.setState({ editMode: true });
  }

  render() {
    if (this.state.editMode) {
      var fieldProps = {
        readOnly: false
      };
    } else {
      var fieldProps = {
        readOnly: true
      };
    }

    var dob = "March 18";
    var fullName = "Kat Tran";
    var employeeID = "1234";
    var position = "CEO";
    var department = "Finance";
    var departmentManager = "none";

    console.log(this.state.editMode);
    return (
      <div>
		{/* <Dialog onClose={()=> alert("Closed")} aria-labelledby="simple-dialog-title">
	        <DialogTitle id="simple-dialog-title">Connect to your account</DialogTitle>
	        <div>
				<ConnectForm/>
	        </div>
		  </Dialog> */}
		  
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
			  width: "480px"
			}}
			>

          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={24}
			  >
            <h2>Employee Profile</h2>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={fullName}
                  id="Full Name"
                  label="Employee Full Name"
                  fullWidth
				  />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={employeeID}
                  id="EmployeeID"
                  label="Employee ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={dob}
                  id="DateOfBirth"
                  label="Date of Birth"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={position}
                  id="position"
                  label="Position"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={departmentManager}
                  id="departmentManager"
                  label="departmentManager"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={department}
                  id="eDept"
                  label="Employee Department"
                  fullWidth
                />
              </Grid>
              <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "50"
          }}
        >
		  <SimpleModalWrapped/>
          {this.state.editMode ? (
            <Button variant="contained" size="large" color="secondary">
              Save
            </Button>
          ) : (
            <Button
				variant="contained" size="large" color="secondary"
            //   variant="contained"
            //   size="large"
            //   justifyContent= "center"
            //   alignItems= "center"
              onClick={this.handleEdit.bind(this)}
            >
              Edit
            </Button>
          )}
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
