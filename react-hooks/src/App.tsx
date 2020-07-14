import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const ref = useRef('hello world ref')
  useEffect(() => {
    console.log(ref.current)
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>react hooks</h1>
      </header>
    </div>
  );
}

export default App;
