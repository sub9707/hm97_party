import React from 'react';
import styles from './PartyInfoModal.module.scss';
import closeBtn from '/src/assets/icons/close.svg';
import KakaoMap from './KakaoMap';
import ImageCarousel from '../../PartyInfo/ImageCarousel';
import data from '/src/components/PartyInfo/data';
import Calendar from '../../PartyInfo/Calendar';
import CountDown from '../../PartyInfo/CountDown';

function PartyInfoModal({ onClose }) {
  const handleBackgroundClick = () => {
    onClose();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.modalfullpage} onClick={handleBackgroundClick}>
      <div className={styles.modalContainer} onClick={handleModalClick}>
        <img onClick={onClose} className={styles.closeBtn} src={closeBtn} />
        <div className={styles.modalContent}>
          <h1>파티 정보</h1>
          <p>파티의 개략적인 정보를 알려드립니다.</p>
          <div className={styles.dotLine} />
          <h2>파티 일정</h2>
          <div className={styles.calenderBox}>
            <Calendar/>
            <CountDown/>
          </div>
          <div class="divider div-transparent div-arrow-down" />

          <h2>파티 위치</h2>
          <p className={styles.description}>서울 송파구 오금로59길 6 B1 파티룸 아지트</p>
          <div className={styles.calenderBox}>
            <KakaoMap />
          </div>
          <div className={styles.imageCarouselBox}>
            <ImageCarousel />
          </div>
          <div class="divider div-transparent div-arrow-down" />
          <h2>파티 일정</h2>
          <p> 파티 일정표 표시</p>
          <div className={styles.calenderBox}>
            1
          </div>
        </div>
      </div>
    </div>
  );
}
export default PartyInfoModal;

