import React from 'react';
import { Button } from 'reactstrap';
import {NavLink, Redirect} from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import TopBar from '../../component/Topbar';


import '../../App.css';


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
    // var file2 = 'rtmp://wzmedia.dot.ca.gov:1935/D4/E580_Lower_Deck_Pier_16.stream';
    var file2 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_Lower_Deck_Pier_16.html';
    // var file3 = 'rtmp://wzmedia.dot.ca.gov:1935/D4/S101_at_Airport_Bl.stream';
    var file3 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-S101_at_Airport_Bl.html';
    // var file4 = 'rtmp://wzmedia.dot.ca.gov/D4/W80_at_Ashby.stream'
    var file4 = 'http://www.dot.ca.gov/d4/d4cameras/Wowza-Camera-Popup.html'
    
    return (
      <div className="App">
        <script src="https://cdn.jsdelivr.net/npm/videojs-flash@2/dist/videojs-flash.min.js"></script>
        <script src="http://vjs.zencdn.net/4.11/video.js"></script>
        <TopBar />
        <MDBContainer style={{ marginTop: '50px' }}>
          <MDBRow>
            <MDBCol><div className="thumbnail" >
              <iframe title='video1' className="hello" scrolling="no" src={file1}></iframe>
              <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=0">About</NavLink></center>
            </div></MDBCol>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video2' className="hello" scrolling="no" src={file2}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=1">About</NavLink></center>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video3' className="hello" scrolling="no" src={file3}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=2">About</NavLink></center>
              </div>
            </MDBCol>
            <MDBCol>
              <div class="thumbnail">
                <iframe title='video2' className="hello" scrolling="no" src={file4}></iframe>
                <center><NavLink className=" btn btn-secondary m-2" to="/detail?file=3">About</NavLink></center>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </div>
    );
  }
}

export default Home;

