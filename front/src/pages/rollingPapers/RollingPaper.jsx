import React, { useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styles from './RollingPaper.module.scss';
import axiosInstance from '/src/api/axios';

import closeBtn from '/src/assets/icons/close.svg';
import redo from '/src/assets/icons/redo.svg';
import undo from '/src/assets/icons/undo.svg';
import eraser from '/src/assets/icons/eraser.svg';
import save from '/src/assets/icons/save.svg';
import pen from '/src/assets/icons/pen.svg';

const names = ['승섭', '예서', '길수', '소연', '한규', '수창', '찬영', '지수', '영교', '현경', '민선'];

function RollingPaper({ canvasOpen, handleEnterClick, selectedIndex }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [toolWidth, setToolWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState('#ff0000');
  const [isEraser, setIsEraser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  }, [selectedIndex]);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setCanvasSize({ 
          width: offsetWidth,
          height: offsetHeight
        });
      }
    };

    if (canvasOpen) {
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
    }

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [canvasOpen]);

  useEffect(() => {
    const loadCanvasData = async () => {
      setLoading(true);
      setImageLoaded(false);
      try {
        const response = await axiosInstance.get(`/rolling/paper/${selectedIndex}`);
        if (response.data.fileUrl) {
          setBackgroundImage(response.data.fileUrl);
        } else {
          setBackgroundImage(null);
          setLoading(false);
          setImageLoaded(true);
        }
      } catch (error) {
        console.error('Error loading canvas:', error.message);
        setBackgroundImage(null);
        setLoading(false);
        setImageLoaded(true);
      }
    };

    if (canvasOpen && selectedIndex) {
      loadCanvasData();
    }
  }, [selectedIndex, canvasOpen]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLoading(false);
  };

  const saveCanvasData = async () => {
    try {
      const imageData = await canvasRef.current.exportImage('png');
      const response = await axiosInstance.post(`/rolling/paper/${selectedIndex}`, {
        imageData,
      });

      if (response.status === 200) {
        alert('성공적으로 저장되었습니다!');
      } else {
        alert('저장 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error saving canvas data:', error.response || error.message);
      alert('저장에 실패했습니다.');
    }
  };

  const handleUndo = () => canvasRef.current.undo();
  const handleRedo = () => canvasRef.current.redo();
  const toggleEraser = () => {
    setIsEraser(true);
    canvasRef.current.eraseMode(true);
  };
  const togglePen = () => {
    setIsEraser(false);
    canvasRef.current.eraseMode(false);
  };
  const handleToolWidthChange = (e) => setToolWidth(e.target.value);
  const handleColorChange = (e) => setStrokeColor(e.target.value);

  return (
    <div className={`${styles.canvasPage} ${canvasOpen ? styles.active : ''}`}>
      <div className={styles.canvasWrapper} ref={containerRef}>
        <h1>{ loading ? "불러오는중" :names[selectedIndex - 1] + ' 롤링페이퍼'} </h1>
        <img 
          className={styles.closeBtn} 
          onClick={handleEnterClick} 
          src={closeBtn} 
          alt="closeButton" 
        />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 1,
          transition: 'opacity 0.3s ease'
        }} />
        
        {backgroundImage && (
          <img 
            src={backgroundImage}
            alt="Background"
            onLoad={handleImageLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 2,
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        
        {canvasSize.width > 0 && canvasSize.height > 0 && (
          <ReactSketchCanvas
            ref={canvasRef}
            width={`${canvasSize.width}px`}
            height={`${canvasSize.height}px`}
            strokeWidth={toolWidth}
            strokeColor={strokeColor}
            eraserWidth={toolWidth}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'transparent',
              zIndex: 3,
              opacity: imageLoaded || !backgroundImage ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            canvasColor="transparent"
          />
        )}

        <div className={styles.canvasControls}>
          <button onClick={handleUndo} className={styles.controlButton}>
            <img src={undo} alt="undo" />
          </button>
          <button onClick={handleRedo} className={styles.controlButton}>
            <img src={redo} alt="redo" />
          </button>
          <button 
            onClick={toggleEraser} 
            className={`${styles.controlButton} ${isEraser ? styles.selected : ''}`}
          >
            <img src={eraser} alt="eraser" />
          </button>
          <button 
            onClick={togglePen} 
            className={`${styles.controlButton} ${!isEraser ? styles.selected : ''}`}
          >
            <img src={pen} alt="pen" />
          </button>
          <button onClick={saveCanvasData} className={styles.controlButton}>
            <img src={save} alt="save" />
          </button>

          <div className={styles.rangeControl}>
            <input
              type="range"
              min="1"
              max="40"
              value={toolWidth}
              onChange={handleToolWidthChange}
            />
          </div>

          <div className={styles.colorPicker}>
            <input
              type="color"
              value={strokeColor}
              onChange={handleColorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollingPaper;