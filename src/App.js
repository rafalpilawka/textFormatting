import React from 'react';
import IO from './IO'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Text tool</h1>
        <p>Text formatting tool for getting full cryptocurrency name and price</p>
      </header>
      <IO></IO>
    </div>
  );
}

export default App;
