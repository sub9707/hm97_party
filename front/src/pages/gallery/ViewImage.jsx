import React, { useState, useRef } from 'react';
import styles from './ViewImage.module.scss';
import Download from '/src/assets/icons/download.svg';

function ViewImage({ fileId, title, detail, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    context.strokeStyle = getRandomColor(); // Set random color
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  };

  // Setup canvas when component mounts
  React.useEffect(() => {
    if (isFlipped) {
      setupCanvas();
    }
  }, [isFlipped]);

  return (
    <div
      className={styles.background}
      onClick={(e) => {
        e.stopPropagation();
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
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          ></canvas>
        </div>
      </div>
    </div>
  );
}

export default ViewImage;