import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
	root: {
	  flexGrow: 1,
	},
	grow: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginLeft: -12,
	  marginRight: 20,
	},
  };
  

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
  		<AppBar position="static">
		  <Toolbar>
			<IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
				<Link style = {{textDecoration: 'none', color: 'white'}}to={"/"} className="nav-link">
				NSPK
				</Link>
			</IconButton>
			<Typography variant="h6" color="inherit" style={styles.grow}>
				{
					isAuthenticated() &&
					<div>
						<Link style = {{textDecoration: 'none', color: 'white'}}to={"/profile"} className="nav-link">
							<Button color="inherit">Profile</Button>
						</Link>
						<Link style = {{textDecoration: 'none', color: 'white'}}to={"/employees"} className="nav-link">
							<Button color="inherit">Employee</Button>
						</Link>
						<Link style = {{textDecoration: 'none', color: 'white'}}to={"/salary"} className="nav-link">
							<Button color="inherit">Salary</Button>
						</Link>
						<Link style = {{textDecoration: 'none', color: 'white'}}to={"/about"} className="nav-link">
							<Button color="inherit">About</Button>
						</Link>
						

					</div>
				}
			</Typography>
			{
				!isAuthenticated() &&
				<Button color="inherit" onClick={this.login.bind(this)}>Sign In</Button>
			}
			{
				isAuthenticated() &&
				<div>
					<Button color="inherit" onClick={this.logout.bind(this)}>Sign Out</Button>
				</div>
			}
		  </Toolbar>
		</AppBar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
