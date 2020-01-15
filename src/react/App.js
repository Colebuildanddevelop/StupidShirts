import React from 'react';
// REDUX
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/createStore';
import { PersistGate } from 'redux-persist/integration/react'
// REACT ROUTER
import { BrowserRouter as Router } from 'react-router-dom';
// COMPONENTS
import Navigation from './components/Navigation';

/**
  * @desc Main container for the app
  * @param null 
  * @return a Navigation component wrapped in a redux store, and react router.
*/
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






