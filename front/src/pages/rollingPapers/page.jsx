import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Loader, OrbitControls, useProgress } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import styles from './page.module.scss';
import MouseControl from './MouseControl';

import BookShelf from '/src/components/three/models/BookShelf';
import Book1 from '/src/components/three/models/Book1';
import Racket from '/src/components/three/models/Racket';
import Bowling from '/src/components/three/models/Bowling';
import Sax from '/src/components/three/models/Sax';
import Globe from '/src/components/three/models/Globe';
import Bridge from '/src/components/three/models/Bridge';
import Jenga from '/src/components/three/models/Jenga';
import Albums from '/src/components/three/models/Albums';
import FishBuns from '/src/components/three/models/FishBuns';
import RollingPaper from './RollingPaper';
import Smoke from '../../components/three/models/Smoke';

function Page() {
    const { progress } = useProgress();
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [fogActive, setFogActive] = useState(true);
    const [zoom, setZoom] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canvasOpen, setCanvasOpen] = useState(false);

    const handleLeftClick = () => {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleRightClick = () => {
        setSelectedIndex((prev) => Math.min(prev + 1, 11));
    };

    const handleEnterClick = () => {
        if (!canvasOpen) setCanvasOpen(true);
        else setCanvasOpen(false);
    }

    const fogAnimation = useSpring({
        fogDensity: fogActive ? 0.1 : 0,
        config: { duration: 1500 },
    });

    const zoomAnimation = useSpring({
        scale: zoom ? 2 : 1,
        rotation: zoom ? [Math.PI / 10, 0, 0] : [0, 0, 0],
        position: zoom ? [0, -5.5, 0] : [0, -3.5, 0],
        config: { tension: 120, friction: 100, mass: 5 },
    });

    const handleCanvasClick = () => {
        setFogActive(false);
        setZoom(true);
    };

    // 로딩 완료 시 상태 업데이트
    useEffect(() => {
        if (progress === 100) {
            setLoadingComplete(true);
        }
    }, [progress]);

    return (
        <div className={styles.pageWrapper}>
            {/* 오버레이 텍스트 */}
            {loadingComplete && (
                <>
                    {fogActive &&
                        <div
                            className={styles.overlayText}
                            onClick={handleCanvasClick}
                        >
                            화면을 클릭하세요
                        </div>
                    }
                    <Smoke fadeOut={!fogActive} />
                </>
            )}

            {/* 캔버스 */}
            <Canvas
                shadows
                camera={{ position: [0, 0, 20], fov: 50 }}
                className={styles.threeCanvas}
                onCreated={({ gl }) => {
                    gl.setClearColor('#ffd9c0'); // 캔버스 배경색 설정
                }}
                onUnmount={({ gl }) => {
                    gl.dispose(); // WebGL 리소스 정리
                  }}
            >
                {/* 안개 */}
                <animated.fog
                    attach="fog"
                    args={['#ffffff', 10, 30]} // 안개 색상 및 시작/끝 거리
                    density={fogAnimation.fogDensity}
                />

                {/* Lighting */}
                <ambientLight intensity={2} />
                <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={1.5}
                    shadow-mapSize={1024}
                />

                {/* Models */}
                <Suspense fallback={null}>
                    <animated.group scale={zoomAnimation.scale} rotation={zoomAnimation.rotation} position={zoomAnimation.position}>
                        <BookShelf />
                        <Book1 />
                        <Racket />
                        <Bowling />
                        <Sax />
                        <Globe />
                        <Bridge />
                        <Jenga />
                        <FishBuns />
                        <Albums selectedIndex={selectedIndex} playAnimation={false} />
                        {/* Floor */}
                        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                            <planeGeometry args={[10, 10]} />
                            <shadowMaterial opacity={0.4} />
                        </mesh>
                    </animated.group>
                </Suspense>
            </Canvas>
            {loadingComplete && !fogActive && <MouseControl onLeftClick={handleLeftClick} onRightClick={handleRightClick} selectedIndex={selectedIndex} onEnterClick={handleEnterClick} />}

            <RollingPaper canvasOpen={canvasOpen} handleEnterClick={handleEnterClick} selectedIndex={selectedIndex} />
            {/* Loader */}
            {!loadingComplete && <Loader />}
        </div>
    );
}

export default Page;
