import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TelemetryGraphs = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', minWidth: 0 }}>
      {/* Velocity Graph */}
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ccc" tick={{fill: '#ccc'}} tickFormatter={(t) => typeof t === 'number' ? t.toFixed(1) : t} />
            <YAxis stroke="#ccc" tick={{fill: '#ccc'}} domain={['auto', 'auto']} width={40} />
            <Tooltip contentStyle={{ backgroundColor: '#282C34', border: '1px solid #555', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ccc' }} />
            
            <Line type="monotone" dataKey="vx" stroke="#22c55e" dot={false} isAnimationActive={false} name="Vx (m/s)" />
            <Line type="monotone" dataKey="vy" stroke="#3b82f6" dot={false} isAnimationActive={false} name="Vy (m/s)" />
            <Line type="monotone" dataKey="vz" stroke="#ef4444" dot={false} isAnimationActive={false} name="Vz (m/s)" />
            <Line type="monotone" dataKey="v" stroke="#eab308" dot={false} isAnimationActive={false} name="V (m/s)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Acceleration Graph */}
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ccc" tick={{fill: '#ccc'}} tickFormatter={(t) => typeof t === 'number' ? t.toFixed(1) : t} />
            <YAxis stroke="#ccc" tick={{fill: '#ccc'}} domain={['auto', 'auto']} width={40} />
            <Tooltip contentStyle={{ backgroundColor: '#282C34', border: '1px solid #555', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ccc' }} />
            
            <Line type="monotone" dataKey="ax" stroke="#22c55e" dot={false} isAnimationActive={false} name="Ax (m/s²)" />
            <Line type="monotone" dataKey="ay" stroke="#3b82f6" dot={false} isAnimationActive={false} name="Ay (m/s²)" />
            <Line type="monotone" dataKey="az" stroke="#ef4444" dot={false} isAnimationActive={false} name="Az (m/s²)" />
            <Line type="monotone" dataKey="a" stroke="#eab308" dot={false} isAnimationActive={false} name="A (m/s²)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryGraphs;
