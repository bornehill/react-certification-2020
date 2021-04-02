import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
];

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export default routes;
