import React, { useEffect, useState } from 'react';
import styles from './ProfileArea.module.scss';
import axiosInstance from '../../api/axios';
import defaultImg from '../../assets/images/default.jpg';
import { useNavigate } from 'react-router-dom';

function ProfileArea() {
  const [userInfo, setUserInfo] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Initial userId from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserInfo(null);
    setFormattedDate('');
    setUserId(null);
    navigate('/intro');
  };

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        try {
          const response = await axiosInstance.get(`/auth/kakao/userinfo/${userId}`);
          if (response.data.error) {
            console.error("Failed to fetch user info:", response.data.error);
          } else {
            setUserInfo(response.data);

            if (response.data.createdAt) {
              const date = new Date(response.data.createdAt);
              if (!isNaN(date.getTime())) {
                const formatted = new Intl.DateTimeFormat('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  hour12: false
                }).format(date).replace(':', '시');
                setFormattedDate(formatted);
              } else {
                console.error("Invalid date format in createdAt");
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo();
    }
  }, [userId]); // Refetch if userId changes

  // Poll localStorage to update userId state if it changes
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId !== userId) {
        setUserId(storedUserId);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [userId]);


  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.backgroundPic}>
          <p className={styles.createdAt}>{userInfo ? `${formattedDate} 가입` : '2000.00.00 가입'}</p>
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>{userInfo ? userInfo.nickname : '로그인 정보 없음'}</p>
          <p className={styles.userTitle}>1번째 등록자</p>
          <div className={styles.footer}>
            {userInfo && <button className={styles.logout} onClick={handleLogout}>로그아웃</button>}
          </div>
        </div>
        <img className={styles.profilePic} src={userInfo ? userInfo.profile_image : defaultImg} alt="Profile" />
      </div>
    </div>
  );
}

export default ProfileArea;
