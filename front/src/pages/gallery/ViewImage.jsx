import React, { useState } from 'react';
import styles from './ViewImage.module.scss';
import Download from '/src/assets/icons/download.svg';

function ViewImage({ fileId, title, detail, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation(); // Stop propagation to parent
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={styles.background}
      onClick={(e) => {
        e.stopPropagation(); // Prevent onClose trigger
        onClose();
      }}
    >
      <div
        className={`${styles.imageContainer} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div className={styles.front}>
          <div className={styles.imageBox}>
            <iframe
              src={`https://drive.google.com/file/d/${fileId}/preview`}
              title={title}
              className={styles.imageIframe}
              allow="autoplay"
            ></iframe>
            <div className={styles.imageDownload}>
              <img src={Download} alt="image-download-button" />
            </div>
          </div>
          <div className={styles.imageDetailBox}>
            <p className={styles.imageTitle}>{title}</p>
            <p className={styles.imageDetail}>{detail}</p>
          </div>
        </div>

        {/* Back Side */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            <p>Back Side</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewImage;
