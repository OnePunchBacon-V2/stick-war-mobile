// Archidon Unit (Archer)

import { BaseUnit } from '../BaseUnit';
import { Team, Vector2 } from '../../types/game.types';
import { UNIT_STATS } from '../../types/constants';

export class Archidon extends BaseUnit {
  private projectiles: any[] = [];

  constructor(team: Team, position: Vector2, statueId: string) {
    super('archidon', team, position, UNIT_STATS.ARCHIDON, statueId);
  }

  protected performAttack(target: any): void {
    // Archidon fires arrows (projectiles)
    // This will integrate with the projectile system
    const damage = this.damage * 0.9; // Slightly reduced per hit
    target.takeDamage(damage);
  }

  // Override for ranged behavior
  protected updateMoving(allUnits: any[]): void {
    const target = allUnits.find((u) => u.id === this.targetId);

    if (!target || target.health <= 0) {
      this.targetId = null;
      this.state = 'idle';
      this.velocity = { x: 0, y: 0 };
      return;
    }

    const distToTarget = Math.sqrt(
      (target.position.x - this.position.x) ** 2 +
        (target.position.y - this.position.y) ** 2
    );

    // Archidon maintains distance while attacking
    if (distToTarget < this.range) {
      this.state = 'attacking';
      this.velocity = { x: 0, y: 0 };
    } else if (distToTarget < this.range * 2) {
      // Stay at distance
      this.state = 'attacking';
    } else {
      // Move closer but stay back
      const direction = Math.sign(target.position.x - this.position.x);
      this.velocity.x = this.moveSpeed * direction;
      this.direction = direction > 0 ? 1 : -1;
      this.animation = this.animations.walk;
    }
  }
}
