import React, {Component} from 'react';
import MyAnchors from './MyAnchors'

class MyLocations extends Component {
  state = {
    locations: [],
    searchResults: ''
  }

  searchLocation = (event) => {
    this.props.closeInfoWindow();
    const { value } = event.target;
    let locations = [];
    this.props.points.forEach(function (location) {
      if ( location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });
    this.setState({ locations: locations, searchResults: value });
  }

  componentWillMount() {
    this.setState({ locations: this.props.anchors });
  }

  render() {
    return (
      
    )
    }
  }
export default MyLocations;
