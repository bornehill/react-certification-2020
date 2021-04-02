import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthProvider from './providers/Auth';
import { routes, RouteWithSubRoutes } from './routes';

export default () => {
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
};
