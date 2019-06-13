import React from 'react';
import Resume from './components/A4Resume';
import data from './resume-data.json'
import './App.css';

function App() {
  return (
    <div className="App">
      <Resume content={data} />
    </div>
  );
}

export default App;
