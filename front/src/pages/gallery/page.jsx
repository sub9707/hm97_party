import React, { useState, useEffect } from 'react';
import styles from './page.module.scss';
import axiosInstance from '../../api/axios';
import LoadPhoto from '../../components/common/loading/loadPhoto';
import Scroll from '../../components/common/Scrollbar/SmoothScrollbar';
import './scrollWrapper.css';
import PageModel from './PageModel';
import UploadGallery from '../../components/common/Buttons/UploadGallery';
import Uploading from '../../components/common/loading/Uploading';

const fetchImages = async () => {
  const response = await axiosInstance.get('/gallery/pictures');
  return response.data;
};

const getRandomStyle = () => {
  const rotations = [-20, -10, -8, -5, 0, 10, 15, 25];
  const zIndexes = [1, 2, 3, 4, 5];

  const rotation = rotations[Math.floor(Math.random() * rotations.length)];
  const zIndex = zIndexes[Math.floor(Math.random() * zIndexes.length)];

  return {
    transform: `rotate(${rotation}deg)`,
    zIndex: zIndex,
  };
};

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    const loadImages = async () => {
      setLoaded(false);
      const data = await fetchImages();
      setImages(data);

      setTimeout(() => {
        setLoaded(true);
      }, 1500);
    };

    loadImages();
  }, []);

  return (
    <>
      <Scroll />
      {isLoaded || <LoadPhoto />}
      <div className={styles.background}>
        <UploadGallery
          setUploading={setUploading}
          setUploadProgress={setUploadProgress}
          refreshImages={fetchImages}
          setImages={setImages}
        />
        <PageModel />
        <div className="scrollWrapper">
          <div className="gallery">
            {images.map((image, index) => (
              <ImageCard key={index} image={image} />
            ))}
          </div>
        </div>
        <div className={styles.vignette} />
        {isUploading && (
          <Uploading
            completed={uploadProgress.completed}
            total={uploadProgress.total}
          />
        )}
      </div>
    </>
  );
};

const ImageCard = ({ image }) => {
  const imageUrl = `https://drive.google.com/thumbnail?id=${image.id}&export=view`;

  return (
    <figure style={getRandomStyle()}>
      <img src={imageUrl} alt={image.name} className={styles.image} />
      <figcaption>{image.name}</figcaption>
      <p>{image.description}</p>
    </figure>
  );
};

export default GalleryPage;
