import React, { useRef } from 'react';

const RocketModel = ({ pitch = 0, yaw = 0, roll = 0 }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef} rotation={[pitch, yaw, roll]}>
      {/* Simple stylized rocket built with basic geometries */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#ff3333" />
      </mesh>

      {/* Fins */}
      <mesh position={[0, -1, 0.5]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial color="#ff3333" />
      </mesh>
      <mesh position={[0, -1, -0.5]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial color="#ff3333" />
      </mesh>
      <mesh position={[0.5, -1, 0]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#ff3333" />
      </mesh>
      <mesh position={[-0.5, -1, 0]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#ff3333" />
      </mesh>
    </group>
  );
};

export default RocketModel;
