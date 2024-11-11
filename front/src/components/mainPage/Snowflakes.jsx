import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Snowflakes({ speed = 0.05, sway = 1, swayFrequency = 2 }) {
    const ref = useRef();
    const [positions] = useState(() => {
        const positionsArray = new Float32Array(3000 * 3); // 3000개의 입자 생성
        for (let i = 0; i < 3000; i++) {
            positionsArray[i * 3] = Math.random() * 100 - 50; // X 좌표
            positionsArray[i * 3 + 1] = Math.random() * 100 - 50; // Y 좌표
            positionsArray[i * 3 + 2] = Math.random() * 100 - 50; // Z 좌표
        }
        return positionsArray;
    });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime(); // 경과 시간
        
        for (let i = 0; i < 3000; i++) {
            positions[i * 3 + 1] -= speed; // 아래로 떨어지는 속도

            // X 축 좌우 미세한 흔들림 추가 (부드러운 진동)
            const swayOffset = Math.sin(time * swayFrequency + i) * sway; // 부드러운 흔들림 적용
            positions[i * 3] += swayOffset;

            // 눈송이가 바닥에 닿으면 다시 위로 초기화
            if (positions[i * 3 + 1] < -50) {
                positions[i * 3 + 1] = 50; // Y 축을 다시 위로 설정
                positions[i * 3] = Math.random() * 100 - 50; // X 좌표를 랜덤하게 초기화
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} frustumCulled={false}>
            <PointMaterial size={0.2} color="white" transparent opacity={0.8} />
        </Points>
    );
}




export default Snowflakes