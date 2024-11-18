import { useEffect } from "react";
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

// 플러그인 등록
Scrollbar.use(OverscrollPlugin);

const options = {
    damping: 0.07,
    plugins: {
        overscroll: {
            effect: 'glow', // 'bounce' 또는 'glow'
            glowColor: '#ffffff', // 빛나는 색상 (glow 효과인 경우)
            maxOverscroll: 150, // 최대 오버스크롤 거리
        },
    },
};

const Scroll = () => {
    useEffect(() => {
        const scrollbar = Scrollbar.init(document.querySelector('.scrollWrapper'), options);

        // Clean-up on unmount
        return () => {
            if (scrollbar) {
                scrollbar.destroy();
            }
        };
    }, []);

    return null;
};

export default Scroll;
