import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import F7 Bundle
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Path to Framework7 Library CSS Bundle
import 'framework7/css/framework7.bundle.min.css';

// Import F7-React Plugin
import Framework7React from 'framework7-react';

// Init F7-React Plugin
Framework7.use(Framework7React);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
