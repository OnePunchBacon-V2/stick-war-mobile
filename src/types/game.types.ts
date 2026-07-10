// Game State and Type Definitions

export type GameScene = 'menu' | 'game' | 'pause' | 'gameover' | 'upgrades' | 'campaign';

export type GameMode = 'campaign' | 'custom' | 'endless';

export type UnitType = 'swordwrath' | 'archidon' | 'spearton' | 'magikill' | 'giant' | 'miner';

export type Team = 0 | 1; // 0 = player, 1 = enemy

export type UnitState = 'idle' | 'moving' | 'attacking' | 'dead' | 'special';

export type WeaponType = 'sword' | 'bow' | 'spear' | 'magic' | 'club' | 'pick';

export interface Vector2 {
  x: number;
  y: number;
}

export interface UnitStats {
  id: UnitType;
  name: string;
  cost: number;
  health: number;
  maxHealth: number;
  damage: number;
  attackSpeed: number;
  moveSpeed: number;
  range: number;
  scale: number;
  color: string;
  weaponType: WeaponType;
}

export interface Unit {
  id: string;
  type: UnitType;
  team: Team;
  position: Vector2;
  velocity: Vector2;
  health: number;
  maxHealth: number;
  state: UnitState;
  damage: number;
  attackSpeed: number;
  moveSpeed: number;
  range: number;
  scale: number;
  color: string;
  weaponType: WeaponType;
  targetId: string | null;
  animationFrame: number;
  animationTime: number;
  lastAttackTime: number;
  direction: number; // -1 (left) or 1 (right)
  isUnderControl: boolean; // Direct player control
  statueId: string; // Reference to their statue
}

export interface Projectile {
  id: string;
  type: 'arrow' | 'spell' | 'projectile';
  position: Vector2;
  velocity: Vector2;
  damage: number;
  team: Team;
  targetId: string | null;
  lifetime: number;
  maxLifetime: number;
  sourceUnitId: string;
}

export interface Particle {
  id: string;
  position: Vector2;
  velocity: Vector2;
  lifetime: number;
  maxLifetime: number;
  color: string;
  size: number;
  type: 'spark' | 'blood' | 'dust';
}

export interface Statue {
  id: string;
  team: Team;
  position: Vector2;
  health: number;
  maxHealth: number;
  width: number;
  height: number;
  regenerationRate: number;
}

export interface GameState {
  scene: GameScene;
  mode: GameMode;
  isRunning: boolean;
  isPaused: boolean;
  elapsedTime: number;
  frameCount: number;
  
  // Resources
  playerGold: number;
  enemyGold: number;
  playerMana: number;
  enemyMana: number;
  maxMana: number;
  
  // Entities
  units: Map<string, Unit>;
  projectiles: Map<string, Projectile>;
  particles: Map<string, Particle>;
  statues: Map<string, Statue>;
  
  // UI
  selectedUnitId: string | null;
  selectedUnitType: UnitType | null;
  hoveredUnitId: string | null;
  
  // Input
  mousePos: Vector2;
  touchPos: Vector2 | null;
  
  // Camera
  cameraPos: Vector2;
  zoom: number;
  
  // Game progress
  currentLevel: number;
  currentCampaign: string;
  score: number;
  won: boolean;
  lost: boolean;
}

export interface GameConfig {
  width: number;
  height: number;
  targetFps: number;
  gameMode: GameMode;
}

export interface UIButtonConfig {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: () => void;
  color?: string;
  hoverColor?: string;
  textColor?: string;
  fontSize?: number;
  borderRadius?: number;
}

export interface SpellConfig {
  id: string;
  name: string;
  cooldown: number;
  lastUsed: number;
  available: boolean;
}

export interface CampaignLevel {
  id: string;
  name: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'insane';
  enemyTribe: string;
  enemyUnits: UnitType[];
  reward: number;
  completed: boolean;
}

export interface UpgradeTree {
  [key: string]: {
    level: number;
    maxLevel: number;
    cost: number;
    effect: string;
  };
}
