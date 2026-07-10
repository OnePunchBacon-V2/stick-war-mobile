import { GameState } from '../types/game.types';

export interface CampaignLevel {
  id: string;
  name: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'insane';
  enemyTribe: string;
  reward: number;
  completed: boolean;
}

export class LevelManager {
  private levels: CampaignLevel[] = [
    {
      id: 'level-1',
      name: 'Order Strikes',
      difficulty: 'easy',
      enemyTribe: 'Order',
      reward: 100,
      completed: false,
    },
    {
      id: 'level-2',
      name: 'Chaos Rising',
      difficulty: 'normal',
      enemyTribe: 'Chaos',
      reward: 200,
      completed: false,
    },
  ];

  private currentLevelIndex: number = 0;

  getCurrentLevel(): CampaignLevel {
    return this.levels[this.currentLevelIndex];
  }

  nextLevel(): boolean {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      return true;
    }
    return false;
  }

  completeLevel(): void {
    this.levels[this.currentLevelIndex].completed = true;
  }

  getAllLevels(): CampaignLevel[] {
    return [...this.levels];
  }

  update(gameState: GameState): void {
    // Level logic updates
  }
}
