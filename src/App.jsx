import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import AssetTable from './components/AssetTable';

import './App.css'

const App = () => (
  <Provider store={store}>
    <h1>Crypto Price Tracker</h1>
    <div className='table-container'>
      <AssetTable />
    </div>
  </Provider>
);

export default App
