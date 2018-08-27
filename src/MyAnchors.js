import React, { Component } from 'react';

class MyAnchors extends Component {

  render() {
    return (
      <li
        role="button"
        onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>
        {this.props.data.name}
      </li>
    );
  }
}

export default MyAnchors;
