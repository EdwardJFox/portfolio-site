import React, { useState } from 'react';
import './App.scss';
import { Desktop, Windoe, Toolbar } from './windoe';

const App: React.FC = () => {
  const [windoes, setWindoes] = useState([
    { id: 1, title: 'About', type: 'about', state: 'closed', position: { x: 100, y: 100 }, size: { width: 400, height: 300 }},
    { id: 2, title: 'Previous Work', type: 'previous_work', state: 'closed', position: { x: 200, y: 200 }, size: { width: 400, height: 300 }},
    { id: 3, title: 'Links', type: 'links', state: 'closed', position: { x: 300, y: 300 }, size: { width: 400, height: 300 }}
  ]);

  return (
    <Desktop height="100%" width="100%" windoes={windoes} updateWindoes={setWindoes} />
  );
}

export default App;
