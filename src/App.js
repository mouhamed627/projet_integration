import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div className="app-container">
      {page === 'signup' ? (
        <Signup onSwitch={() => setPage('login')} />
      ) : (
        <Login onSwitch={() => setPage('signup')} />
      )}
    </div>
  );
}

export default App;