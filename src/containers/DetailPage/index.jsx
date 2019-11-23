import React, { Component } from 'react';
import { api, DebugUtil } from '../../utils/js';
import DetailPageItemComponent from '../../components/DetailPageItem';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="detailPage">
        <DetailPageItemComponent placeId={this.props.match.params.id} />
      </div>
    );
  }
}
