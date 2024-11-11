import React, { useState } from 'react';
import FullPageLayout from '../FullPageLayout';
import { Canvas } from '@react-three/fiber';
import EnvelopModel from '../../components/three/models/EnvelopModel';
import { OrbitControls } from '@react-three/drei';
import styles from './IntroPage.module.scss';

import KAKAO_LOGIN_BUTTON from '../../assets/icons/kakao_login_medium_wide.png';
import KakaoLogin from '../../components/common/Auth/KakaoLogin';

function IntroPage() {
    const [playAnimation, setPlayAnimation] = useState(false);

    const handleButtonClick = () => {
        if (!playAnimation) { // Only allow to trigger if not already playing
            setPlayAnimation(true);

            // Reset playAnimation after a short delay (just enough for the animation to play)
            setTimeout(() => setPlayAnimation(false), 1000); // Adjust time based on the animation length
        }
    };

    return (
        <FullPageLayout>
            <Canvas className={styles.threeCanvas}>
                {/* Optional lighting */}
                <ambientLight intensity={Math.PI} />
                <directionalLight position={[0, 0, 1]} intensity={3} />
                {/* Load the 3D model */}
                <EnvelopModel playAnimation={playAnimation} />

                {/* Camera controls */}
                <OrbitControls enableZoom={true} />

                <axesHelper args={[5]} />
            </Canvas>

            {/* Button to trigger animation */}
            {/* <button onClick={handleButtonClick} style={{ position: 'absolute', bottom: '20px' }}>
                Play Animation
            </button> */}
            <KakaoLogin wide={true}/>
        </FullPageLayout>
    );
}

export default IntroPage;
