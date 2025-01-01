import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Sax({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/sax.glb');
    const { actions } = useAnimations(animations, scene);

    // Set castShadow to true for all meshes
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.roughness = 0.5; // 적절히 조정
                    child.material.metalness = 0.5; // 적절히 조정
                }
            }
        });
    }, [scene]);

    return (
        <primitive 
            object={scene} 
            position={[-3.5, 0, 0.8]} 
            rotation={[0, -Math.PI/1.5, Math.PI/14]} 
            scale={[0.7,0.7, 0.7]} 
        />
    );
}

export default Sax;
