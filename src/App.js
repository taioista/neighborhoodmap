import React, { Component } from 'react';
import Map from './MapContainer';
import * as YelpAPI from './api/YelpAPI';
import markers from './api/data';

class MapApp extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    places: markers,
    filterTerm: ''
  };

  //this.props.showingInfoWindow
  getMarkerInformationYelp = (id) => {
    //return YelpAPI.get(id)
    if(id && this.state.showingInfoWindow)
      YelpAPI.get(id)
      .then(info => {
        return 
          `<div>
            <h4>${info.id}</h4>
          </div>`()
      })
      .catch(err => {
        console.log(err);
      });
    else
      return;  
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  updateFilterTerm = (term) => {
    this.setState({ filterTerm: term });
  }

  render(){
  return (
      <div className="App">
        <header className="App-header">
          TESTE
        </header>
        {/* <Menu /> */}
        <Map 
          markerInformation = { this.getMarkerInformationYelp }
          markers = { this.state.places }
          showingInfoWindow = { this.state.showingInfoWindow }
          activeMarker = { this.state.activeMarker }
          selectedPlace = { this.state.selectedPlace }
          filterTerm = { this.state.filterTerm }
        />
      </div>
    );
  }
}

export default MapApp