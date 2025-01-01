import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Bridge({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/bridge.glb');
    const { actions } = useAnimations(animations, scene);

    // Set castShadow to true for all meshes
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <primitive 
            object={scene} 
            position={[1.3, 5.2, 0.7]} 
            rotation={[Math.PI/12, Math.PI/2, 0]} 
            scale={[13, 13, 13]} 
        />
    );
}

export default Bridge;
