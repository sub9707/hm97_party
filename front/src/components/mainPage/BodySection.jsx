import React, { useEffect } from 'react';
import styles from './BodySection.module.scss';
import ProfileArea from './ProfileArea';
import MainMenuArea from './MainMenuArea';
import { useLocation } from 'react-router-dom';
import PartyInfo from '../common/Buttons/PartyInfo';

function BodySection() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    // userId가 URL에 존재하면 로컬 스토리지에 저장
    if (userId) {
      localStorage.setItem('userId', userId);

      // URL에서 userId 파라미터를 제거하는 코드
      params.delete('userId');
      window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    }
  }, [location]);

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.bodyWrapper}>
        <div className={styles.bodyHeaderArea}>
          <PartyInfo/>
          <ProfileArea />
        </div>
        <MainMenuArea />
      </div>
    </div>
  )
}

export default BodySection