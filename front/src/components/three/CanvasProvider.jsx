import React, { createContext } from 'react';
import { Canvas } from '@react-three/fiber';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  return (
    <CanvasContext.Provider
      value={
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          {children}
        </Canvas>
      }
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContext;
