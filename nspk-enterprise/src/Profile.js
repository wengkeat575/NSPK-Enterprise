import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TopBar from "./TopBar";
import ConnectForm from "./ConnectForm";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
const style = {
  marginLeft: 20
};

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
		<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
	        <DialogTitle id="simple-dialog-title">Connect to your account</DialogTitle>
	        <div>
				<ConnectForm/>
	        </div>
	      </Dialog>
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
          {this.state.editMode ? (
            <Button variant="contained" size="large" color="primary">
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              justifyContent= "center"
              alignItems= "center"
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
