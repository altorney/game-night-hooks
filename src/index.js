import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'reducers/rootReducer';
import thunk from 'redux-thunk';
import { getGames } from '../src/actions/index';

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(getGames());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default store;
