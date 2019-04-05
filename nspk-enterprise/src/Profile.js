import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


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
    console.log(this.state.editMode);
    return (
      <div>
        <Paper
          zDepth={2}
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
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={fullName}
                  id="Full Name"
                  label="Enter your full name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={employeeID}
                  id="EmployeeID"
                  label="Enter employee ID"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={dob}
                  id="DateOfBirth"
                  label="your birthday"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8} md={6}>
                <TextField
                  required
                  inputProps={fieldProps}
                  defaultValue={position}
                  id="position"
                  label="position"
                  helperText="your current position"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </React.Fragment>
        </Paper>
        <div style={{justifyContent: 'center', alignItems: 'center', marginLeft:'50'}}>
        {this.state.editMode ? (
          <Button variant="contained" size="large" color="primary">
            Save
          </Button>
        ) : (
          <Button
            variant="contained" size="large"
            onClick={this.handleEdit.bind(this)}
          >
            Edit
          </Button>
        )}
        </div>
      </div>
    );
  }
}

export default Profile;
