import React from 'react';
import styles from './ProfileArea.module.scss';
import defaultImg from '../../assets/images/default.jpg';
import { useNavigate } from 'react-router-dom';
import useUserStore from '/src/store/userStore';
import KakaoLogin from '../common/Auth/KakaoLogin';

function ProfileArea() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  
  // 가입 날짜 포맷팅
  const formattedDate = user ? new Date(user.createdAt).toLocaleDateString('ko-KR') : null;

  const handleLogout = () => {
    // 상태 초기화
    setUser(null);
    // 토큰 삭제 (옵션)
    localStorage.removeItem('accessToken');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.backgroundPic}>
          <p className={styles.createdAt}>
            {user ? `${formattedDate} 가입` : '2000.00.00 가입'}
          </p>
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>
            {user ? user.nickname : '로그인 정보 없음'}
          </p>
          <p className={styles.userTitle}>1번째 등록자</p>
          <div className={styles.footer}>
            {user ? (
              <button className={styles.logout} onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <KakaoLogin wide={false} />
            )}
          </div>
        </div>
        <img
          className={styles.profilePic}
          src={user ? user.profile_image : defaultImg}
          alt="Profile"
        />
      </div>
    </div>
  );
}

export default ProfileArea;
