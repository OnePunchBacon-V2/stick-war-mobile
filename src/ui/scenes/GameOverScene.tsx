import React from 'react';
import styles from './GameOverScene.module.css';
import Button from '../components/Button';

interface GameOverSceneProps {
  won: boolean;
  score: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

const GameOverScene: React.FC<GameOverSceneProps> = ({ won, score, onRestart, onMainMenu }) => {
  return (
    <div className={styles.gameOverScene}>
      <div className={styles.container}>
        <h1 className={won ? styles.victory : styles.defeat}>
          {won ? '🎉 VICTORY! 🎉' : '💀 DEFEAT 💀'}
        </h1>

        <div className={styles.scoreCard}>
          <h2>Final Score</h2>
          <p className={styles.score}>{score}</p>
        </div>

        <div className={styles.buttons}>
          <Button text="Play Again" onClick={onRestart} size="large" color="#4CAF50" />
          <Button text="Main Menu" onClick={onMainMenu} size="large" color="#2196F3" />
        </div>
      </div>
    </div>
  );
};

export default GameOverScene;
