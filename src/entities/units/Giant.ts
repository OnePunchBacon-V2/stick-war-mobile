// Giant Unit (Ultra Tank)

import { BaseUnit } from '../BaseUnit';
import { Team, Vector2 } from '../../types/game.types';
import { UNIT_STATS } from '../../types/constants';

export class Giant extends BaseUnit {
  private stomping = false;

  constructor(team: Team, position: Vector2, statueId: string) {
    super('giant', team, position, UNIT_STATS.GIANT, statueId);
  }

  protected performAttack(allUnits: any[]): void {
    // Giant performs AoE stomp attack
    this.stomping = true;
    const stompRadius = this.range * 2;

    for (const unit of allUnits) {
      if (unit.team !== this.team && unit.health > 0) {
        const dist = Math.sqrt(
          (unit.position.x - this.position.x) ** 2 +
            (unit.position.y - this.position.y) ** 2
        );

        if (dist < stompRadius) {
          const damage = this.damage * 0.9;
          unit.takeDamage(damage);

          // Knockback effect from stomp
          if (unit.velocity) {
            const knockbackForce = 3;
            const direction = Math.sign(unit.position.x - this.position.x);
            unit.velocity.x = knockbackForce * direction;
          }
        }
      }
    }

    setTimeout(() => {
      this.stomping = false;
    }, 500);
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

    // Attack logic
    const now = Date.now();
    const cooldown = 1000 / this.attackSpeed;
    if (now - this.lastAttackTime >= cooldown) {
      this.performAttack(allUnits);
      this.lastAttackTime = now;
    }
  }

  isStomp(): boolean {
    return this.stomping;
  }

  // Giant is immune to knockback
  takeDamage(amount: number): void {
    super.takeDamage(amount * 0.9); // 10% damage reduction
  }
}
