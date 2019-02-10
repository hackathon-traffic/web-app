import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {}
        }
        // binding this to event-handler functions
        // this.onMarkerClick = this.onMarkerClick.bind(this);
        // this.onMapClick = this.onMapClick.bind(this);
      }

    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
          }
        return (
            <div>
                <Map
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = { 14 }
                initialCenter = {{ lat: 37.9310561, lng:-122.3459139 }}
            ></Map>
            <Marker lat={37.9310561} lng={-122.3459139} />
            </div>
        );
    }
}
export default GoogleApiWrapper({
    api: ('AIzaSyDr4AVCVtA7YN0C6JQQdFOrC0CxqfqLo3I')
  })(GoogleMapsContainer);

