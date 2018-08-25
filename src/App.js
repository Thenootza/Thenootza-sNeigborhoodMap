import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    map: ''
  }

  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyDWvBlgk3XhfDN1-mmzvzE9lJOX2A784gE&callback=initMap');
  }

  initMap=() => {
    let myLatLng = {lat: 41.9043799, lng: 12.4647467};
    let view = document.getElementById('map')
    let map;

    view.style.height = window.innerHeight + "px";
    map = new window.google.maps.Map(view, {
      center: myLatLng,
      zoom: 13
    });
  }

  render() {
    return (
      <div className="App">
        <div id="map">

        </div>
      </div>
    );
  }
}

export default App;

function loadMap(src) {
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
}
