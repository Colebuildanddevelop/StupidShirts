import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from '../redux/createStore';
import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './components/Navigation';
// MATERIAL-UI
import Container from '@material-ui/core/Container';

const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navigation/>
          </Router>
        </PersistGate>
      </Provider>  
  );
}

export default App;






