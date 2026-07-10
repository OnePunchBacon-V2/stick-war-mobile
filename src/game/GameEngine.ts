// Game Engine - Main game loop and state management

import { GameState, UnitType, Team, Vector2 } from '../types/game.types';
import { GAME_CONFIG, GAME_BALANCE } from '../types/constants';
import { BaseUnit } from '../entities/BaseUnit';
import { StatueEntity } from '../entities/Statue';
import { ParticleEntity } from '../entities/Particle';
import { UnitFactory } from '../entities/UnitFactory';
import { CanvasRenderer } from './Renderer';
import { PhysicsSystem } from './Physics';
import { InputManager } from './InputManager';
import { AudioManager } from '../audio/AudioManager';
import { ResponsiveUtils } from '../utils/responsive';

export class GameEngine {
  private gameState: GameState;
  private canvas: HTMLCanvasElement;
  private renderer: CanvasRenderer;
  private physics: PhysicsSystem;
  private inputManager: InputManager;
  private audioManager: AudioManager;
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const { width, height } = ResponsiveUtils.getCanvasDimensions();

    // Initialize systems
    this.renderer = new CanvasRenderer(canvas, width, height);
    this.physics = new PhysicsSystem();
    this.inputManager = new InputManager(canvas);
    this.audioManager = new AudioManager();

    // Initialize game state
    this.gameState = this.createInitialGameState();

    // Setup resize observer
    this.setupResizeObserver();

    // Setup input handlers
    this.setupInputHandlers();
  }

  private createInitialGameState(): GameState {
    return {
      scene: 'game',
      mode: 'custom',
      isRunning: false,
      isPaused: false,
      elapsedTime: 0,
      frameCount: 0,

      playerGold: GAME_BALANCE.INITIAL_GOLD,
      enemyGold: GAME_BALANCE.INITIAL_GOLD,
      playerMana: 100,
      enemyMana: 100,
      maxMana: 100,

      units: new Map(),
      projectiles: new Map(),
      particles: new Map(),
      statues: new Map(),

      selectedUnitId: null,
      selectedUnitType: null,
      hoveredUnitId: null,

      mousePos: { x: 0, y: 0 },
      touchPos: null,

      cameraPos: { x: 0, y: 0 },
      zoom: 1,

      currentLevel: 1,
      currentCampaign: 'classic',
      score: 0,
      won: false,
      lost: false,
    };
  }

  private setupResizeObserver(): void {
    const gameShell = this.canvas.parentElement;
    if (!gameShell) return;

    this.resizeObserver = new ResizeObserver(() => {
      const { width, height } = ResponsiveUtils.getCanvasDimensions();
      this.renderer.resize(width, height);
    });

    this.resizeObserver.observe(gameShell);
  }

  private setupInputHandlers(): void {
    this.inputManager.on('click', (data) => {
      if (data.position) {
        this.handleGameClick(data.position);
      }
    });

    this.inputManager.on('touchend', (data) => {
      if (data.position) {
        this.handleGameClick(data.position);
      }
    });
  }

  private handleGameClick(pos: Vector2): void {
    // Find unit at click position
    const clickedUnit = this.getUnitAtPosition(pos);

    if (clickedUnit) {
      this.gameState.selectedUnitId = clickedUnit.id;
      this.gameState.selectedUnitType = clickedUnit.type;
      this.audioManager.playClickSound();
    }
  }

  private getUnitAtPosition(pos: Vector2): BaseUnit | null {
    const clickRadius = 30;

    for (const unit of this.gameState.units.values()) {
      const dx = unit.position.x - pos.x;
      const dy = unit.position.y - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < clickRadius) {
        return unit;
      }
    }

    return null;
  }

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.gameState.isRunning = true;
    this.lastFrameTime = Date.now();

    // Spawn initial units
    this.spawnTestUnits();

    // Start game loop
    this.gameLoop();
  }

  pause(): void {
    this.gameState.isPaused = true;
    this.audioManager.resumeAudioContext();
  }

  resume(): void {
    this.gameState.isPaused = false;
    this.lastFrameTime = Date.now();
  }

  stop(): void {
    this.isRunning = false;
    this.gameState.isRunning = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private spawnTestUnits(): void {
    // Spawn player statue
    const playerStatue = new StatueEntity(0, { x: 200, y: 540 });
    this.gameState.statues.set(playerStatue.id, playerStatue);

    // Spawn enemy statue
    const enemyStatue = new StatueEntity(1, { x: 1720, y: 540 });
    this.gameState.statues.set(enemyStatue.id, enemyStatue);

    // Spawn initial miners
    for (let i = 0; i < 2; i++) {
      const miner = UnitFactory.createUnit(
        'miner',
        0,
        { x: 300 + i * 80, y: 540 + Math.random() * 100 - 50 },
        playerStatue.id
      );
      this.gameState.units.set(miner.id, miner);
    }
  }

  spawnUnit(type: UnitType, team: Team): boolean {
    const stats = require('../types/constants').UNIT_STATS[type.toUpperCase()];

    if (
      (team === 0 && this.gameState.playerGold >= stats.cost) ||
      (team === 1 && this.gameState.enemyGold >= stats.cost)
    ) {
      // Deduct gold
      if (team === 0) {
        this.gameState.playerGold -= stats.cost;
      } else {
        this.gameState.enemyGold -= stats.cost;
      }

      // Find statue
      const statues = Array.from(this.gameState.statues.values());
      const statue = statues.find((s) => s.team === team);

      if (statue) {
        const spawnPos = {
          x: statue.position.x + (team === 0 ? 100 : -100),
          y: statue.position.y + (Math.random() - 0.5) * 100,
        };

        const unit = UnitFactory.createUnit(type, team, spawnPos, statue.id);
        this.gameState.units.set(unit.id, unit);
        this.audioManager.playSummonSound();
        return true;
      }
    }

    return false;
  }

  private gameLoop = (): void => {
    if (!this.isRunning) return;

    const now = Date.now();
    const deltaTime = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    if (!this.gameState.isPaused) {
      this.update(deltaTime);
    }

    this.render();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number): void {
    this.gameState.elapsedTime += deltaTime;
    this.gameState.frameCount++;

    // Update units
    const unitsArray = Array.from(this.gameState.units.values());
    for (const unit of unitsArray) {
      unit.update(deltaTime, unitsArray);

      // Remove dead units
      if (unit.isDead() && this.gameState.elapsedTime - (unit as any).deathTime > 2) {
        this.gameState.units.delete(unit.id);
      }
    }

    // Update particles
    const particlesArray = Array.from(this.gameState.particles.values());
    for (const particle of particlesArray) {
      particle.update(deltaTime);
      if (!particle.isAlive()) {
        this.gameState.particles.delete(particle.id);
      }
    }

    // Update statues
    for (const statue of this.gameState.statues.values()) {
      statue.update(deltaTime);
    }

    // Physics update
    this.physics.update(unitsArray, Array.from(this.gameState.statues.values()));

    // Check win/lose conditions
    this.checkGameEnd();
  }

  private render(): void {
    this.renderer.clear();
    this.renderer.drawGrid();

    // Draw statues
    for (const statue of this.gameState.statues.values()) {
      this.renderer.drawStatue(statue);
    }

    // Draw units
    for (const unit of this.gameState.units.values()) {
      this.renderer.drawUnit(unit);
    }

    // Draw particles
    for (const particle of this.gameState.particles.values()) {
      this.renderer.drawParticle(particle);
    }
  }

  private checkGameEnd(): void {
    const statues = Array.from(this.gameState.statues.values());

    for (const statue of statues) {
      if (statue.isDestroyed()) {
        if (statue.team === 0) {
          this.gameState.lost = true;
          this.stop();
        } else {
          this.gameState.won = true;
          this.stop();
        }
      }
    }
  }

  getGameState(): GameState {
    return this.gameState;
  }

  getRenderer(): CanvasRenderer {
    return this.renderer;
  }

  destroy(): void {
    this.stop();
    this.inputManager.destroy();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
