import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function FishBuns({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/fish.glb');
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
            position={[2.1, 2.38, 0.7]} 
            rotation={[0, Math.PI/2, 0]} 
            scale={[0.3, 0.3, 0.3]} 
        />
    );
}

export default FishBuns;
