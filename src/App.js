import React, { Component } from 'react';
import Map from './MapContainer';
import * as FoursquareAPI from './FoursquareAPI';

class MapApp extends React.Component {
  render(){
//TODO passar API_KEY do google e foursquare via props
  return (
      <div className="App">
        <header className="App-header">
          TESTE
        </header>
        <Map />
      </div>
    );
  }
}

export default MapApp