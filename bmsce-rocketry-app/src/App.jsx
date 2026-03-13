import React from 'react';
import './App.css';
import rocketImg from './assets/rocket.png';

function App() {
  return (
    <div className="loading-screen">
      <img 
        src={rocketImg}
        alt="Rocket" 
        className="rocket" 
      />
      
      <div className="logo-container">
        <div style={{width: '200px', height: '200px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}} className="logo">
             <span>Logo Here</span>
        </div>
        <h1 className="title">ROCKETRY</h1>
      </div>
    </div>
  );
}

export default App;
