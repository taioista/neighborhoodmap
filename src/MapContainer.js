import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      };

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

    render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: -22.9326,
            lng: -43.241
          }}
        >
            <Marker
            onClick={this.onMarkerClick}
            name={'Shopping Tijuca'}
    title={'Shopping Tijuca'}
    position={{lat: -22.9219,
      lng: -43.2352}} />
  <Marker
  onClick={this.onMarkerClick}
  title={'Tijuca'}
  name={'Tijuca'}
    position={{lat: -22.9326,
      lng: -43.241}} />
  <Marker />
  
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        ><div>
        <h4>{this.state.selectedPlace.name}</h4>
      </div>
    </InfoWindow>
            </Map>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyBY4cv_-El7HAoXNHTMWa0jyNXlHo46WmI'
  })(MapContainer);
  /*
  export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.apiKey
  }
))(MapContainer)
  */