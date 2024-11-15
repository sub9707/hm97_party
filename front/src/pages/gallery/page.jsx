import React, { useState, useEffect } from 'react';
import styles from './page.module.scss';
import axiosInstance from '../../api/axios';
import LoadPhoto from '../../components/common/loading/loadPhoto';

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

  useEffect(() => {
    // Fetch the image data when the component mounts
    const loadImages = async () => {
      setLoaded(false);
      const data = await fetchImages();
      setImages(data);
      
      setTimeout(()=>{
        setLoaded(true);
      },1500)
    };

    loadImages();
  }, []);

  return (
    <>
    { isLoaded || <LoadPhoto/>}
    <div className={styles.background}>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <ImageCard key={index} image={image} />
        ))}
      </div>
      <div className={styles.vignette} />
    </div>
    </>
  );
};

const ImageCard = ({ image }) => {
  const imageUrl = `https://drive.google.com/thumbnail?id=${image.id}&export=view`;

  return (
    <figure style={{ ...getRandomStyle() }}>
      <img src={imageUrl} alt={image.name} className={styles.image} />
      <figcaption>{image.name}</figcaption>
      <p>{image.description}</p>
    </figure>
  );
};

export default GalleryPage;
