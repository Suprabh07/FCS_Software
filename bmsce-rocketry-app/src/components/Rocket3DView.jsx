import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import RocketModel from './RocketModel';

const Rocket3DView = ({ pitch, yaw, roll }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Matches new dashboard panel styling
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px', 
      overflow: 'hidden' 
    }}>
      <Canvas camera={{ position: [0, 2, 7], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        <RocketModel roll={roll} pitch={pitch} yaw={yaw} />
        <OrbitControls />
        
        <Grid args={[10, 10]} position={[0, -2.5, 0]} infiniteGrid fadeDistance={20} cellColor="#6f6f6f" sectionColor="#eb4034" />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
};

export default Rocket3DView;