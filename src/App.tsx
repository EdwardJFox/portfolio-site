import React from 'react';
import './App.scss';
import { Desktop } from './windoe';

const App: React.FC = () => {
  return (
    <div className="app">
      <nav>
        <div className="brand">EdwardJFox</div>
        <div className="message">looking for neat things to work on</div>
      </nav>
      <Desktop height="100%" width="100%" />
    </div>
  );
}

export default App;
