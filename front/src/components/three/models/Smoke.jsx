import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

function SmokePlane({ position, scale, rotation, texture, fadeOut }) {
  const planeRef = useRef();
  const initialPosition = useMemo(() => [...position], [position]);
  
  // 개별 Plane 애니메이션
  useFrame((state, delta) => {
    if (planeRef.current) {
      // 기본 회전 애니메이션
      planeRef.current.rotation.z += 0.0005;
      
      if (fadeOut) {
        // 현재 위치에서 바깥쪽으로 방향 계산
        const direction = initialPosition.map(coord => coord * 2);
        
        // 위치 업데이트 - 바깥으로 이동
        planeRef.current.position.x += direction[0] * delta * 0.5;
        planeRef.current.position.y += direction[1] * delta * 0.5;
        planeRef.current.position.z += direction[2] * delta * 0.5;
        
        // 스케일 감소
        planeRef.current.scale.x *= (1 - delta * 0.5);
        planeRef.current.scale.y *= (1 - delta * 0.5);
        
        // 투명도 감소
        if (planeRef.current.material) {
          planeRef.current.material.opacity *= (1 - delta);
        }
      }
    }
  });

  return (
    <mesh
      ref={planeRef}
      position={position}
      rotation={[0, 0, rotation]}
      scale={[scale, scale, scale]}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function SmokeCloud({ texture, fadeOut }) {
  // 여러 Plane 구성
  const planes = useMemo(() => {
    const count = 50;
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const radius = Math.random() * 2 + 1;
      
      positions.push({
        position: [
          Math.cos(angle) * radius * (Math.random() * 3 + 0.5),
          Math.sin(angle) * radius * (Math.random() * 0.5 + 0.5),
          Math.random() * 2 - 1,
        ],
        scale: Math.random() * 10 + 0.5,
        rotation: Math.random() * Math.PI,
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {planes.map((plane, index) => (
        <SmokePlane
          key={index}
          position={plane.position}
          scale={plane.scale}
          rotation={plane.rotation}
          texture={texture}
          fadeOut={fadeOut}
        />
      ))}
    </group>
  );
}

function Smoke({ fadeOut = false }) {
  const texture = useMemo(
    () => new TextureLoader().load("/src/assets/images/smoke.png"),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        position: "absolute",
        zIndex: "999",
        userSelect:'none',
        pointerEvents:'none'
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SmokeCloud texture={texture} fadeOut={fadeOut} />
    </Canvas>
  );
}

export default Smoke;