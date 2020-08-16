import React from 'react';
import './App.css';

import { App, View } from 'framework7-react';

// specify routes for app
import routes from './routes';

const f7params = {
  name: 'EvenOdd-demo',
  id: 'app.web.evenodd-demo',
  routes,
};

export default () => (
  <App params={f7params}>
    {/* initial page is specified in routes.js */}
    <View main url="/" />
  </App>
)
