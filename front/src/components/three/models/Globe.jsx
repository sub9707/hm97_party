import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Globe({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/globe.glb');
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
            position={[-1.8, 5.2, 0.7]} 
            rotation={[0, 3, 0]} 
            scale={[0.003, 0.003, 0.003]} 
        />
    );
}

export default Globe;
