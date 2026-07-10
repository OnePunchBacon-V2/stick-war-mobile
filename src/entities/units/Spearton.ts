// Spearton Unit (Tank)

import { BaseUnit } from '../BaseUnit';
import { Team, Vector2 } from '../../types/game.types';
import { UNIT_STATS } from '../../types/constants';

export class Spearton extends BaseUnit {
  private shieldActive = false;
  private shieldCooldown = 3000; // 3 seconds
  private lastShieldTime = 0;

  constructor(team: Team, position: Vector2, statueId: string) {
    super('spearton', team, position, UNIT_STATS.SPEARTON, statueId);
  }

  protected performAttack(target: any): void {
    // Spearton has powerful but slower attacks
    const damage = this.damage * 1.1; // Slightly higher base damage
    target.takeDamage(damage);

    // Knockback effect
    if (target.velocity) {
      const knockbackForce = 2;
      const direction = Math.sign(target.position.x - this.position.x);
      target.velocity.x = knockbackForce * direction;
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

    if (distToTarget > this.range * 1.5) {
      this.state = 'moving';
      this.animation = this.animations.walk;
      return;
    }

    this.velocity = { x: 0, y: 0 };

    // Shield ability - chance to block
    if (Math.random() < 0.3 && Date.now() - this.lastShieldTime > this.shieldCooldown) {
      this.activateShield();
    }

    this.animation = this.animations.attack;

    // Attack logic
    const now = Date.now();
    const cooldown = 1000 / this.attackSpeed;
    if (now - this.lastAttackTime >= cooldown) {
      this.performAttack(target);
      this.lastAttackTime = now;
    }
  }

  private activateShield(): void {
    this.shieldActive = true;
    this.lastShieldTime = Date.now();

    // Reduce incoming damage while shielded
    setTimeout(() => {
      this.shieldActive = false;
    }, 1000);
  }

  takeDamage(amount: number): void {
    // Shield reduces damage
    const finalDamage = this.shieldActive ? amount * 0.5 : amount;
    super.takeDamage(finalDamage);
  }

  isShielded(): boolean {
    return this.shieldActive;
  }
}
