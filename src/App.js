import React, { Component } from 'react';
import Map from './MapContainer';
import * as YelpAPI from './api/YelpAPI';
import markers from './api/data';

class MapApp extends Component {

  getMarkerInformationYelp = (id) => {
    return YelpAPI.get(id)
    .catch(err => {
      console.log(err);
    });
  }

  render(){
  return (
      <div className="App">
        <header className="App-header">
          TESTE
        </header>
        <Map 
          markerInformation = {this.getMarkerInformationYelp}
          markers = {markers}
        />
      </div>
    );
  }
}

export default MapApp