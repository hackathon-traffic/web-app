import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router';
import socketIOClient from 'socket.io-client';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

const server = "http://127.0.0.1";
const port = "8080";


const Detail = () => {
  return (
    <div>
      <DetailComponent/>
    </div>
  );
}

class DetailComponent extends React.Component {

  state = {
    timestamp: 'no timestamp yet'
  };

  constructor(props) {
    super(props);

    this.state = {
      response: false,
      endpoint: server + ":" + port
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    const{ endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', function(data) {
      socket.emit("filename", {filename: "abcd.txt"},);
      socket.on("image", (image, buffer) => {
        document.getElementById('img').src = 'data:image/png;base64,'+image.buffer;
      });

    });

  }


  render() {

    const {response, imgFile} = this.state;

    var file1 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_JEO_Grand.html';
    var file2 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_Lower_Deck_Pier_16.html';
    var file3 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-S101_at_Airport_Bl.html';
    var file4 = 'http://www.dot.ca.gov/d4/d4cameras/Wowza-Camera-Popup.html';
    
    const center = [37.9310561, -122.3459139];

    return (
      <div class="col-lg-12 border" onclick="window.location='https://google.com';">
        <div class="row">
          <div class="col-lg-4 thumbnail border">
            <img id="img"></img>
          </div>
          <div class="col-lg-4" style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyDr4AVCVtA7YN0C6JQQdFOrC0CxqfqLo3I' }}
                  defaultCenter={center}
                  defaultZoom={16}
                  disableDefaultUI={false}
                  draggable={false}
                >
                
                </GoogleMapReact>
                <Marker
                      text={"😉😌😘"}
                      lat={37.9310561}
                      lng={-122.3459139}
                    />
            </div>
            <div class="col-lg-4" > 
              <p>Traffic: 😡</p>
              <p>LAT: 37.9310561</p>
              <p>LON: -122.3459139</p>
            </div>
        </div>        
          
      </div>
      
    );
  }
}

export default withRouter(Detail);
