import React from 'react';
import styles from './MouseControl.module.scss';
import ArrowLeft from '/src/assets/icons/mouseArrow.svg';
import ArrowSelect from '/src/assets/icons/mouseSelect.svg';

function MouseControl({ onLeftClick, onRightClick, selectedIndex, onEnterClick }) {
    const names = ['승섭', '예서', '길수', '소연', '한규', '수창', '찬영', '지수', '영교', '현경', '민선'];

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.UIContainer}>
                {selectedIndex > 0 && (
                    <div className={styles.textUI}>
                        <p>
                            <span>{names[selectedIndex - 1]}</span>의 롤링페이퍼
                        </p>
                    </div>
                )}
                <div className={styles.mouseContainer}>
                    <img
                        className={`${styles.mousekey} ${selectedIndex === 0 ? styles.disabled : ''}`}
                        src={ArrowLeft}
                        alt="arrowLeft"
                        onClick={onLeftClick}
                    />
                    <img
                        className={`${styles.mousekey} ${selectedIndex === 0 ? styles.disabled : ''}`}
                        src={ArrowSelect}
                        alt="arrowSelect"
                        onClick={onEnterClick}
                    />
                    <img
                        className={`${styles.mousekey} ${selectedIndex === 11 ? styles.disabled : ''}`}
                        src={ArrowLeft}
                        alt="arrowRight"
                        onClick={onRightClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default MouseControl;
