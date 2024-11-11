import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleText({
    text,
    fontSize = 100,
    convergenceSpeed = 0.05,
    dispersionSpeed = 0.05,
    cycleDelay = 3,
    holdTextDuration = 2,
    archIntensity = 0.5,
    particleDensity = 3,
    jitterAmount = 0.2,
    twinkleSpeed = 0.1, // Controls how fast particles twinkle
    twinkleAmount = 0.5, // Controls the intensity of the twinkle effect
}) {
    const particlesRef = useRef();
    const [initialPositions, setInitialPositions] = useState([]);
    const [targetPositions, setTargetPositions] = useState([]);
    const [opacityOffsets, setOpacityOffsets] = useState([]); // Offset for each particle's twinkle phase
    const [opacity, setOpacity] = useState(0);
    const [converging, setConverging] = useState(true); // Track if particles are converging or dispersing
    const [holdingText, setHoldingText] = useState(false); // Track if particles are holding the text shape

    // Generate particle positions from text rendered in a canvas
    useEffect(() => {
        // Load the Molle-Italic font using FontFace API
        const font = new FontFace('Molle', 'url(../../assets/fonts/Molle-Italic.ttf)');
        
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 500;
            canvas.height = 200;

            // Set font style and render text on the canvas
            ctx.font = `${fontSize}px 'Molle'`; // Use the Molle font
            ctx.fillStyle = 'black';
            ctx.fillText(text, 50, fontSize); // Adjust starting position as needed

            const particlePositions = [];
            const initialPositions = [];
            const opacityOffsets = [];
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // Calculate the text boundaries for precise centering
            const textStartX = 50; // The starting x position of the text on canvas
            const textWidth = ctx.measureText(text).width;
            const textCenterX = textStartX + textWidth / 2;

            // Loop through pixels and store particle positions based on particleDensity
            for (let y = 0; y < canvas.height; y += particleDensity) {
                for (let x = 0; x < canvas.width; x += particleDensity) {
                    const index = (y * canvas.width + x) * 4;
                    const alpha = imageData[index + 3]; // Alpha value to detect presence of a pixel
                    if (alpha > 128) { // Only capture non-transparent pixels
                        // Calculate symmetric arch offset based on distance from text center
                        const normalizedX = (x - textCenterX) / textWidth; // Normalize x to range [-0.5, 0.5]
                        const archOffset = archIntensity * (1 - Math.pow(normalizedX * 2, 2)); // Parabolic arch effect

                        // Calculate target position with a slight random offset (jitter)
                        particlePositions.push(
                            (x - textCenterX) / 20 + (Math.random() - 0.5) * jitterAmount, // Centered horizontally with jitter
                            -y / 20 + fontSize / 20 + archOffset + (Math.random() - 0.5) * jitterAmount, // Centered vertically with arch and jitter
                            (Math.random() - 0.5) * jitterAmount // Z-axis jitter
                        );

                        // Initial random dispersed positions
                        initialPositions.push(
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10
                        );

                        // Assign a random phase offset for each particle's opacity
                        opacityOffsets.push(Math.random() * Math.PI * 2);
                    }
                }
            }

            setInitialPositions(initialPositions);
            setTargetPositions(particlePositions);
            setOpacityOffsets(opacityOffsets); // Store opacity offsets for twinkling
        });
    }, [text, fontSize, archIntensity, particleDensity, jitterAmount]);

    // Alternate between converging, holding text, and dispersing
    useEffect(() => {
        const interval = setInterval(() => {
            if (converging && !holdingText) {
                // After converging, start holding the text shape
                setHoldingText(true);
                setTimeout(() => {
                    setHoldingText(false); // End holding and start dispersing
                    setConverging(false);
                }, holdTextDuration * 1000); // Hold text for specified duration
            } else {
                // Start converging again
                setConverging(true);
                setOpacity(0);
            }
        }, cycleDelay * 1000 + holdTextDuration * 1000);

        return () => clearInterval(interval);
    }, [cycleDelay, holdTextDuration, converging, holdingText]);

    useEffect(() => {
        if (particlesRef.current && initialPositions.length > 0) {
            // Set particle initial positions
            particlesRef.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(initialPositions, 3)
            );
        }
    }, [initialPositions]);

    useFrame((state) => {
        if (
            !particlesRef.current || 
            !particlesRef.current.geometry || 
            !particlesRef.current.geometry.attributes.position
        ) {
            // Skip frame if geometry or position attributes are not yet initialized
            return;
        }

        const positionsArray = particlesRef.current.geometry.attributes.position.array;
        const elapsedTime = state.clock.getElapsedTime();

        // Update opacity based on twinkle effect
        if (particlesRef.current.material) {
            const newOpacities = opacityOffsets.map((offset) => {
                return opacity + (Math.sin(elapsedTime * twinkleSpeed + offset) * 0.5 + 0.5) * twinkleAmount;
            });
            particlesRef.current.material.opacity = newOpacities[0]; // Apply average opacity for all particles
        }

        if (converging) {
            // Converging phase: fade in and move particles towards target positions
            setOpacity(Math.min(1, opacity + 0.02));
            for (let i = 0; i < positionsArray.length; i += 3) {
                positionsArray[i] += (targetPositions[i] - positionsArray[i]) * convergenceSpeed; // X
                positionsArray[i + 1] += (targetPositions[i + 1] - positionsArray[i + 1]) * convergenceSpeed; // Y
                positionsArray[i + 2] += (targetPositions[i + 2] - positionsArray[i + 2]) * convergenceSpeed; // Z
            }
        } else if (!holdingText) {
            // Dispersing phase: fade out and move particles back to random positions
            setOpacity(Math.max(0, opacity - 0.02));
            for (let i = 0; i < positionsArray.length; i += 3) {
                positionsArray[i] += (initialPositions[i] - positionsArray[i]) * dispersionSpeed; // X
                positionsArray[i + 1] += (initialPositions[i + 1] - positionsArray[i + 1]) * dispersionSpeed; // Y
                positionsArray[i + 2] += (initialPositions[i + 2] - positionsArray[i + 2]) * dispersionSpeed; // Z
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry />
            <pointsMaterial size={0.05} color="white" transparent opacity={opacity} />
        </points>
    );
}

export default ParticleText;
