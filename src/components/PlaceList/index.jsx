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
    return (
      <div className="placeList row">
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