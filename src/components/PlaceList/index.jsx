import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaceListItemComponent from '../PlaceListItem'

export default class PlaceListComponent extends Component {

  renderPlaceListItems = () => (
    this.props.places.map((place, index) => {
      return <PlaceListItemComponent key={`pli-${index}`}place={place} />
    })
  );

  render() {
    if(!this.props.places || this.props.places.length == 0) {
      return null;
    }
    
    return (
      <div className="placeList">
        {this.renderPlaceListItems()}
      </div>
    );
  }
}

PlaceListComponent.defaultProps = {
  places: []
}

PlaceListComponent.propTypes = {
  places: PropTypes.array
}