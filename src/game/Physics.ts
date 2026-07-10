// Physics System - Collision detection and resolution

import { BaseUnit } from '../entities/BaseUnit';
import { Vector, Collision } from '../utils/math';

export class PhysicsSystem {
  private unitCollisionRadius = 25;

  update(units: BaseUnit[], statues: any[]): void {
    // Unit to unit collisions
    this.checkUnitCollisions(units);

    // Unit to statue collisions
    this.checkStatueCollisions(units, statues);

    // Boundary checking
    this.checkBoundaries(units);
  }

  private checkUnitCollisions(units: BaseUnit[]): void {
    for (let i = 0; i < units.length; i++) {
      for (let j = i + 1; j < units.length; j++) {
        const u1 = units[i];
        const u2 = units[j];

        if (u1.health <= 0 || u2.health <= 0) continue;

        const dist = Vector.distance(u1.position, u2.position);
        const minDist = this.unitCollisionRadius * 2;

        if (dist < minDist) {
          this.resolveUnitCollision(u1, u2);
        }
      }
    }
  }

  private resolveUnitCollision(u1: BaseUnit, u2: BaseUnit): void {
    // Push units apart
    const diff = Vector.subtract(u2.position, u1.position);
    const dist = Vector.length(diff);

    if (dist === 0) return;

    const normal = Vector.normalize(diff);
    const overlap = this.unitCollisionRadius * 2 - dist;
    const separation = Vector.multiply(normal, overlap / 2 + 1);

    u1.position = Vector.subtract(u1.position, separation);
    u2.position = Vector.add(u2.position, separation);
  }

  private checkStatueCollisions(units: BaseUnit[], statues: any[]): void {
    for (const unit of units) {
      if (unit.health <= 0) continue;

      for (const statue of statues) {
        const collision = Collision.circleToRect(
          unit.position,
          this.unitCollisionRadius,
          statue.position.x - statue.width / 2,
          statue.position.y - statue.height / 2,
          statue.width,
          statue.height
        );

        if (collision && unit.team !== statue.team) {
          // Push unit away from statue
          const diff = Vector.subtract(unit.position, statue.position);
          const normal = Vector.normalize(diff);
          unit.position = Vector.add(
            statue.position,
            Vector.multiply(normal, statue.width + this.unitCollisionRadius)
          );
        }
      }
    }
  }

  private checkBoundaries(units: BaseUnit[]): void {
    const BOUNDARY_BUFFER = 50;

    for (const unit of units) {
      // Left boundary
      if (unit.position.x < BOUNDARY_BUFFER) {
        unit.position.x = BOUNDARY_BUFFER;
      }
      // Right boundary (assuming 1920 width)
      if (unit.position.x > 1920 - BOUNDARY_BUFFER) {
        unit.position.x = 1920 - BOUNDARY_BUFFER;
      }
      // Top boundary
      if (unit.position.y < BOUNDARY_BUFFER) {
        unit.position.y = BOUNDARY_BUFFER;
      }
      // Bottom boundary (assuming 1080 height)
      if (unit.position.y > 1080 - BOUNDARY_BUFFER) {
        unit.position.y = 1080 - BOUNDARY_BUFFER;
      }
    }
  }
}
