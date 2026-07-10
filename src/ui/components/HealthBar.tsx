import React from 'react';
import styles from './HealthBar.module.css';

interface HealthBarProps {
  current: number;
  max: number;
  width?: number;
  height?: number;
  color?: string;
}

const HealthBar: React.FC<HealthBarProps> = ({
  current,
  max,
  width = 100,
  height = 8,
  color = '#00ff00',
}) => {
  const percent = (current / max) * 100;
  const displayColor =
    percent > 50 ? '#00FF00' : percent > 25 ? '#FFFF00' : '#FF0000';

  return (
    <div className={styles.healthBar} style={{ width, height }}>
      <div
        className={styles.fill}
        style={{
          width: `${percent}%`,
          backgroundColor: displayColor,
        }}
      />
    </div>
  );
};

export default HealthBar;
