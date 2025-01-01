import React, { useState } from "react";
import styles from "./ImageCarousel.module.scss";
import ItemsCarousel from "react-items-carousel";
import data from "/src/components/PartyInfo/data";
import LeftArrow from '/src/assets/icons/leftArrow.svg';
import RightArrow from '/src/assets/icons/rightArrow.svg';

const ImageCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handlePreviewClick = (index) => {
    setActiveItemIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={0}
        leftChevron={
          <div className={styles.chevron}>
            <img src={RightArrow} alt="Previous" />
          </div>
        }
        rightChevron={
          <div className={styles.chevron}>
            <img src={LeftArrow} alt="Next" />
          </div>
        }
        outsideChevron
        chevronWidth={64}
      >
        {data.map((image, idx) => (
          <img
            src={image.imgSrc}
            alt={image.alt || `Slide ${idx + 1}`}
            className={styles.imageBox}
            key={idx}
          />
        ))}
      </ItemsCarousel>
      <div className={styles.previewContainer}>
      {data.map((image, idx) => (
          <img
            src={image.imgSrc}
            alt={image.alt || `Slide ${idx + 1}`}
            className={`${styles.imagePreview}`}
            key={idx}
            onClick={() => handlePreviewClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
