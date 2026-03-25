import React, { useState, useEffect } from 'react';
import './App.css';
import rocketImg from './assets/rocket.png';
import logoImg from './assets/logo.png';
import Dashboard from './components/Dashboard';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [baudRate, setBaudRate] = useState("115200");
  
  // State to hold current telemetry values
  const [telemetryData, setTelemetryData] = useState({
    pitch: 0, yaw: 0, roll: 0,
    vx: 0, vy: 0, vz: 0, v: 0,
    ax: 0, ay: 0, az: 0, a: 0,
    lat: 12.9410, // BMSCE Default coordinates
    lon: 77.5655
  });

  // State to hold history for the graphs
  const [telemetryHistory, setTelemetryHistory] = useState([]);
  
  // Generate some dummy data for visualization purposes
  useEffect(() => {
    if (isConnected) return; // Stop dummy data once connected

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const elapsedSec = elapsedMs / 1000;
      
      const ax = Math.sin(elapsedSec) * 5;
      const ay = Math.cos(elapsedSec) * 5;
      const az = 9.8 + Math.sin(elapsedSec * 2);
      
      const vx = 10 + Math.sin(elapsedSec) * 2;
      const vy = 5 + Math.cos(elapsedSec);
      const vz = 50 + elapsedSec; // Realistic linear growth instead of massive numbers
      const v = Math.sqrt(vx*vx + vy*vy + vz*vz);
      
      const newData = {
        time: elapsedSec, // Shows nicely on X-axis as seconds (1, 2, 3...)
        pitch: Math.sin(elapsedSec / 2) * 0.5,
        yaw: Math.cos(elapsedSec / 3) * 0.5,
        roll: elapsedSec % (Math.PI * 2),
        vx: vx,
        vy: vy,
        vz: vz,
        v: v,
        ax: ax,
        ay: ay,
        az: az,
        a: Math.sqrt(ax*ax + ay*ay + az*az)
      };

      setTelemetryData(newData);
      setTelemetryHistory(prev => {
        const newHistory = [...prev, newData];
        if (newHistory.length > 50) newHistory.shift(); // Keep last 50 points
        return newHistory;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isConnected]);

  const handleStart = async () => {
    try {
      if (!('serial' in navigator)) {
        alert("Web Serial API is not supported in your browser. Please use Chrome or Edge.");
        // Proceeding anyway just to show dashboard for demo
        setIsConnected(true);
        return;
      }

      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: parseInt(baudRate) });
      setIsConnected(true);
      alert(`Successfully connected to the serial port at ${baudRate} bps!`);
      
      // Start reading from the serial port
      readSerialData(port);

    } catch (error) {
      console.error("Error opening serial port:", error);
      // For development: connect anyway if they cancel port selection (Simulator)
      setIsConnected(true); 
    }
  };

  const readSerialData = async (port) => {
    const textDecoder = new TextDecoderStream();
    port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    
    let buffer = '';
    const sessionStartTime = Date.now(); // Track session start for clean X-axis

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        buffer += value;
        const lines = buffer.split('\n');
        
        // Process all complete lines
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          try {
            // Expected format depends on packet. Example placeholder parsing:
            // "1,vx,vy,vz,ax,ay,az,roll,pitch,yaw,alt,pressure"
            // "2,lat,lon,vbat,current,t1,t2"
            const parts = line.split(',');
            const packetId = parseInt(parts[0]);
            
            if (packetId === 1 && parts.length >= 10) {
              const elapsedSec = (Date.now() - sessionStartTime) / 1000;
              
              const newData = {
                time: elapsedSec, // Clean seconds format instead of full Date.now() timestamp
                vx: parseFloat(parts[1]) || 0,
                vy: parseFloat(parts[2]) || 0,
                vz: parseFloat(parts[3]) || 0,
                v: Math.sqrt(Math.pow(parseFloat(parts[1])||0, 2) + Math.pow(parseFloat(parts[2])||0, 2) + Math.pow(parseFloat(parts[3])||0, 2)),
                ax: parseFloat(parts[4]) || 0,
                ay: parseFloat(parts[5]) || 0,
                az: parseFloat(parts[6]) || 0,
                a: Math.sqrt(Math.pow(parseFloat(parts[4])||0, 2) + Math.pow(parseFloat(parts[5])||0, 2) + Math.pow(parseFloat(parts[6])||0, 2)),
                // Assuming gyro is sent in degrees, converting to radians for 3D model
                roll: (parseFloat(parts[7]) || 0) * (Math.PI / 180),
                pitch: (parseFloat(parts[8]) || 0) * (Math.PI / 180),
                yaw: (parseFloat(parts[9]) || 0) * (Math.PI / 180)
              };

              setTelemetryData(prev => ({ ...prev, ...newData }));
              setTelemetryHistory(prev => {
                const newHistory = [...prev, newData];
                if (newHistory.length > 50) newHistory.shift(); 
                return newHistory;
              });
            } else if (packetId === 2 && parts.length >= 7) {
              // Parse Set 2 data: "2,lat,lon,vbat,current,t1,t2"
              setTelemetryData(prev => ({
                ...prev,
                lat: parseFloat(parts[1]) || prev.lat,
                lon: parseFloat(parts[2]) || prev.lon,
                // We'll capture battery and temp data too for when you're ready
                vbat: parseFloat(parts[3]),
                currentData: parseFloat(parts[4]),
                t1: parseFloat(parts[5]),
                t2: parseFloat(parts[6])
              }));
            }
          } catch (e) {
            console.error("Error parsing serial line:", e, line);
          }
        }
        
        // Keep the incomplete line for the next chunk
        buffer = lines[lines.length - 1]; 
      }
    } catch (error) {
      console.error("Error reading serial stream:", error);
    } finally {
      reader.releaseLock();
    }
  };

  if (isConnected) {
    return <Dashboard telemetryData={telemetryData} telemetryHistory={telemetryHistory} />;
  }

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
          {/* Replaced COM port list with Baud Rate list, because the Web Serial API uses a secure native popup to select the COM port */}
          <select 
            className="port-select" 
            value={baudRate} 
            onChange={(e) => setBaudRate(e.target.value)}
            disabled={isConnected}
          >
            <option value="9600">9600 bps</option>
            <option value="38400">38400 bps</option>
            <option value="57600">57600 bps</option>
            <option value="115200">115200 bps</option>
          </select>
          <button 
            className="start-btn" 
            onClick={handleStart}
            disabled={isConnected}
          >
            {isConnected ? 'LIVE' : 'START'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
