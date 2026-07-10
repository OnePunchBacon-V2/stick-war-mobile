import React from 'react';
import styles from './UnitSelector.module.css';
import Button from './Button';

interface UnitSelectorProps {
  onUnitSelect: (unitType: string) => void;
  gold: number;
  disabled?: boolean;
}

const UNITS = [
  { type: 'swordwrath', name: 'Swordwrath', cost: 150, emoji: '⚔️' },
  { type: 'archidon', name: 'Archidon', cost: 300, emoji: '🏹' },
  { type: 'spearton', name: 'Spearton', cost: 500, emoji: '🛡️' },
  { type: 'magikill', name: 'Magikill', cost: 1200, emoji: '🔮' },
  { type: 'giant', name: 'Giant', cost: 1500, emoji: '👹' },
  { type: 'miner', name: 'Miner', cost: 150, emoji: '⛏️' },
];

const UnitSelector: React.FC<UnitSelectorProps> = ({ onUnitSelect, gold, disabled = false }) => {
  return (
    <div className={styles.unitSelector}>
      <h3>Spawn Units</h3>
      <div className={styles.unitGrid}>
        {UNITS.map((unit) => {
          const canAfford = gold >= unit.cost;
          return (
            <button
              key={unit.type}
              className={`${styles.unitButton} ${!canAfford ? styles.disabled : ''}`}
              onClick={() => onUnitSelect(unit.type)}
              disabled={!canAfford || disabled}
              title={`${unit.name} - ${unit.cost}g`}
            >
              <span className={styles.emoji}>{unit.emoji}</span>
              <span className={styles.name}>{unit.name}</span>
              <span className={styles.cost}>{unit.cost}g</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UnitSelector;
