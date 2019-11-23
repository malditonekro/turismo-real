import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaceListToursItemComponent from '../PlaceListToursItem';


export default class PlaceListToursComponent extends Component {

  renderPlaceListToursItems = () => (
    this.props.tours.map((tours, index) => {
      return <PlaceListToursItemComponent key={`pli-${index}`} tours={tours} />
    })
  );

  render() {
    if(!this.props.tours || this.props.tours.length == 0) {
      return null;
  }
    
    return (
      <div className="placeListTours row">
        {this.renderPlaceListToursItems()}
      </div>
    );
  }
}

PlaceListToursComponent.defaultProps = {
  tours: []
}

PlaceListToursComponent.propTypes = {
  tours: PropTypes.array
}