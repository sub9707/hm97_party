import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import christmasData from '../../assets/lotties/santa.json';

function SantaLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: christmasData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [position, setPosition] = useState({ left: -25 * 16, top: window.innerHeight - 700 });
    const [rotation, setRotation] = useState(0); // Initial rotation

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) => {
                const newLeft = prevPosition.left + 12;
                const newTop = window.innerHeight - 700 - Math.sin((newLeft / 1500) * Math.PI) * 350;

                // Calculate rotation based on the direction of movement
                const deltaX = newLeft - prevPosition.left;
                const deltaY = newTop - prevPosition.top;
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                // Apply the calculated angle and add an offset for final rotation
                setRotation(angle + 20); // Adding 20 degrees for final tilt effect

                // Reset to start position with a 1-second delay if past the screen
                if (newLeft > window.innerWidth + 800) {
                    setTimeout(() => {
                        setPosition({ left: -25 * 16, top: window.innerHeight - 700 });
                        setRotation(0); // Reset rotation to start position
                    }, 1000);
                    return prevPosition;
                }

                return { left: newLeft, top: newTop };
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    return (
        <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            style={{
                position: "absolute",
                left: `${position.left}px`,
                top: `${position.top}px`,
                overflow: "hidden",
                transform: `rotate(${rotation}deg)` // Apply rotation based on calculated angle
            }}
        />
    );
}

export default SantaLottie;
