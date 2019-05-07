import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	componentWillMount() {
		this.setState({ profile: {} });
		const { userProfile, getProfile, getEmployeeProfile, employeeData, setemployeeData, isAuthenticated } = this.props.auth;
		if (!userProfile) {
			if (isAuthenticated()){
				getProfile((err, profile) => {
					getEmployeeProfile(profile.email,(result)=>{
						console.log("result",result)
						if (result.connected){
							this.setState({
								employeeData:result.response[0]
							});
							this.forceUpdate();
						}
					})
					this.setState({ profile });
			  });
			}
		} else {
			if (employeeData){
				this.setState({ profile: userProfile, employeeData });
			} else{
				this.setState({ profile: userProfile });
			}
		}

	  }

  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in! You can now view your{' '}
                <Link to="profile">profile now!</Link>
                .
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                Wellcome to NSPK Enterprise! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
