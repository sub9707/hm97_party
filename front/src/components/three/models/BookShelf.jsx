import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function BookShelf({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/bookshelf.glb');
    const { actions } = useAnimations(animations, scene);

    // Set castShadow and receiveShadow to true for all meshes
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
            position={[0, 2.7, 0]} 
            rotation={[0, 0, 0]} 
            scale={[5, 5, 5]} 
        />
    );
}

export default BookShelf;
