// Magikill Unit (Mage)

import { BaseUnit } from '../BaseUnit';
import { Team, Vector2 } from '../../types/game.types';
import { UNIT_STATS } from '../../types/constants';

export class Magikill extends BaseUnit {
  private minionIds: string[] = [];
  private maxMinions = 2;
  private summonCooldown = 5000; // 5 seconds
  private lastSummonTime = 0;

  constructor(team: Team, position: Vector2, statueId: string) {
    super('magikill', team, position, UNIT_STATS.MAGIKILL, statueId);
  }

  protected performAttack(target: any): void {
    // Magikill fires magic bolts
    const damage = this.damage * 0.8;
    target.takeDamage(damage);

    // Stun effect (reduces attack speed temporarily)
    if (target.stunned !== undefined) {
      target.stunned = true;
      setTimeout(() => {
        target.stunned = false;
      }, 1500);
    }
  }

  protected updateAttacking(allUnits: any[]): void {
    const target = allUnits.find((u) => u.id === this.targetId);

    if (!target || target.health <= 0) {
      this.targetId = null;
      this.state = 'idle';
      this.animation = this.animations.idle;
      return;
    }

    const distToTarget = Math.sqrt(
      (target.position.x - this.position.x) ** 2 +
        (target.position.y - this.position.y) ** 2
    );

    if (distToTarget > this.range * 2) {
      this.state = 'moving';
      this.animation = this.animations.walk;
      return;
    }

    this.velocity = { x: 0, y: 0 };
    this.animation = this.animations.attack;

    // Try to summon minions
    if (
      this.minionIds.length < this.maxMinions &&
      Date.now() - this.lastSummonTime > this.summonCooldown
    ) {
      this.summonMinions();
    }

    // Attack logic
    const now = Date.now();
    const cooldown = 1000 / this.attackSpeed;
    if (now - this.lastAttackTime >= cooldown) {
      this.performAttack(target);
      this.lastAttackTime = now;
    }
  }

  private summonMinions(): void {
    this.lastSummonTime = Date.now();
    this.state = 'special';
    this.animation = this.animations.special;
    // Minion spawning will be handled by the game engine
  }

  getSummonInfo(): { canSummon: boolean; minionCount: number } {
    return {
      canSummon:
        this.minionIds.length < this.maxMinions &&
        Date.now() - this.lastSummonTime > this.summonCooldown,
      minionCount: this.minionIds.length,
    };
  }

  addMinion(minionId: string): void {
    if (this.minionIds.length < this.maxMinions) {
      this.minionIds.push(minionId);
    }
  }

  removeMinion(minionId: string): void {
    this.minionIds = this.minionIds.filter((id) => id !== minionId);
  }

  getMinions(): string[] {
    return [...this.minionIds];
  }
}
