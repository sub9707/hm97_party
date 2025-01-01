import React from 'react'
import styles from './MainMenu.module.scss';
import { useNavigate } from 'react-router-dom';

function MainMenu({ title, text, image, disabled=false, route='/' }) {
    const navigate = useNavigate();
    const handleRoute = () =>{
        if (!disabled) {
            navigate(route);
        }
    }
    return (
        <div className={`${styles.ButtonBox} ${disabled ? styles.disabled : ''}`}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title + ' thumbnail'} />
            </div>
            <div className={styles.cardInfoContainer}>
                <div className={styles.cardText}>
                    <h2 className={styles.infoTitle}>{title}</h2>
                    <p className={styles.infoDetail}>{text}</p>
                </div>
                <div className={styles.cardFooter}>
                    <button className={styles.confirmBtn} onClick={handleRoute}>
                        바로가기
                    </button>
                </div>
            </div>
            <div className={styles.disabledCover}>
                <h3>이벤트 기간에 활성화됩니다</h3>
            </div>
        </div>
    )
}

export default MainMenu