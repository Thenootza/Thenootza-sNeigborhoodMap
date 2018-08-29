import React, { Component } from 'react';

//The component that lists the places to search for
class MyAnchors extends Component {

  render() {
    return (
      <li
        role="button"
        aria-label={`show marker for ${this.props.data.name}`}
        tabIndex={0}
        onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>

        {this.props.data.name}

      </li>
    );
  }
}

export default MyAnchors;
