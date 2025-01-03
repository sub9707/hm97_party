import React, { useEffect } from 'react'
import styles from './HeaderSection.module.scss';
import { Canvas } from '@react-three/fiber';
import Snowflakes from './Snowflakes';
import ParticleText from './ParticleText';
import DecorationLottie from './DecorationLottie';
import SantaLottie from './SantaLottie';

import treeline from '../../assets/images/treeline.png';
import TopDeco from '../../assets/images/deco1.png';
import CornerDeco from '../../assets/images/corner-deco.png';

function HeaderSection() {
    useEffect(() => {
        return () => {
          const canvas = document.querySelector('canvas');
          if (canvas) {
            const gl = canvas.getContext('webgl');
            if (gl) {
              gl.getExtension('WEBGL_lose_context')?.loseContext(); // WebGL 컨텍스트 해제
            }
            canvas.parentNode?.removeChild(canvas); // Canvas 제거
          }
        };
      }, []);
    return (
        <div className={styles.headerSectionContainer}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} onUnmount={({ gl }) => {
                gl.dispose(); // WebGL 리소스 정리
            }}>
                <ambientLight intensity={0.5} />
                <Snowflakes speed={0.02} sway={0.05} swayFrequency={1} />
                <ParticleText text="HM97" fontSize={100} convergenceSpeed={0.03} dispersionSpeed={0.005} cycleDelay={1} holdTextDuration={2} archIntensity={1} particleDensity={2} />
            </Canvas>
            <div className={styles.lottieWrapper}>
                <SantaLottie />
                <DecorationLottie />
                <DecorationLottie invert />
            </div>
            <img className={styles.topDeco} style={{ 'display': 'none' }} src={TopDeco} alt='top-decoration' />
            <img className={styles.leftDeco} src={CornerDeco} alt='corner-decoration' />
            <img className={styles.rightDeco} src={CornerDeco} alt='corner-decoration' />
            <img className={styles.treeline} src={treeline} alt='treeline' />
        </div>
    )
}

export default HeaderSection