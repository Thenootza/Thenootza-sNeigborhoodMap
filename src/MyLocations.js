import React, {Component} from 'react';
import MyAnchors from './MyAnchors'

//The component that allows you to search for places
class MyLocations extends Component {
  state = {
    locations: [],
    searchResults: ''
  }

  searchLocation = (event) => {
    this.props.closeInfoWindow();
    const { value } = event.target;
    let locations = [];
    this.props.anchors.forEach(function (location) {
      if ( location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        // Show the markers that match the search input
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        //Hide the markers that don't match the search input
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
          <div className='header'>
          <h1 className="map-name">Beutifull places to visit</h1>
          <a href="https://www.wikipedia.org/" target="_blanck" id="wiki">Powered by Wikipedia</a>
          <input
            type="text"
            title="Search place"
            placeholder="Search for a place"
            role="search"
            aria-labelledby="input search-field"
            value={this.state.searchResults} onChange={this.searchLocation}/>

            <ul>
              {this.state.locations.map((list, index) => (
                <MyAnchors key={index} openInfoWindow={this.props.openInfoWindow} data={list}
                />
              ))}
            </ul>

            </div>
        )
    }
  }
export default MyLocations;
