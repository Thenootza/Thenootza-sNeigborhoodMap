import React, { Component } from 'react';
import { markerInfo } from './infowindow'
import MyLocations from './MyLocations'
import './App.css'

class App extends Component {
  state = {
      anchors: [
        { name: 'Castel Sant Angelo', latitude: 41.9016188, longitude: 12.4564238 },
        { name: 'Sistine Chapel', latitude: 41.90438, longitude: 12.464747 },
        { name: 'Colosseum', latitude: 41.8937696, longitude: 12.4639335 },
        { name: 'Palazzo Braschi', latitude: 41.8973153, longitude: 12.4636813 },
        { name: 'Capitoline Museums', latitude: 41.8929428, longitude: 12.480369 },
        { name: 'Ponte Sisto', latitude: 41.8930356, longitude: 12.4660515 },
        { name: 'Pantheon', latitude: 41.8951521, longitude: 12.4683479 },
        { name: 'National Roman Museum, The Baths of Diocletian', latitude: 41.9100714, longitude: 12.4498737 },
        { name: 'Villa Medici', latitude: 41.9053136, longitude: 12.4656592 },
      ],
      map: '',
      infowindow: '',
      theMarker:'',
  }

  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyDWvBlgk3XhfDN1-mmzvzE9lJOX2A784gE&callback=initMap');
  }

  initMap = () => {
    const { anchors } = this.state;
    let inside = this;
    let myLatLng = { lat: 41.9043799, lng: 12.4647467 }
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 13,
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

  map_error = () => {
    let errorName = "error";
    let errorContent = "OOPS!!! An error occurred while loding the map";
    let element = document.getElementById('map');
    element.classList.add(errorName);
    element.innerHTML = errorContent;
  }

  openInfoWindow = (marker) => {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({ theMarker: marker });
    this.state.map.setCenter(marker.getPosition());
    markerInfo(marker, this.state.infowindow);
  }

  closeInfoWindow = () => {
    if (this.state.theMarker) {
      this.state.theMarker.setAnimation(null);
    }
    this.setState({ theMarker: '' });
    this.state.infowindow.close();
  }

  render() {
    return (
      <div className="App">
      <MyLocations
        anchors={this.state.anchors}
        openInfoWindow={this.openInfoWindow}
        closeInfoWindow={this.closeInfoWindow}/>

        <div id="map"
        role="application"
        aria-labelledby="Map of Rome"
        ></div>
      </div>
    );
  }

}

export default App;

function loadMap(src) {
  const catchScript = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function () {
    document.write("An error occurred while loading the map.");
  };
  catchScript.parentNode.insertBefore(script, catchScript);
}
