// Base Unit Class

import { Unit, UnitState, Team, Vector2, UnitType } from '../types/game.types';
import { Vector, MathUtils } from '../utils/math';
import { Animation, AnimationLibrary } from '../utils/animation';
import { v4 as uuidv4 } from 'crypto';

export class BaseUnit implements Unit {
  id: string;
  type: UnitType;
  team: Team;
  position: Vector2;
  velocity: Vector2 = { x: 0, y: 0 };
  health: number;
  maxHealth: number;
  state: UnitState = 'idle';
  damage: number;
  attackSpeed: number;
  moveSpeed: number;
  range: number;
  scale: number;
  color: string;
  weaponType: any;
  targetId: string | null = null;
  animationFrame: number = 0;
  animationTime: number = 0;
  lastAttackTime: number = 0;
  direction: number = 1; // -1 (left) or 1 (right)
  isUnderControl: boolean = false;
  statueId: string;

  protected animation: Animation | null = null;
  protected animations: { [key: string]: Animation } = {};

  constructor(
    type: UnitType,
    team: Team,
    position: Vector2,
    stats: any,
    statueId: string
  ) {
    this.id = `${type}-${team}-${Date.now()}-${Math.random()}`;
    this.type = type;
    this.team = team;
    this.position = { ...position };
    this.health = stats.health;
    this.maxHealth = stats.maxHealth;
    this.damage = stats.damage;
    this.attackSpeed = stats.attackSpeed;
    this.moveSpeed = stats.moveSpeed;
    this.range = stats.range;
    this.scale = stats.scale;
    this.color = stats.color;
    this.weaponType = stats.weaponType;
    this.statueId = statueId;

    // Initialize animations
    this.initializeAnimations();
  }

  protected initializeAnimations(): void {
    this.animations.idle = new Animation(AnimationLibrary.IDLE);
    this.animations.walk = new Animation(AnimationLibrary.WALK);
    this.animations.attack = new Animation(AnimationLibrary.ATTACK);
    this.animations.die = new Animation(AnimationLibrary.DIE);
    this.animations.special = new Animation(AnimationLibrary.SPECIAL);
    this.animation = this.animations.idle;
  }

  update(deltaTime: number, allUnits: BaseUnit[]): void {
    if (this.health <= 0) {
      this.state = 'dead';
      this.animation = this.animations.die;
      return;
    }

    // Update animation
    if (this.animation) {
      this.animation.update(deltaTime);
    }

    // Update position based on velocity
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // State machine
    switch (this.state) {
      case 'idle':
        this.updateIdle(allUnits);
        break;
      case 'moving':
        this.updateMoving(allUnits);
        break;
      case 'attacking':
        this.updateAttacking(allUnits);
        break;
      case 'special':
        this.updateSpecial(allUnits);
        break;
    }
  }

  protected updateIdle(allUnits: BaseUnit[]): void {
    this.velocity = { x: 0, y: 0 };
    this.animation = this.animations.idle;

    // Find nearest enemy
    const target = this.findNearestEnemy(allUnits);
    if (target) {
      this.targetId = target.id;
      this.state = 'moving';
    }
  }

  protected updateMoving(allUnits: BaseUnit[]): void {
    const target = allUnits.find((u) => u.id === this.targetId);

    if (!target || target.health <= 0) {
      this.targetId = null;
      this.state = 'idle';
      this.velocity = { x: 0, y: 0 };
      return;
    }

    const distToTarget = Vector.distance(this.position, target.position);

    if (distToTarget < this.range) {
      this.state = 'attacking';
      this.velocity = { x: 0, y: 0 };
    } else {
      // Move towards target
      const direction = Vector.normalize(Vector.subtract(target.position, this.position));
      this.velocity = Vector.multiply(direction, this.moveSpeed);
      this.direction = direction.x > 0 ? 1 : -1;
      this.animation = this.animations.walk;
    }
  }

  protected updateAttacking(allUnits: BaseUnit[]): void {
    const target = allUnits.find((u) => u.id === this.targetId);

    if (!target || target.health <= 0) {
      this.targetId = null;
      this.state = 'idle';
      this.animation = this.animations.idle;
      return;
    }

    const distToTarget = Vector.distance(this.position, target.position);

    if (distToTarget > this.range * 1.5) {
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
      this.performAttack(target);
      this.lastAttackTime = now;
    }
  }

  protected updateSpecial(allUnits: BaseUnit[]): void {
    // Override in subclasses
    this.state = 'idle';
  }

  protected performAttack(target: BaseUnit): void {
    // Will be overridden by subclasses for special attacks
    target.takeDamage(this.damage);
  }

  protected findNearestEnemy(allUnits: BaseUnit[]): BaseUnit | null {
    let nearest: BaseUnit | null = null;
    let nearestDist = this.range * 2;

    for (const unit of allUnits) {
      if (unit.team !== this.team && unit.health > 0) {
        const dist = Vector.distance(this.position, unit.position);
        if (dist < nearestDist) {
          nearest = unit;
          nearestDist = dist;
        }
      }
    }

    return nearest;
  }

  takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
    if (this.health <= 0) {
      this.state = 'dead';
    }
  }

  heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  getHealthPercent(): number {
    return this.health / this.maxHealth;
  }

  isDead(): boolean {
    return this.health <= 0;
  }

  getCurrentAnimationFrame(): number {
    return this.animation?.getCurrentFrame() ?? 0;
  }

  setUnderControl(underControl: boolean): void {
    this.isUnderControl = underControl;
  }
}
