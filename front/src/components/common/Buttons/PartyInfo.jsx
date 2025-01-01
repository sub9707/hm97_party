import React from 'react'
import styles from './PartyInfo.module.scss';
import Lottie from 'react-lottie';
import lottieData from '/src/assets/lotties/party.json';
import useModalStore from '/src/store/useModalStore';
import PartyInfoModal from '/src/components/common/Modal/PartyInfoModal';

function PartyInfo() {
    const { openModal } = useModalStore();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lottieData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className={styles.cardArea}>
            <div className={styles.cardWrapper}>
                <Lottie
                    className={styles.LottieImg}
                    options={defaultOptions}
                    width={350}
                    height={200}
                    style={{position:'absolute', right:'0', bottom: '0'}}
                />
                <div className={styles.anchorWrapper}>
                    <h1>다 집합! 모여봐라!!</h1>
                    <p>2024년 12월 28일 파티 정보를 확인하세요</p>
                    <button onClick={()=> openModal('partyInfo', PartyInfoModal)}>파티 정보 확인</button>
                </div>
            </div>
        </div>
    )
}

export default PartyInfo