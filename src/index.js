import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './routes/index';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={configureStore.store}>
    <PersistGate loading={null} persistor={configureStore.persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
