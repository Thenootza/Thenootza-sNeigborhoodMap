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
    this.props.anchors.forEach(function (location) {
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
          <div>
          <input
            type="text"
            title="select a specific place"
            placeholder="Select a specific place"
            value={this.state.searchResults} onChange={this.searchLocation}/>

            <ol>
              {this.state.locations.map((list, index) => (
                <MyAnchors key={index} openInfoWindow={this.props.openInfoWindow} data={list}
                />
              ))}
            </ol>
            </div>
        )
    }
  }
export default MyLocations;
