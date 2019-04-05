import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from './Profile';
import About from './About';
import Employee from './Employee';
//import Homepage from './Homepage';

const Header = styled('h2')`
  background: #CBDCF3;
  color: #394351;
  font-size: 45px;
  text-align: center;
  margin: 0px;
`
class Homepage extends React.Component{

    render() {
        return(
         
          <Router>
       <div>
            <h2>
            <Header>NSPK</Header>
            </h2>
         
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul style={{'list-style': 'none'}} className="navbar-nav mr-auto">
              <li style={{'float': 'left', 'padding': '16px'}}><Link to={'/profile'} className="nav-link"> Profile </Link></li>
              <li style={{'float': 'left', 'padding': '16px'}}><Link to={'/employee'} className="nav-link">Employee</Link></li>
              <li style={{'float': 'left', 'padding': '16px'}}><Link to={'/about'} className="nav-link">About</Link></li>
            </ul>
            </nav>
            <br style={{'clear': 'both'}} />
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
