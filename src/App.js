import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    map:'',

  }

  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMap();
  }

  initMap=() => {
    let inside=this;
    const { anchors } = this.state;
    let myLatLng = {lat: 41.9043799, lng: 12.4647467};
    let view = document.getElementById('map');
    view.style.height = window.innerHeight + "px";
    let map = new window.google.maps.Map(view, {
      center: myLatLng,
      zoom: 13
    });

    let InfoWindow = new window.google.maps.InfoWindow({});

    this.setState({ map: map, infowindow: InfoWindow });

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
      inside.closeInfoWindow();
    });

    window.google.maps.event.addDomListener(window, "resize", function () {
      let center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      inside.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, 'click', function () {
      inside.closeInfoWindow();
    });

    let mydreamlocations = [];
    anchors.forEach(function (location) {
      let marker = new window.google.maps.Marker({
        name: location.name,
        position: new window.google.maps.LatLng(location.latitude, location.longitude),
        map: map
      });

      marker.addListener('click', function () {
        inside.openInfoWindow(marker);
      });

    location.marker = marker;
    mydreamlocations.push(location);
    });
    this.setState({ anchors: mydreamlocations });
  }

  render() {
    return (
      <div className="App">
        <div id='map' style={{height: `100%`}}>
            Map is loading...
        </div>
      </div>
    );
  }
}

export default App;

function loadMap(src) {
  const script = window.document.createElement("script");
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWvBlgk3XhfDN1-mmzvzE9lJOX2A784gE&callback=initMap';
  script.async = true;
}
