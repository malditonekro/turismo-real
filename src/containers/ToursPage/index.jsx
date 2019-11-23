import React, { Component } from 'react';
import { DebugUtil } from '../../utils/js';
import FilterComponent from '../../components/Filters';
import PlaceListToursComponent from '../../components/PlaceListTours';

const log = DebugUtil.log.bind(DebugUtil, 'ToursPage /> ');

export default class ToursPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  fetchTours = () => {
    let apiUrl = 'https://api-turismo-duoc.herokuapp.com/api/toures';

    fetch(apiUrl).then(response => {
        return response.json();
      }).then(response => {
        console.log('asdf ', response);
        log('tours response', response);
        
        this.setState({
          tours: response
        });
      }).catch(err => {
        log("tours Error />",err);
      });
  };

  componentDidMount() {
    this.fetchTours();
  }


  render() {
    return (
      <div className="toursPage">
        <FilterComponent
         handleGetPlacesResponse={this.handleGetPlacesResponse}
        />
        <PlaceListToursComponent 
          tours = { this.state.tours }
        />
      </div>
    );
  }
}
