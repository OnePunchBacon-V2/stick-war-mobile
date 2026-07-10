// Statue Entity (Base)

import { Statue, Vector2, Team } from '../types/game.types';
import { STATUE_STATS } from '../types/constants';

export class StatueEntity implements Statue {
  id: string;
  team: Team;
  position: Vector2;
  health: number;
  maxHealth: number;
  width: number;
  height: number;
  regenerationRate: number;
  private lastRegenTime: number = Date.now();

  constructor(team: Team, position: Vector2) {
    this.id = `statue-${team}-${Date.now()}`;
    this.team = team;
    this.position = { ...position };
    this.health = STATUE_STATS.INITIAL_HEALTH;
    this.maxHealth = STATUE_STATS.MAX_HEALTH;
    this.width = STATUE_STATS.WIDTH;
    this.height = STATUE_STATS.HEIGHT;
    this.regenerationRate = STATUE_STATS.REGEN_RATE;
  }

  update(deltaTime: number): void {
    // Passive regeneration
    const now = Date.now();
    if (now - this.lastRegenTime >= 1000) {
      this.heal(this.regenerationRate);
      this.lastRegenTime = now;
    }
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  getHealthPercent(): number {
    return this.health / this.maxHealth;
  }

  isDestroyed(): boolean {
    return this.health <= 0;
  }

  // Upgrade methods
  upgradeHealth(amount: number): void {
    this.maxHealth = Math.min(
      STATUE_STATS.MAX_HEALTH * 2,
      this.maxHealth + amount
    );
    this.health = this.maxHealth;
  }

  upgradeRegeneration(amount: number): void {
    this.regenerationRate += amount;
  }
}
