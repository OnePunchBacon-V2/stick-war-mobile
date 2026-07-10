// Particle Entity (Visual Effects)

import { Particle } from '../types/game.types';

export class ParticleEntity implements Particle {
  id: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  lifetime: number = 0;
  maxLifetime: number;
  color: string;
  size: number;
  type: 'spark' | 'blood' | 'dust';

  constructor(
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    color: string,
    size: number,
    type: 'spark' | 'blood' | 'dust',
    maxLifetime: number = 500
  ) {
    this.id = `particle-${Date.now()}-${Math.random()}`;
    this.position = { ...position };
    this.velocity = { ...velocity };
    this.color = color;
    this.size = size;
    this.type = type;
    this.maxLifetime = maxLifetime;
  }

  update(deltaTime: number): void {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Apply gravity and friction
    this.velocity.y += 0.2 * deltaTime; // Gravity
    this.velocity.x *= 0.98; // Friction
    this.velocity.y *= 0.98;

    this.lifetime += deltaTime * 1000;
  }

  isAlive(): boolean {
    return this.lifetime < this.maxLifetime;
  }

  getAlpha(): number {
    // Fade out as lifetime increases
    return 1 - this.lifetime / this.maxLifetime;
  }
}
