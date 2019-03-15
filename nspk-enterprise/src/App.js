import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const Header = styled('h1')`
  background: #CBDCF3;
  color: #394351;
  font-size: 45px;
  text-align: center;


`
class App extends React.Component{
  render() {
    return (
      <div>
            <Header>NSPK</Header>
            
         </div>
      );
   }
}


export default App;
