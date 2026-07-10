import React, { useState } from 'react';
import styles from './CampaignSelectScene.module.css';
import Button from '../components/Button';
import { CampaignLevel } from '../../game/LevelManager';

interface CampaignSelectSceneProps {
  levels: CampaignLevel[];
  onSelectLevel: (levelId: string) => void;
  onBack: () => void;
}

const CampaignSelectScene: React.FC<CampaignSelectSceneProps> = ({
  levels,
  onSelectLevel,
  onBack,
}) => {
  return (
    <div className={styles.campaignSelect}>
      <h1>Campaign</h1>
      <div className={styles.levelGrid}>
        {levels.map((level) => (
          <div key={level.id} className={styles.levelCard}>
            <h3>{level.name}</h3>
            <p>Difficulty: {level.difficulty.toUpperCase()}</p>
            <p>Tribe: {level.enemyTribe}</p>
            <p>Reward: {level.reward}g</p>
            <Button
              text={level.completed ? 'Replay' : 'Start'}
              onClick={() => onSelectLevel(level.id)}
              size="medium"
            />
          </div>
        ))}
      </div>
      <Button text="Back" onClick={onBack} size="large" color="#E74C3C" />
    </div>
  );
};

export default CampaignSelectScene;
