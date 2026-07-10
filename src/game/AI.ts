import { BaseUnit } from '../entities/BaseUnit';
import { Vector2, Team } from '../types/game.types';
import { Vector } from '../utils/math';

export class AISystem {
  private updateFrequency: number = 1000; // ms
  private lastUpdateTime: number = 0;

  update(units: BaseUnit[], deltaTime: number): void {
    const now = Date.now();
    if (now - this.lastUpdateTime < this.updateFrequency) return;

    this.lastUpdateTime = now;

    // Update enemy AI
    for (const unit of units) {
      if (unit.team === 1 && unit.health > 0) {
        this.updateEnemyUnit(unit, units);
      }
    }
  }

  private updateEnemyUnit(unit: BaseUnit, allUnits: BaseUnit[]): void {
    // Find nearest enemy
    let nearestEnemy: BaseUnit | null = null;
    let nearestDist = Infinity;

    for (const other of allUnits) {
      if (other.team !== unit.team && other.health > 0) {
        const dist = Vector.distance(unit.position, other.position);
        if (dist < nearestDist) {
          nearestEnemy = other;
          nearestDist = dist;
        }
      }
    }

    if (nearestEnemy) {
      unit.targetId = nearestEnemy.id;
    }
  }
}
