import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthProvider from './providers/Auth';
import { routes, RouteWithSubRoutes } from './routes';

class Init extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default Init;
