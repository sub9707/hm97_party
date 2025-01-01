import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Jenga({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/jenga.glb');
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
            position={[-0.4, 5.2, 0.7]} 
            rotation={[0, 3, 0]} 
            scale={[0.1, 0.1, 0.1]} 
        />
    );
}

export default Jenga;
