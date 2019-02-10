import React from 'react';
import { Button } from 'reactstrap';
import {NavLink, Redirect} from "react-router-dom";

import '../App.css';


const Home = () => {
  
  return (
    <div>
      <HomeComponent/>
    </div>
  );
};


class HomeComponent extends React.Component {

  render() {

    var file1 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_JEO_Grand.html';
    var file2 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_Lower_Deck_Pier_16.html';
    var file3 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-S101_at_Airport_Bl.html';
    var file4 = 'http://www.dot.ca.gov/d4/d4cameras/Wowza-Camera-Popup.html';
    
    return (
      <div className="App">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 border" onclick="window.location='https://google.com';">
                <a href = 'google.com'></a>
                <div class="thumbnail">
                  <iframe class="hello" scrolling="no" src={file1}></iframe>
                  <center><NavLink to="/detail?file=1">About</NavLink></center>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="thumbnail">
                  <iframe class="hello" scrolling="no" src={file2}></iframe>
                  <center><NavLink to="/detail?file=2">About</NavLink></center>
                </div>
              </div>
            </div>
            <div class="row">
  
              <div class="col-lg-6 border">
                <div class="thumbnail">
                <iframe class="hello" scrolling="no" src={file3}></iframe>
                <center><NavLink to="/detail?file=3">About</NavLink></center>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="thumbnail">
                  <iframe class="hello" scrolling="no" src={file4}></iframe>
                  <center><NavLink to="/detail?file=4">About</NavLink></center>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
