import React from 'react'
import styles from './CountDown.module.scss';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function CountDown() {
    const targetTime = new Date('2024-12-28 15:00:00');

    return (
        <div className={styles.wrapper}>
            <FlipClockCountdown to={targetTime} />
        </div>
    )
}

export default CountDown