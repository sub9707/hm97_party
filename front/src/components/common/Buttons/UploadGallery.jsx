import React, { useRef } from 'react';
import axiosInstance from '/src/api/axios';
import styles from './UploadGallery.module.scss';
import CrossIcon from '/src/assets/icons/cross.svg';

function UploadGallery({ setUploading, setUploadProgress, refreshImages, setImages }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setUploading(true);
      setUploadProgress({ completed: 0, total: files.length });

      try {
        const fileUploadPromises = Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append('images', file);

          await axiosInstance.post('/gallery/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 30000,
          });

          // 진행 상태 갱신
          setUploadProgress((prev) => ({
            ...prev,
            completed: prev.completed + 1,
          }));
        });

        await Promise.all(fileUploadPromises);

        // 업로드 완료 후 이미지 다시 가져오기
        const updatedImages = await refreshImages();
        setImages(updatedImages);
      } catch (error) {
        alert(`Upload failed: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className={styles.buttonWrapper} onClick={handleButtonClick}>
      <img src={CrossIcon} alt="Add Icon" />
      <p>사진 추가</p>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
}

export default UploadGallery;

