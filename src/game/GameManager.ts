import { GameState, Team, UnitType } from '../types/game.types';
import { GAME_BALANCE } from '../types/constants';
import { UnitSpawner } from './UnitSpawner';
import { LevelManager } from './LevelManager';

export class GameManager {
  private gameState: GameState;
  private unitSpawner: UnitSpawner;
  private levelManager: LevelManager;
  private goldTickInterval: number | null = null;
  private lastGoldTick: number = 0;

  constructor(gameState: GameState, unitSpawner: UnitSpawner, levelManager: LevelManager) {
    this.gameState = gameState;
    this.unitSpawner = unitSpawner;
    this.levelManager = levelManager;
  }

  update(deltaTime: number): void {
    // Gold trickle (passive income from miners)
    const now = Date.now();
    if (now - this.lastGoldTick >= GAME_BALANCE.GOLD_TRICKLE_INTERVAL) {
      this.gameState.playerGold += GAME_BALANCE.GOLD_TRICKLE;
      this.gameState.enemyGold += GAME_BALANCE.GOLD_TRICKLE;
      this.lastGoldTick = now;
    }

    // Check level progression
    this.levelManager.update(this.gameState);
  }

  spawnUnit(type: UnitType, team: Team): boolean {
    return this.unitSpawner.spawnUnit(type, team, this.gameState);
  }

  addGold(team: Team, amount: number): void {
    if (team === 0) {
      this.gameState.playerGold += amount;
    } else {
      this.gameState.enemyGold += amount;
    }
  }

  subtractGold(team: Team, amount: number): void {
    if (team === 0) {
      this.gameState.playerGold = Math.max(0, this.gameState.playerGold - amount);
    } else {
      this.gameState.enemyGold = Math.max(0, this.gameState.enemyGold - amount);
    }
  }

  canAfford(team: Team, cost: number): boolean {
    const gold = team === 0 ? this.gameState.playerGold : this.gameState.enemyGold;
    return gold >= cost;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  destroy(): void {
    if (this.goldTickInterval) {
      clearInterval(this.goldTickInterval);
    }
  }
}
