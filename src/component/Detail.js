import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router';
import socketIOClient from 'socket.io-client';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import LocationList from './LocationList';

const server = "http://35.185.199.139";
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


    var cameraLat;
    var cameraLng;

    var location = getUrlVars().file;
    if(location === 'location1') {
      cameraLat = 37.9310561;
      cameraLng = -122.3459139;
    }
    else if(location == 'location2') {
      cameraLat = 37.9373659;
      cameraLng = -122.4726188;
    }
    else if(location == 'location3') {
      cameraLat = 37.6501389;
      cameraLng = -122.4093554;
    }
    else {
      cameraLat = 37.8520778;
      cameraLng = -122.2972928;
    }

    this.state = {
      response: false,
      endpoint: server + ":" + port,
      camera_lat: cameraLat,
      camera_lng: cameraLng,
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
      socket.on("text", (buffer) => {
        var file = buffer.toString();
      });
      socket.on("image", (image, buffer) => {
        document.getElementById('img').src = 'data:image/jpg;base64,'+image.buffer;
      });
      socket.on("text", (data) => {

          var txt = data.toString('utf8');
          console.log(txt);
          document.getElementById('info').innerHTML = txt;


      });
    });
  }


  render() {

    const {response, imgFile, camera_lat, camera_lng} = this.state;
    
    const center = [camera_lat, camera_lng]; // TODO



    var locationObject = [
      {
        lat: 37.9310561,
        lng: -122.3459139,
      },
      {
        lat: 37.9310561,
        lng: -122.3459139,
      },
      {
        lat: 37.9310561,
        lng: -122.3459139,
      }
    ];

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
                  draggable={false}                >
                
              </GoogleMapReact>
                
                <Marker
                      text={"😉😌😘"}
                      lat={this.state.camera_lat}
                      lng={this.state.camera_lng}
                    />
            </div>
            <div class="col-lg-4" > 
              <p>Traffic: 😡</p>
              <p>LAT: {this.state.camera_lat}</p>
              <p>LON: {this.state.camera_lng}</p>
            </div>
        </div>        
        <div>
          <LocationList/>
        </div>
      </div>
      
    );
  }
}

export default withRouter(Detail);
