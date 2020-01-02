import React, { useState } from 'react';
import './App.scss';
import { Desktop, Windoe, Toolbar } from './windoe';

const App: React.FC = () => {
  const [windoes, setWindoes] = useState([{ id: 1, title: 'About', position: { x: 0, y: 0 }, size: { width: 400, height: 300 } }]);

  return (
    <Desktop height="100%" width="100%" windoes={windoes} updateWindoes={setWindoes} />
  );
}

export default App;
