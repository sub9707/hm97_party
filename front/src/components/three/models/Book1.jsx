import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Book1({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/book1.glb');
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
            position={[-1.5, 3.89, 0.5]} 
            rotation={[0, -Math.PI/2, 0]} 
            scale={[0.3, 0.3, 0.3]} 
        />
    );
}

export default Book1;
