// Projectile Entity

import { Projectile, Team, Vector2 } from '../types/game.types';

export class ProjectileEntity implements Projectile {
  id: string;
  type: 'arrow' | 'spell' | 'projectile';
  position: Vector2;
  velocity: Vector2;
  damage: number;
  team: Team;
  targetId: string | null;
  lifetime: number = 0;
  maxLifetime: number;
  sourceUnitId: string;

  constructor(
    type: projectile['type'],
    position: Vector2,
    velocity: Vector2,
    damage: number,
    team: Team,
    sourceUnitId: string,
    targetId?: string,
    maxLifetime: number = 5000
  ) {
    this.id = `projectile-${Date.now()}-${Math.random()}`;
    this.type = type;
    this.position = { ...position };
    this.velocity = { ...velocity };
    this.damage = damage;
    this.team = team;
    this.sourceUnitId = sourceUnitId;
    this.targetId = targetId || null;
    this.maxLifetime = maxLifetime;
  }

  update(deltaTime: number): void {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.lifetime += deltaTime * 1000;
  }

  isAlive(): boolean {
    return this.lifetime < this.maxLifetime;
  }

  getProgress(): number {
    return this.lifetime / this.maxLifetime;
  }
}
