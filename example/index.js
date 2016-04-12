import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { routeReducer } from '../src';

import App from './components/App';
import reducer from './reducer';
import router from './router';

const rootReducer = combineReducers({
  route: routeReducer,
  counter: reducer,
});

const store = createStore(rootReducer);
router.connectToStore(store);

const rootEl = document.getElementById('app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
