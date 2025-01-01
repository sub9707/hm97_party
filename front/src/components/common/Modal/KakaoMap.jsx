import React, { useEffect, useRef } from 'react'
import styles from './KakaoMap.module.scss';
import Marker from '/src/assets/icons/marker.svg';

const { kakao } = window;

function KakaoMap() {

    const Longitude = 127.144166;
    const Latitude = 37.493960;

    const container = useRef(null); // 지도 컨테이너 접근
    useEffect(() => {
        const position = new kakao.maps.LatLng(Latitude, Longitude);
        const options = {
            center: position,
            level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);

        const imageSrc = Marker,
            imageSize = new kakao.maps.Size(50, 50),
            imageOption = { offset: new kakao.maps.Point(30, 50) };

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(Latitude, Longitude);

        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
        });

        marker.setMap(map);  

    }, []);

    return (
        <div className={styles.KakaoMapBox} ref={container}></div>
    )
}

export default KakaoMap