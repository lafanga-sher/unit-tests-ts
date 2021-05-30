import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import MainScreen from './screens/MainScreen';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <MainScreen />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
