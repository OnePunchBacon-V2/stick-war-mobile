import { ParticleEntity } from '../entities/Particle';
import { GameState, Vector2 } from '../types/game.types';

export class ParticleSystem {
  createParticle(
    position: Vector2,
    type: 'spark' | 'blood' | 'dust',
    color: string = '#FF0000',
    velocity?: Vector2,
    lifetime: number = 500
  ): ParticleEntity {
    const vel = velocity || {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    };

    const size = Math.random() * 4 + 2;
    const particle = new ParticleEntity(position, vel, color, size, type, lifetime);
    return particle;
  }

  createExplosion(
    position: Vector2,
    color: string = '#FF6B00',
    particleCount: number = 8
  ): ParticleEntity[] {
    const particles: ParticleEntity[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 150 + Math.random() * 100;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };

      particles.push(this.createParticle(position, 'spark', color, velocity, 800));
    }

    return particles;
  }

  update(gameState: GameState, deltaTime: number): void {
    const deadParticles: string[] = [];

    for (const [id, particle] of gameState.particles) {
      particle.update(deltaTime);
      if (!particle.isAlive()) {
        deadParticles.push(id);
      }
    }

    deadParticles.forEach((id) => gameState.particles.delete(id));
  }
}
