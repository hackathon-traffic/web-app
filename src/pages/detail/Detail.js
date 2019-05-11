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
import TopBar from '../../component/Topbar';

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


  componentDidMount(event) {
    var location = getUrlVars().file;
    console.log(location);
    const{ endpoint } = this.state;
    var component = this;
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
        if(document != null && document.getElementById('img') != null) {  
          var image_json = JSON.parse(data);
          var array = [];
          image_json.detections.map(function(item, i) {
            item.name = "Car " + i;
            item.id = i;
            array.push(item);
          });
          component.setState({
            detections: array
          });
        }
        // console.log(data);
      });
      // socket.on('json', this.handleData);

    });
  }

  handleData(data) {
    console.log(data);
    if(document != null && document.getElementById('my_table') != null) {

    } 
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
      marginTop: margin_style.marginTop,
      marginLeft: margin_style.marginLeft,
      marginRight: margin_style.marginRight,
      marginBottom: margin_style.marginBottom
    }

    const img_style = {
      height: "300px", 
      width: '400px'
    }
    return (
      
      <div>
        <TopBar />
        <div style = {title_style}>E580 Lower Deck Pier RealTime</div>
        <div class="row" style ={margin_style}>
          <div class="col">
            <img id="img" style={img_style} ></img>
          </div>
          <div class="col" > 
            <Paper>
              <Table id='my_table'>
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
                      <TableCell align="right">{row.latitude.toFixed(4)}</TableCell>
                      <TableCell align="right">{row.longitude.toFixed(4)}</TableCell>
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
