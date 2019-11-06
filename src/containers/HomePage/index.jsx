import React, { Component } from 'react';
import { DebugUtil } from '../../utils/js';
import FilterComponent from '../../components/Filters';
import PayWithFooterComponent from '../../components/PayWithFooter';
import PlaceListComponent from '../../components/PlaceList';

const log = DebugUtil.log.bind(DebugUtil, 'HomePage /> ');

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    }

    this.handleGetPlacesResponse = this.handleGetPlacesResponse.bind(this);
  }

  handleGetPlacesResponse = (places) => {
    log('handleGetPlacesResponse', places);
    this.setState({
      places
    });
  }

  render() {
    return (
      <div className="homePage">
        <FilterComponent handleGetPlacesResponse={this.handleGetPlacesResponse} />
        <PlaceListComponent places={ this.state.places }/>
        <PayWithFooterComponent />
      </div>
    );
  }
}
