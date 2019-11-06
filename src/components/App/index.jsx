import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import routes from '../../routes';
import BaseLayout from '../../containers/BaseLayout';

class App extends Component {
  getRoute = route => (
    <Route
      key={`route_${route.path}`}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  );

  render() {
    return (
      <BaseLayout>
        <Switch>
          { routes.map(route => this.getRoute(route)) }
        </Switch>
      </BaseLayout>
    );
  }
}

export default withRouter(App);
