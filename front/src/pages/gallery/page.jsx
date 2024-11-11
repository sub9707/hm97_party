import React from 'react';
import styles from './page.module.scss';

const GalleryPage = () => {
  const images = [
    { src: "https://31.media.tumblr.com/tumblr_mel7ujiRxo1qha057o1_1280.jpg", caption: "Summer 2014" },
    { src: "http://favim.com/orig/201107/03/art-desert-lo-fi-nature-neil-krug-photography-Favim.com-92907.jpg", caption: "Death valley" },
    { src: "https://33.media.tumblr.com/tumblr_lgidr1McXV1qdimp1o1_400.jpg", caption: "Early morning" },
    { src: "https://m1.behance.net/rendition/modules/4344109/disp/674ec054303b2c2e7e39527e2f8dd01b.jpg", caption: "Lost." },
    { src: "https://38.media.tumblr.com/tumblr_l8zzb3pezm1qdimp1o1_400.jpg", caption: "#Brooklyn" },
    { src: "http://www.adventure-journal.com/wp-content/uploads/2009/11/jackbrull01_470.jpg", caption: "Why now?" },
    { src: "http://www.webdesign.org/img_articles/22269/Sierra1.png", caption: "Verbier 10.08.2002" },
    { src: "http://media-cache-ak0.pinimg.com/236x/55/82/2d/55822d7c9855f4751051328681cde4c0.jpg", caption: "My temporary home" },
    { src: "https://33.media.tumblr.com/tumblr_lgidr1McXV1qdimp1o1_400.jpg", caption: "Love" },
    { src: "https://33.media.tumblr.com/tumblr_lgidr1McXV1qdimp1o1_400.jpg", caption: "Torino 2013" },
    { src: "https://m1.behance.net/rendition/modules/4344109/disp/674ec054303b2c2e7e39527e2f8dd01b.jpg", caption: "Miss you.." },
    { src: "https://m1.behance.net/rendition/modules/4344109/disp/674ec054303b2c2e7e39527e2f8dd01b.jpg", caption: "Miss you.." },
    { src: "https://m1.behance.net/rendition/modules/4344109/disp/674ec054303b2c2e7e39527e2f8dd01b.jpg", caption: "Miss you.." },
    { src: "https://m1.behance.net/rendition/modules/4344109/disp/674ec054303b2c2e7e39527e2f8dd01b.jpg", caption: "Miss you.." },
  ];

  return (
    <div className={styles.background}>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <figure key={index} className={styles[`pic${index + 1}`]}>
            <img src={image.src} alt={image.caption} className={styles.image} />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
