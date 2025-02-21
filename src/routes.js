import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import CardView from './components/card/card-view';

export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/video/:id',
    component: CardView,
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
