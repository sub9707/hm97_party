import React from 'react';
import Lottie from 'react-lottie';
import christmasData from '../../assets/lotties/christmas-deco.json';

function DecorationLottie({ invert }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: christmasData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            style={{
                position: "absolute",
                overflow: "hidden",
                right: invert ? "auto" : "2em",
                left: invert ? "2em" : "auto",
                transform: invert ? "scaleX(-1)" : "none", // Flip horizontally if invert is true
            }}
        />
    );
}

export default DecorationLottie;
