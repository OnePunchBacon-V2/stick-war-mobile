import React from 'react';
import styles from './PauseMenu.module.css';
import Button from './Button';

interface PauseMenuProps {
  onResume: () => void;
  onMainMenu: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onMainMenu }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <h1>PAUSED</h1>
        <div className={styles.buttons}>
          <Button text="Resume Game" onClick={onResume} size="large" />
          <Button text="Main Menu" onClick={onMainMenu} size="large" color="#E74C3C" />
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
