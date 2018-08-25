import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    map: ''
  }

  initMap = () => {

  let myLatLng = {lat: 41.9043799, lng: 12.4647467}
  let view = document.getElementById('map');

  const map = new window.google.maps.Map(view, {
    center: myLatLng,
    zoom: 13,
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
