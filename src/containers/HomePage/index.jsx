import React, { Component } from 'react';
import { api, DebugUtil } from '../../utils/js';
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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    this.getInitialApartments(12);
  };

  getInitialApartments = async (maxPlaces) => {
    const places = await api.fetchApartment(null, maxPlaces);
    this.setState({
      places
    });
  };

  handleSubmit = async (filters = {}) => {
    log('handleSubmit', filters);
    const places = await api.fetchApartment(filters);
    this.setState({
      places
    });
  }

  render() {
    return (
      <div className="homePage">
        <FilterComponent handleParentSubmit={this.handleSubmit} />
        <PlaceListComponent places={ this.state.places }/>
        <PayWithFooterComponent />
      </div>
    );
  }
}
