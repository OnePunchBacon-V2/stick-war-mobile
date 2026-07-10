import React from 'react';
import styles from './MainMenu.module.css';
import Button from '../components/Button';

interface MainMenuProps {
  onStartGame: () => void;
  onSettings?: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onSettings }) => {
  return (
    <div className={styles.mainMenu}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>STICK WAR</h1>
          <h2>LEGACY MOBILE</h2>
        </div>

        <div className={styles.menu}>
          <Button text="Start Game" onClick={onStartGame} size="large" color="#4CAF50" />
          {onSettings && (
            <Button text="Settings" onClick={onSettings} size="large" color="#2196F3" />
          )}
        </div>

        <div className={styles.credits}>
          <p>A mobile recreation of Stick War Legacy</p>
          <p>Built with React + TypeScript + Canvas</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
