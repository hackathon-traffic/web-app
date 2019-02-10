import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var potentialText = "33.40 -127.34\n32.122 -123.64\n42.573 -122.3";
        var potentialTextList = potentialText.split("\n");
        const listItems = potentialTextList.map((d) => <li>{d}</li>);

        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
          }

        return (
            <div>
                {listItems}
            </div>
        );
    }
}
export default LocationList;

