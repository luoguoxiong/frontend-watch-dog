import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Monitor } from '@frontend-watch-dog/web-sdk';
import App from './App';

new Monitor({
  appId: 'defsl3251705405014261',
  api: 'http://localhost:7001/report',
  cacheMax: 1,
  webVitalsTimeouts: 10000,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
