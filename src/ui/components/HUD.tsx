import React from 'react';
import styles from './HUD.module.css';

interface HUDProps {
  playerGold: number;
  playerStatueHealth: number;
  playerStatueMaxHealth: number;
  enemyStatueHealth: number;
  enemyStatueMaxHealth: number;
  playerMana: number;
  maxMana: number;
  frameCount: number;
  fps: number;
}

const HUD: React.FC<HUDProps> = ({
  playerGold,
  playerStatueHealth,
  playerStatueMaxHealth,
  enemyStatueHealth,
  enemyStatueMaxHealth,
  playerMana,
  maxMana,
  frameCount,
  fps,
}) => {
  const playerHealthPercent = (playerStatueHealth / playerStatueMaxHealth) * 100;
  const enemyHealthPercent = (enemyStatueHealth / enemyStatueMaxHealth) * 100;
  const manaPercent = (playerMana / maxMana) * 100;

  return (
    <div className={styles.hud}>
      {/* Top Left - Player Stats */}
      <div className={styles.statBlock}>
        <h3>Your Statue</h3>
        <div className={styles.statRow}>
          <span>❤️ Health:</span>
          <span>{Math.round(playerStatueHealth)}/{playerStatueMaxHealth}</span>
        </div>
        <div className={styles.healthBar}>
          <div
            className={styles.healthFill}
            style={{
              width: `${playerHealthPercent}%`,
              backgroundColor: playerHealthPercent > 50 ? '#00ff00' : playerHealthPercent > 25 ? '#ffff00' : '#ff0000',
            }}
          />
        </div>
      </div>

      {/* Top Center - Gold */}
      <div className={styles.goldDisplay}>
        <span>💰</span>
        <span className={styles.goldAmount}>{playerGold}</span>
      </div>

      {/* Top Right - Enemy Stats */}
      <div className={styles.statBlock}>
        <h3>Enemy Statue</h3>
        <div className={styles.statRow}>
          <span>❤️ Health:</span>
          <span>{Math.round(enemyStatueHealth)}/{enemyStatueMaxHealth}</span>
        </div>
        <div className={styles.healthBar}>
          <div
            className={styles.healthFill}
            style={{
              width: `${enemyHealthPercent}%`,
              backgroundColor: enemyHealthPercent > 50 ? '#00ff00' : enemyHealthPercent > 25 ? '#ffff00' : '#ff0000',
            }}
          />
        </div>
      </div>

      {/* Bottom Center - Mana */}
      <div className={styles.manaDisplay}>
        <span>✨ Mana</span>
        <div className={styles.manaBar}>
          <div className={styles.manaFill} style={{ width: `${manaPercent}%` }} />
        </div>
        <span>{Math.round(playerMana)}/{maxMana}</span>
      </div>

      {/* Debug - FPS Counter */}
      <div className={styles.debugInfo}>
        <span>{fps.toFixed(0)} FPS</span>
      </div>
    </div>
  );
};

export default HUD;
