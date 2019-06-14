import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
/*
markerInformation = { this.getMarkerInformationYelp }
          markers = { this.state.places }
          showingInfoWindow = { this.state.showingInfoWindow }
          activeMarker = { this.state.activeMarker }
          selectedPlace = { this.state.selectedPlace } */

    render() {

      const filteredListMarkers = this.props.markers
      .filter(marker => marker.name.toLowerCase().indexOf(this.props.filterTerm.toLowerCase()) >= 0)
      .map(marker => {
        return (
          <Marker
            key={marker.name}
            title={marker.title}
            name={marker.name}
            position={marker.position}
            onClick={this.props.markerInformation.bind(this)}
          />
        )
      });

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
          {/*   { this.props.markers.map( marker => (
                  <Marker
                      key={marker.id}
                      onClick={this.propsonMarkerClick}
                      name={ marker.name }
                      title={ marker.title }
                      position={ marker.position } />
                  ))} */}

          { filteredListMarkers }
          <InfoWindow
            marker={ this.props.activeMarker }
            visible={ this.props.showingInfoWindow }
            onClose={ this.onClose }
          >
   
          {/*  <div>
                  <h4>{this.props.selectedPlace.name}</h4>
              </div> */
          }
          </InfoWindow>
        </Map>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyBY4cv_-El7HAoXNHTMWa0jyNXlHo46WmI'
  })(MapContainer);