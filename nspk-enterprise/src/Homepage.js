import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from './Profile';
import About from './About';
import Employee from './Employee';
//import Homepage from './Homepage';

const Header = styled('h1')`
background: #CBDCF3;
color: #394351;
font-size: 45px;
text-align: center;`

class Homepage extends React.Component{

    render() {
        return(
          <Router>
          <div>
            <h2>NSPK</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <Link to={'/profile'} className="nav-link"> Profile </Link>
              <li><Link to={'/employee'} className="nav-link">Employee</Link></li>
              <li><Link to={'/about'} className="nav-link">About</Link></li>
            </ul>
            </nav>
            <hr />
            <Switch>
                <Route exact path='/profile' component={Profile} />
                <Route path='/employee' component={Employee} />
                <Route path='/about' component={About} />
            </Switch>
          </div>
        </Router>
  );
    }
}

export default Homepage;
