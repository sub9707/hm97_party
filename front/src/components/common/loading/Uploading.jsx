import React from 'react';
import Lottie from 'react-lottie';
import lottieData from '/src/assets/lotties/upload.json';
import styles from "./Uploading.module.scss";

function Uploading({ completed, total }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lottieData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalWrapper}>
                <div className={styles.modalContainer}>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={300}
                    />
                    <p>{`${completed} / ${total} 업로드 중...`}</p>
                </div>
            </div>
        </div>
    );
}

export default Uploading;
