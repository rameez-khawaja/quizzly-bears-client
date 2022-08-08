import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Header } from './layout';

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Header />
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);
 