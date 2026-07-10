import React from 'react';
import styles from './UpgradePanel.module.css';
import Button from './Button';

interface UpgradePanelProps {
  upgrades: {
    unitDamage: number;
    unitHealth: number;
    statueHealth: number;
    miningSpeed: number;
  };
  gold: number;
  onUpgrade: (upgradeType: string) => void;
  onClose: () => void;
}

const UpgradePanel: React.FC<UpgradePanelProps> = ({
  upgrades,
  gold,
  onUpgrade,
  onClose,
}) => {
  const upgradeCosts: { [key: string]: number } = {
    unitDamage: 200,
    unitHealth: 200,
    statueHealth: 300,
    miningSpeed: 150,
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2>Upgrades</h2>
        <div className={styles.upgradeList}>
          {Object.entries(upgrades).map(([key, level]) => (
            <div key={key} className={styles.upgradeItem}>
              <div className={styles.info}>
                <span className={styles.name}>{key}</span>
                <span className={styles.level}>Level {level}</span>
              </div>
              <Button
                text={`${upgradeCosts[key]}g`}
                onClick={() => onUpgrade(key)}
                disabled={gold < upgradeCosts[key]}
                size="small"
              />
            </div>
          ))}
        </div>
        <Button text="Close" onClick={onClose} size="large" color="#E74C3C" />
      </div>
    </div>
  );
};

export default UpgradePanel;
