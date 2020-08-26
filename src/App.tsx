import React, { useEffect } from 'react';
import store from './redux/store'
import { Provider } from 'react-redux';

import { App, View } from 'framework7-react';
import ErrorsHandler from 'components/ErrorsHandler';
import LoadingIndicator from 'components/LoadingIndicator';
import Auth from 'components/Auth';

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

export default () => {
  return (
    <Provider store={store}>
      <App params={f7params}>
        {/* initial page is specified in routes.js */}
        <View main url="/" />
        <ErrorsHandler />
        <LoadingIndicator />
        <Auth />
      </App>
    </Provider>
  )
}
