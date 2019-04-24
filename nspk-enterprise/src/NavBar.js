import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from './Auth/Auth';

// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  
function ButtonAppBar(props) {
	const { classes } = props;

	const signOut = () => {
		auth0Client.signOut();
		props.history.replace('/');
	};

	return (
	  <div style={styles.root}>
		<AppBar position="static">
		  <Toolbar>
			<IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
				<Link style = {{textDecoration: 'none', color: 'white'}}to={"/"} className="nav-link">
				NSPK
				</Link>
			</IconButton>
			<Typography variant="h6" color="inherit" style={styles.grow}>
				<Link style = {{textDecoration: 'none', color: 'white'}}to={"/profile"} className="nav-link">
					<Button color="inherit">Profile</Button>
				</Link>
				<Link style = {{textDecoration: 'none', color: 'white'}}to={"/employee"} className="nav-link">
					<Button color="inherit">Employee</Button>
				</Link>
				<Link style = {{textDecoration: 'none', color: 'white'}}to={"/about"} className="nav-link">
					<Button color="inherit">About</Button>
				</Link>
			</Typography>
			{
				!auth0Client.isAuthenticated() &&
				// <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
				<Button color="inherit" onClick={auth0Client.signIn}>Sign In</Button>
			}
			{
				auth0Client.isAuthenticated() &&
				<div>
					<label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
					{/* <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button> */}
					<Button color="inherit" onClick={() => {signOut()}}>Sign Out</Button>
				</div>
			}
			{/* <Button color="inherit">Login</Button> */}
		  </Toolbar>
		</AppBar>
	  </div>
	);
  }

// function NavBar(props) {
//   const signOut = () => {
//     auth0Client.signOut();
//     props.history.replace('/');
//   };

//   return (
//     <nav className="navbar navbar-dark bg-primary fixed-top">
//       <Link className="navbar-brand" to="/">
//         NSPK Enterprise
//       </Link>
//       {
//         !auth0Client.isAuthenticated() &&
//         <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
//       }
//       {
//         auth0Client.isAuthenticated() &&
//         <div>
//           <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
//           <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
//         </div>
//       }
//     </nav>
//   );
// }

// export default withRouter(NavBar);
export default withRouter(ButtonAppBar);