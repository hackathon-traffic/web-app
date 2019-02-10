import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './component/Home';
import Detail from './component/Detail';


import './App.css';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <script src="/socket.io/socket.io.js"></script>
          <Route exact path = "/" component = {Home}/>
          <Route path = "/detail" component = {Detail}/>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;
