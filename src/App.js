import React, { Component } from 'react';
import Map from './MapContainer';
import Menu from './MenuContainer';
import * as YelpAPI from './api/YelpAPI';
import markersData from './api/data';
import styles from './styles';

class MapApp extends Component {

  constructor(props) {
    super(props)

    const mql = window.matchMedia('(min-width: 768px)')

    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      markerClickedInfo: {},
      places: markersData,
      filterTerm: '',
      markersRef: [],
      menuIsOpen: mql.matches,
      menuIsSticky: mql.matches
    }

    mql.onchange = e => {
      this.setState({
        menuIsOpen: e.matches,
        menuIsSticky: e.matches,
      })
    }
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
      this.animateClickedMarker(marker)
      this.setClickedMarker(marker, props, info)
    })
    .catch(error => {
      this.animateClickedMarker(marker)
      this.setClickedMarker(marker, props, error)
    })
  };

  animateClickedMarker = (marker) => {
    this.state.markersRef.forEach(m => {
      if (m.marker.name === marker.name) {
        marker.setAnimation(1);
      } else {
        m.marker.setAnimation(null);
      }
    })
  }

  setClickedMarker = (marker, props, info) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      markerClickedInfo: info
    })
  }

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

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
      this.state.markersRef.forEach(m => {
        m.marker.setAnimation(null);
      })
    }
  };

  updateFilterTerm = (term) => {
    this.setState({ filterTerm: term });
  }

  handleMenuStateChange = state => {
    this.setState({ menuIsOpen: state.isOpen })
  }

  handleMenuButtonClick = () => {
    this.setState(state => ({ menuIsOpen: !state.menuIsOpen }))
  }

  render(){
  return (
      <div id="container">
        <header className="header">
          <nav>
            <h1>My Neighborhood Map Tijuca!</h1>
          </nav> 
        </header>
        <main>
          <Menu 
            styles = {styles}
            filterTerm = { this.state.filterTerm }
            markers = { this.state.places }
            itemListClick = { this.onItemListClick }
            updateFilterTerm = { this.updateFilterTerm }
            menuIsOpen = { this.state.menuIsOpen }
            menuIsSticky = { this.state.menuIsSticky }
            outerContainerId={"container"}
            handleMenuButtonClick={this.handleMenuButtonClick}
            handleMenuStateChange={this.handleMenuStateChange}
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