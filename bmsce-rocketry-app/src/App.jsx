import React from 'react';
import './App.css';
import rocketImg from './assets/rocket.png';
import logoImg from './assets/logo.png'; // Add your logo image as logo.png in the assets folder

function App() {
  return (
    <div className="loading-screen">
      <div className="rocket-wrapper">
        <img 
          src={rocketImg}
          alt="Rocket" 
          className="rocket" 
        />
        <div className="fire"></div>
        <div className="smoke-trail"></div>
      </div>
      
      <div className="logo-container">
        {/* Replace the placeholder div with the actual logo image */}
        <img 
          src={logoImg} 
          alt="BMSCE Rocketry Logo" 
          className="logo" 
        />
        <h1 className="title">ROCKETRY</h1>
        
        <div className="controls">
          <select className="port-select" defaultValue="">
            <option value="" disabled>Select COM Port</option>
            <option value="COM1">COM1</option>
            <option value="COM2">COM2</option>
            <option value="COM3">COM3</option>
            <option value="COM4">COM4</option>
            <option value="COM5">COM5</option>
            <option value="COM6">COM6</option>
            <option value="COM7">COM7</option>
            <option value="COM8">COM8</option>
            <option value="COM9">COM9</option>
            <option value="COM10">COM10</option>
          </select>
          <button className="start-btn">START</button>
        </div>
      </div>
    </div>
  );
}

export default App;
