import React from 'react';
import { Button } from 'reactstrap';
import {NavLink, Redirect} from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import TopBar from './Topbar';



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
    var file4 = 'http://www.dot.ca.gov/d4/d4cameras/Wowza-Camera-Popup.html'


    var detailPath = '/detail?file=';
    
    return (
      <div className="App">
        <TopBar />
        <MDBContainer style={{ marginTop: '50px' }}>
          <MDBRow>
            <MDBCol><div className="thumbnail" >
              <iframe title='video1' className="hello" scrolling="no" src={file1}></iframe>
              <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=location1">About</NavLink></center>
            </div></MDBCol>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video2' className="hello" scrolling="no" src={file2}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=location2">About</NavLink></center>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video3' className="hello" scrolling="no" src={file3}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=location3">About</NavLink></center>
              </div>
            </MDBCol>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video2' className="hello" scrolling="no" src={file4}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=location4">About</NavLink></center>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </div>
    );
  }
}

export default Home;

