import React, { Component } from 'react';
import {withRouter} from 'react-router';
import socketIOClient from 'socket.io-client';


const Detail = ({match}) => {
  console.log(match.params.file);
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
      color: 'white',
      response: false,
      // imgFile: null,
      endpoint: "http://localhost:8080"
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {


    const{ endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', function(data) {
      socket.emit("filename", {filename: "location1"},);
      // socket.on("text", data => this.setState({textFile: data}));
      socket.on("image", (image, buffer) => {
        // document.getElementById("HI").innerHTML = data;
        console.log(data);
        // document.getElementById('img').src = "data:image/png;base64,"+data.toString('base64')
        document.getElementById('img').src = 'data:image/png;base64,'+image.buffer;
        // document.getElementById('HI').innerHTML = buffer.toString('base64')

        // document.getElementById('img').attr("src", "data:image/png;base64,"+data.toString('base64'))
        // document.getElementById("img").src = 'data:image/jpeg;base64,' + data.toString('base64')
      });

      // socket.on("image", data => this.setState({imgFile: data}));
    });

  }


  render() {

    const {response, imgFile} = this.state;

    var file1 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_JEO_Grand.html';
    var file2 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-E580_Lower_Deck_Pier_16.html';
    var file3 = 'http://www.dot.ca.gov/d4/d4cameras/ct-cam-pop-S101_at_Airport_Bl.html';
    var file4 = 'http://www.dot.ca.gov/d4/d4cameras/Wowza-Camera-Popup.html';
    
    return (
      <div class="col-lg-12 border" onclick="window.location='https://google.com';">
        
        <div class="thumbnail">
          <img id="img"></img>
        </div>
        <p id="HI">Y</p>
      </div>
    );
  }
}

export default withRouter(Detail);