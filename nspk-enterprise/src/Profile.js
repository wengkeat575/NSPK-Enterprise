import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TopBar from "./TopBar";

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
        <TopBar/>
      <Paper
        style={{
          backgroundImage: "url(" + require("./technology.jpg") + ")",
          height: "100vh"
        }}
      >
        <Paper
          zDepth={2}
          style={{
            margin: "48px",
            padding: "32px",
            margin: "auto",
            width: "480px"
          }}
        >
        <h2>Profile</h2>
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={24}
            >
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
            </Grid>
          </React.Fragment>
        </Paper>
        <Grid container direction="row" justify="right" alignItems="center">
          edit
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
              onClick={this.handleEdit.bind(this)}
            >
              Edit
            </Button>
          )}
        </div>
      </Paper>
      </div>
    );
  }
}

export default Profile;
