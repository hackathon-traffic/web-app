import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router';
import socketIOClient from 'socket.io-client';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const fs = require('fs');

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat) {
  id += 1;
  return { id, name, calories, fat };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

// const admin = require('firebase-admin');
// var storageRef = admin.storage().ref();

// import Marker from '../../component/Marker';

const server = "http://35.185.199.139";
// const server = "http://localhost"
const port = "8080";
var socket;

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


  constructor(props) {

    super(props);

    this.state = {
      file: -1,
      response: false,
      endpoint: server + ":" + port,
      detections: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount() {
    var location = getUrlVars().file;
    console.log(location);
    const{ endpoint } = this.state;
    socket = socketIOClient(endpoint);
    socket.on('connect', function(data) {
      socket.emit("filename", {filename: location},);
      // socket.on("text", data => this.setState({textFile: data}));
      socket.on('img', (data) => {
        // console.log('Got data ', data)
        // var imgAndInfo = JSON.parse(data);
        if(document != null && document.getElementById('img') != null) {          
          document.getElementById('img').src = 'data:image/jpg;base64,'+ (data.buffer);
        }

      });
      socket.on('json', (data) => {
        if(document != null && document.getElementById('info') != null) {
          console.log(data);
          document.getElementById('info').innerHTML = data;

          var array = [];
          image_json.detections.map(function(item, i) {
            item.name = "Car " + i;
            item.id = i;
            array.push(item);
          });
          this.setState({
            detections: array
          });
        }

      });
    });

    //For now use sample image
    document.getElementById('img').src = require('./sample/img.jpg');
    var json = '{"detections": [{"screen_x": 499.6688537597656, "screen_y": 111.41683197021484, "width": 55.90815734863281, "height": 41.759376525878906, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}, {"screen_x": 678.8284301757812, "screen_y": 280.27838134765625, "width": 83.02694702148438, "height": 100.1336441040039, "north_disp": -23.78219653587687, "east_disp": 40.141663107058186, "latitude": 37.937152021568195, "longitude": -122.4721610717249}, {"screen_x": 620.8997802734375, "screen_y": 166.25376892089844, "width": 90.06491088867188, "height": 64.59260559082031, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}, {"screen_x": 421.0698547363281, "screen_y": 77.57567596435547, "width": 39.206146240234375, "height": 34.863338470458984, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}, {"screen_x": 371.70721435546875, "screen_y": 81.05085754394531, "width": 59.036582946777344, "height": 54.428131103515625, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}, {"screen_x": 279.4233703613281, "screen_y": 67.149169921875, "width": 30.82036781311035, "height": 23.47152328491211, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}, {"screen_x": 310.63446044921875, "screen_y": 18.167940139770508, "width": 39.09121322631836, "height": 22.86317253112793, "north_disp": 0, "east_disp": 0, "latitude": 37.9373659, "longitude": -122.4726188}]}'
    var image_json = JSON.parse(json);

    var array = [];
    image_json.detections.map(function(item, i) {
      item.name = "Car " + i;
      item.id = i;
      array.push(item);
    });
    this.setState({
      detections: array
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }



  render() {

    const margin_style = {
      marginTop: '2%',
      marginLeft: '5%',
      marginRight: '5%',
      marginBottom: '2%'
    }

    const title_style ={
      fontSize: '30px',
    }

    return (
      <div style = {margin_style}>
        <div style = {title_style}>E580 Lower Deck Pier RealTime</div>
        <div class="row" style = {{marginTop:"1.5%"}}>
          <div class="col">
            <img id="img" class="img-fluid" ></img>
          </div>
          <div class="col" > 
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Car</TableCell>
                    <TableCell align="right">Latitude</TableCell>
                    <TableCell align="right">Longitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.detections.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.latitude}</TableCell>
                      <TableCell align="right">{row.longitude}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>        
          
      </div>
      
    );
  }
}

export default withRouter(Detail);
