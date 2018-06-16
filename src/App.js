import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import reducers from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import AppContent from './Components/App'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk, logger));

class App extends Component {



  render() {
    return (
      <Provider store={store}>
       <AppContent />
      </Provider>
    );
  }
}

export default App;
