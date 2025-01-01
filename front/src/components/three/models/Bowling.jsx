import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Bowling({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/bowling.glb');
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
            position={[-1.1, 0.8, 0.7]} 
            rotation={[0, Math.PI, 0]} 
            scale={[0.35, 0.35, 0.35]} 
        />
    );
}

export default Bowling;
