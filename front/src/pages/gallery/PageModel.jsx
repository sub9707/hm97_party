import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import styles from './model.module.scss';

function PageModel() {
    return (
        <div className={styles.modelWrapper}>
            <Canvas className={styles.canvasEl}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 10]} intensity={4} />
                {/* <hemisphereLight intensity={0.5} /> */}
                <Camera scale={1} rotation={[0, 0, Math.PI / 5]} position={[-5.2, 1.8, 1]} />
                <Pen scale={18} rotation={[Math.PI/2, 0, 0]} position={[6.3, -2.5, 0]} />
            </Canvas>
        </div>
    );
}

export default PageModel;

function Camera({ scale = 1, rotation = [0, 0, 0], position = [0, 0, 0] }) {
    const modelRef = useRef();
    const { scene, animations } = useGLTF('/model/camera.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
        }

        return () => {
            if (mixer.current) mixer.current.stopAllAction();
        };
    }, [animations, scene]);

    useEffect(() => {
        if (mixer.current) {
            const clock = new THREE.Clock();

            const animate = () => {
                const delta = clock.getDelta();
                mixer.current.update(delta);
                requestAnimationFrame(animate);
            };

            animate();
        }
    }, []);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.position.set(...position);
            modelRef.current.rotation.set(...rotation);
            modelRef.current.scale.set(scale, scale, scale);
        }
    }, [position, rotation, scale]);

    return <primitive ref={modelRef} object={scene} />;
}

function Pen({ scale = 1, rotation = [0, 0, 0], position = [0, 0, 0] }) {
    const modelRef = useRef();
    const { scene, animations } = useGLTF('/model/pens.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
        }

        return () => {
            if (mixer.current) mixer.current.stopAllAction();
        };
    }, [animations, scene]);

    useEffect(() => {
        if (mixer.current) {
            const clock = new THREE.Clock();

            const animate = () => {
                const delta = clock.getDelta();
                mixer.current.update(delta);
                requestAnimationFrame(animate);
            };

            animate();
        }
    }, []);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.position.set(...position);
            modelRef.current.rotation.set(...rotation);
            modelRef.current.scale.set(scale, scale, scale);
        }
    }, [position, rotation, scale]);

    return <primitive ref={modelRef} object={scene} />;
}
