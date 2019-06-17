import React, { Component } from 'react';
import Map from './MapContainer';
import Menu from './Menu';
import * as YelpAPI from './api/YelpAPI';
import markersData from './api/data';

class MapApp extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    markerClickedInfo: {},
    places: markersData,
    filterTerm: '',
    markersRef: [],
    menuClass: 'menu'
  };

  onHamburgerClick = () => {
    debugger
    let className = 'menu';
    if(this.state.menuClass === 'menu')
      className = 'toggle'

    this.setState({
      menuClass: className
    })
  }

  addMarkersToRef = (ref) => {
    if(ref){
      let updatedMarkersRef = this.state.markersRef;
      updatedMarkersRef.push(ref);
      this.setState({
        markersRef: updatedMarkersRef
      })
    }
  };

  onMarkerClick = (props, marker) => {
    this.cleanInfoWindowData();
    YelpAPI.get(marker.name)
    .then(info => {
      debugger
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        markerClickedInfo: info
      })
    })
  };

  onItemListClick = (markerTitle) => {
    this.state.markersRef
      .filter(marker => marker.props.title.toLowerCase().indexOf(markerTitle.toLowerCase()) >= 0)
        .map(marker => {
          this.onMarkerClick(marker.props, marker.marker)
        })
  }

  cleanInfoWindowData = () => {
    this.setState({
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      markerClickedInfo: {}
    })
  }

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
      <div>
        <header className="header">
          <nav>
            <h1>My Neighborhood Map Tijuca!</h1>
          </nav> 
        </header>
        <main>
          <Menu 
            filterTerm = { this.state.filterTerm }
            markers = { this.state.places }
            itemListClick = { this.onItemListClick }
            updateFilterTerm = { this.updateFilterTerm }
            menuClass = {this.state.menuClass}
            onHamburgerClick = { this.onHamburgerClick }
          />
          <Map 
            markerClick = { this.onMarkerClick }
            markerInformation = { this.state.markerClickedInfo }
            markers = { this.state.places }
            showingInfoWindow = { this.state.showingInfoWindow }
            activeMarker = { this.state.activeMarker }
            selectedPlace = { this.state.selectedPlace }
            filterTerm = { this.state.filterTerm }
            onClose= { this.onClose }
            addMarkersToRef = { this.addMarkersToRef }
          />
        </main>
      </div>
    );
  }
}

export default MapApp