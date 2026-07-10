// Canvas Renderer - Handles all drawing operations

import { GameState, Unit, Statue } from '../types/game.types';
import { BaseUnit } from '../entities/BaseUnit';
import { StatueEntity } from '../entities/Statue';
import { ParticleEntity } from '../entities/Particle';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = width;
    this.height = height;
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(dpr, dpr);
  }

  clear(): void {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    const gridSize = 100;
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  drawUnit(unit: BaseUnit): void {
    const { x, y } = unit.position;
    const scale = unit.scale;
    const size = 20 * scale;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(unit.direction, 1);

    // Draw stick figure
    this.ctx.strokeStyle = unit.color;
    this.ctx.fillStyle = unit.color;
    this.ctx.lineWidth = 2 + scale;

    // Head
    this.ctx.beginPath();
    this.ctx.arc(0, -size, size * 0.6, 0, Math.PI * 2);
    this.ctx.stroke();

    // Body
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size * 0.4);
    this.ctx.lineTo(0, size * 0.4);
    this.ctx.stroke();

    // Arms
    const armOffset = size * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(-size * 0.8, 0);
    this.ctx.lineTo(size * 0.8, 0);
    this.ctx.stroke();

    // Legs
    this.ctx.beginPath();
    this.ctx.moveTo(-size * 0.3, size * 0.4);
    this.ctx.lineTo(-size * 0.6, size * 1.0);
    this.ctx.moveTo(size * 0.3, size * 0.4);
    this.ctx.lineTo(size * 0.6, size * 1.0);
    this.ctx.stroke();

    // Draw weapon indicator
    this.drawWeapon(unit.weaponType, size);

    // Draw health bar
    if (unit.health < unit.maxHealth) {
      this.drawHealthBar(0, -size - 15, size * 1.5, 4, unit.getHealthPercent());
    }

    // Draw selection indicator
    if (unit.isUnderControl) {
      this.ctx.strokeStyle = '#FFD700';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size * 1.3, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  private drawWeapon(weaponType: string, size: number): void {
    this.ctx.strokeStyle = '#888';
    this.ctx.fillStyle = '#666';
    this.ctx.lineWidth = 1.5;

    switch (weaponType) {
      case 'sword':
        // Sword
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.8, -size * 0.2);
        this.ctx.lineTo(size * 1.2, -size * 0.5);
        this.ctx.stroke();
        break;
      case 'bow':
        // Bow
        this.ctx.beginPath();
        this.ctx.arc(size * 0.9, 0, size * 0.3, 0, Math.PI * 2);
        this.ctx.stroke();
        break;
      case 'spear':
        // Spear and shield
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.8, -size * 0.2);
        this.ctx.lineTo(size * 1.0, -size * 0.6);
        this.ctx.stroke();
        // Shield
        this.ctx.beginPath();
        this.ctx.arc(-size * 0.6, 0, size * 0.4, 0, Math.PI * 2);
        this.ctx.stroke();
        break;
      case 'magic':
        // Magic staff
        this.ctx.beginPath();
        this.ctx.moveTo(size * 0.8, -size * 0.2);
        this.ctx.lineTo(size * 1.2, -size * 0.8);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(size * 1.2, -size * 0.8, size * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 'club':
        // Club
        this.ctx.fillRect(size * 0.8, -size * 0.4, size * 0.6, size * 1.0);
        break;
    }
  }

  drawStatue(statue: StatueEntity): void {
    const { x, y } = statue.position;
    const w = statue.width;
    const h = statue.height;
    const healthPercent = statue.getHealthPercent();

    this.ctx.save();
    this.ctx.translate(x, y);

    // Base
    this.ctx.fillStyle = statue.team === 0 ? '#4169E1' : '#DC143C';
    this.ctx.fillRect(-w / 2, -h / 2, w, h);

    // Outline
    this.ctx.strokeStyle = '#FFF';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(-w / 2, -h / 2, w, h);

    // Health bar
    this.drawHealthBar(-w / 2, -h / 2 - 20, w, 8, healthPercent);

    this.ctx.restore();
  }

  drawHealthBar(x: number, y: number, width: number, height: number, percent: number): void {
    // Background
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(x, y, width, height);

    // Health
    const healthColor = percent > 0.5 ? '#00FF00' : percent > 0.25 ? '#FFD700' : '#FF0000';
    this.ctx.fillStyle = healthColor;
    this.ctx.fillRect(x, y, width * percent, height);

    // Border
    this.ctx.strokeStyle = '#FFF';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x, y, width, height);
  }

  drawParticle(particle: ParticleEntity): void {
    const alpha = particle.getAlpha();
    const { x, y } = particle.position;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = particle.color;

    switch (particle.type) {
      case 'spark':
        this.ctx.beginPath();
        this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 'blood':
        this.ctx.fillRect(x - particle.size / 2, y - particle.size / 2, particle.size, particle.size);
        break;
      case 'dust':
        this.ctx.globalAlpha *= 0.6;
        this.ctx.beginPath();
        this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;
    }

    this.ctx.restore();
  }

  drawText(text: string, x: number, y: number, fontSize: number = 16, color: string = '#FFF'): void {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }

  drawLine(x1: number, y1: number, x2: number, y2: number, color: string = '#FFF', width: number = 1): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawRect(x: number, y: number, width: number, height: number, color: string, filled: boolean = true): void {
    if (filled) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.strokeRect(x, y, width, height);
    }
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.setupCanvas();
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
