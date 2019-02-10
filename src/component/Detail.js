import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router';
import socketIOClient from 'socket.io-client';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

const server = "http://127.0.0.1";
const port = "8080";

const getUrlVars = () => {
  var vars={};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars;
}
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
      file: -1,
      response: false,
      endpoint: server + ":" + port
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var location = getUrlVars().file;
    console.log(location);
    const{ endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', function(data) {
      socket.emit("filename", {filename: location},);
      // socket.on("text", data => this.setState({textFile: data}));
      socket.on("image", (image, buffer) => {
        document.getElementById('img').src = 'data:image/png;base64,'+image.buffer;
      });
    });
  }


  render() {

    const {response, imgFile} = this.state;
    
    const center = [37.9310561, -122.3459139]; // TODO



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
                                   <Marker
                      text={"😉😌😘"}
                      lat={37.931057}
                      lng={-122.345915}
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
