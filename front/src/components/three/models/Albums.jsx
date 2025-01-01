import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

function Albums({ playAnimation, selectedIndex }) {
    const groupRef = useRef();

    // Load multiple GLTF files
    const models = Array.from({ length: 11 }, (_, i) => {
        const path = `/model/books/book${i + 1}.glb`;
        return useGLTF(path);
    });

    // Set shadow properties after models are loaded
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.side = THREE.DoubleSide;
                }
            });
        }
    }, [models]);

    return (
        <group ref={groupRef} dispose={null} position={[-1.2, 0, 0]}>
            {models.map((model, index) => {
                // Animate zPosition for the selected book
                const { z } = useSpring({
                    z: index + 1 === selectedIndex ? 1 : 0.7,
                    config: { mass: 1, tension: 170, friction: 26 },
                });

                return (
                    <animated.primitive
                        key={index}
                        object={model.scene}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        position={z.to((zValue) => [index * 0.25, 2.95, zValue])}
                        scale={[1.7, 1.7, 1.7]}
                    />
                );
            })}
        </group>
    );
}

export default Albums;
