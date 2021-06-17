import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  getWindowInformation = (info) => {
    if(info && info.alias)
      return (
                <div>
                  <h4>{info.name}</h4>
                  <h4>{info.location.display_address}</h4>
                  <h4>{info.alias}</h4>
                  <img className="img" src={info.photos[0]} 
                    alt={info.name} />
                </div>
              )
    if(info && info.message){
      return (<div>
                So a error occurred dear user <br/> 
                Please contact the suport <br/> 
                Sorry for the trouble! 
              </div>)
    }
    
    if(info && !info.name && !info.message)
      return (<div></div>)
  }

  render() {
    const filteredListMarkers = this.props.markers
      .filter(marker => marker.title.toLowerCase().indexOf(this.props.filterTerm.toLowerCase()) >= 0)
        .map(marker => {
          return (
            <Marker
              key={marker.name}
              title={marker.title}
              alt={marker.title}
              name={marker.id}
              position={marker.position}
              onClick={this.props.markerClick.bind(this)}
              ref={this.props.addMarkersToRef}
            />
          )
        });

      const onClose = this.props.onClose;
      return (
        <section className="map">
          <Map
            google={this.props.google}
            zoom={13.5}
            style={mapStyles}
            initialCenter={{
              lat: -22.9326,
              lng: -43.241
            }} >

            { filteredListMarkers }
            <InfoWindow
              marker={ this.props.activeMarker }
              visible={ this.props.showingInfoWindow }
              onClose={ onClose }
            >
              {this.getWindowInformation(this.props.markerInformation)}
            </InfoWindow>
          </Map>
        </section>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyBY4cv_-El7HAoXNHTMWa0jyNXlHo46WmI'
  })(MapContainer);