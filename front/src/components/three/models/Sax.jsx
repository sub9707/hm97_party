import React, { useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Sax({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/sax.glb');
    const { actions } = useAnimations(animations, scene);
    const [hovered, setHovered] = useState(false);

    // Set castShadow and material properties
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.roughness = 0.5;
                    child.material.metalness = 0.5;
                }
            }
        });
    }, [scene]);

    return (
        <primitive 
            object={scene} 
            position={[-3.5, 0, 0.8]} 
            rotation={[0, -Math.PI/1.5, Math.PI/14]} 
            scale={[0.7, 0.7, 0.7]}
            onClick={() => alert('색소폰을 클릭하셨습니다!')}
            onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                setHovered(true);
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHovered(false);
            }}
        />
    );
}

export default Sax;