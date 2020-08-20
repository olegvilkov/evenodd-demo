import React from 'react';
import store from './redux/store'
import { Provider } from 'react-redux';

import { App, View } from 'framework7-react';
import ErrorsHandler from 'components/ErrorsHandler';

// specify routes for app
import routes from './routes';

const f7params = {
  theme: 'auto',
  name: 'EvenOdd-demo',
  id: 'app.web.evenodd-demo',
  view: {
    pushState: true,
  },
  routes,
};

export default () => (
  <Provider store={store}>
    <App params={f7params}>
      {/* initial page is specified in routes.js */}
      <View main url="/" />
      <ErrorsHandler/>
    </App>
  </Provider>
)
