// Miner Unit (Economy)

import { BaseUnit } from '../BaseUnit';
import { Team, Vector2 } from '../../types/game.types';
import { UNIT_STATS } from '../../types/constants';

export class Miner extends BaseUnit {
  private goldGenerated = 0;
  private isMining = false;
  private miningCooldown = 2000; // 2 seconds
  private lastMineTime = 0;
  private goldPerMine = 5;

  constructor(team: Team, position: Vector2, statueId: string) {
    super('miner', team, position, UNIT_STATS.MINER, statueId);
  }

  protected updateIdle(allUnits: any[]): void {
    this.velocity = { x: 0, y: 0 };
    this.animation = this.animations.idle;

    // Miners prioritize mining over fighting
    // But will defend if attacked
    const nearbyEnemy = this.findNearestEnemy(allUnits);
    if (nearbyEnemy) {
      const dist = Math.sqrt(
        (nearbyEnemy.position.x - this.position.x) ** 2 +
          (nearbyEnemy.position.y - this.position.y) ** 2
      );
      if (dist < this.range * 2) {
        this.targetId = nearbyEnemy.id;
        this.state = 'moving';
        return;
      }
    }

    // Mine gold
    if (Date.now() - this.lastMineTime > this.miningCooldown) {
      this.mine();
    }
  }

  protected performAttack(target: any): void {
    // Miners have very weak attacks
    const damage = this.damage * 1.2; // Only slightly more than normal
    target.takeDamage(damage);
  }

  private mine(): void {
    this.isMining = true;
    this.goldGenerated += this.goldPerMine;
    this.lastMineTime = Date.now();
    this.animation = this.animations.special;

    setTimeout(() => {
      this.isMining = false;
    }, 500);
  }

  getGoldGenerated(): number {
    const gold = this.goldGenerated;
    this.goldGenerated = 0;
    return gold;
  }

  isMiningNow(): boolean {
    return this.isMining;
  }

  // Miners are slow and weak
  takeDamage(amount: number): void {
    super.takeDamage(amount * 1.2); // Takes more damage
  }
}
