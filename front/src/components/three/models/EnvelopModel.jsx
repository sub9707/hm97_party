import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function EnvelopModel({ playAnimation }) {
    const { scene, animations } = useGLTF('/model/envelop/scene.gltf');
    const { actions } = useAnimations(animations, scene);

    return (
        <primitive 
            object={scene} 
            position={[0, -1, 0]} 
            rotation={[Math.PI / 2, 0, 0]} 
            scale={[5, 5, 5]} 
        />
    );
}

export default EnvelopModel;
