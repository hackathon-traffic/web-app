import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';


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
