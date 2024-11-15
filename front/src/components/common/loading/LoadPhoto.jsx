import React from 'react'
import Lottie from 'react-lottie';
import christmasData from '/src/assets/lotties/photo.json';
import styles from "./LoadPhoto.module.scss"

function LoadPhoto() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: christmasData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

  return (
    <div className={styles.loadPage}>
        <div className={styles.loadingContainer}>
        <Lottie
            options={defaultOptions}
            height={300}
            width={700}
        />
        <p>사진 불러오는 중</p>
        </div>
    </div>
  )
}

export default LoadPhoto