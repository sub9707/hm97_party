import React, { useState, useRef } from "react";
import styles from "./page.module.scss";

const DEFAULT_TEXT_ZERO = "X";
const BASE_ROTATE_DEG = 7200;
const loopAnimationOptions = {
  fill: "forwards",
  duration: 7000,
  easing: "ease-in-out",
};

function RulletPage() {
  const [participants, setParticipants] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [rouletteData, setRouletteData] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const rouletteRef = useRef(null);

  const handleAddParticipant = () => {
    if (nameInput.trim()) {
      setParticipants([...participants, nameInput]);
      setNameInput("");
    }
  };

  const handleStartGame = () => {
    // Set the roulette data to display participants or fallback to `DEFAULT_TEXT_ZERO`
    const data = Array(8).fill(DEFAULT_TEXT_ZERO);
    participants.forEach((name, index) => {
      data[index] = name;
    });
    setRouletteData(data);
    setIsGameStarted(true);
  };

  const handleSpin = () => {
    const selectedIdx = Math.floor(Math.random() * 8);
    const additionalDeg = 22.5 * (2 * (1 - selectedIdx) + 1);
    const totalDeg = BASE_ROTATE_DEG + additionalDeg;
    const loopAnimation = [
      { transform: "rotate(0deg)" },
      { transform: `rotate(${totalDeg}deg)` },
    ];

    rouletteRef.current.animate(loopAnimation, loopAnimationOptions);
  };

  return (
    <div className={styles.container}>
      {!isGameStarted ? (
        <>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter participant name"
            className={styles.input}
          />
          <button onClick={handleAddParticipant} className={styles.addButton}>
            Add Participant
          </button>
          <button onClick={handleStartGame} className={styles.startButton}>
            Start Game!
          </button>
          <div className={styles.participants}>
            {participants.length > 0 && (
              <p>Participants: {participants.join(", ")}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.arrow}></div>
          <div className={styles.roulette} ref={rouletteRef}>
            {rouletteData.map((value, index) => (
              <div
                key={index}
                className={`${styles.fill} ${styles[`fill_${index + 1}`]}`}
              >
                <div className={styles.content}>
                  {value || DEFAULT_TEXT_ZERO}
                </div>
              </div>
            ))}
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`${styles.line} ${styles[`line_${index + 1}`]}`}
              ></div>
            ))}
          </div>
          <button className={styles.trigger} onClick={handleSpin}>
            Spin
          </button>
        </>
      )}
    </div>
  );
}

export default RulletPage;
