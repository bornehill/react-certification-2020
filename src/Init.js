import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import WizeTubeProvider from './providers/wize-tube.provider';
import { routes, RouteWithSubRoutes } from './routes';

export default () => {
  return (
    <BrowserRouter>
      <WizeTubeProvider>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </WizeTubeProvider>
    </BrowserRouter>
  );
};
