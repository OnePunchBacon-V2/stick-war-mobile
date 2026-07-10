// Game Constants and Unit Stats

export const GAME_CONFIG = {
  CANVAS_WIDTH: 1920,
  CANVAS_HEIGHT: 1080,
  ASPECT_RATIO: 16 / 9,
  TARGET_FPS: 60,
  FRAME_TIME: 1000 / 60,
};

export const UNIT_STATS = {
  SWORDWRATH: {
    id: 'swordwrath',
    name: 'Swordwrath',
    cost: 150,
    health: 100,
    maxHealth: 100,
    damage: 15,
    attackSpeed: 1.0,
    moveSpeed: 5,
    range: 30,
    scale: 1,
    color: '#FF6B6B',
    weaponType: 'sword',
  },
  ARCHIDON: {
    id: 'archidon',
    name: 'Archidon',
    cost: 300,
    health: 80,
    maxHealth: 80,
    damage: 22,
    attackSpeed: 1.2,
    moveSpeed: 5.5,
    range: 200,
    scale: 1,
    color: '#4ECDC4',
    weaponType: 'bow',
  },
  SPEARTON: {
    id: 'spearton',
    name: 'Spearton',
    cost: 500,
    health: 400,
    maxHealth: 400,
    damage: 35,
    attackSpeed: 1.5,
    moveSpeed: 3,
    range: 40,
    scale: 1.2,
    color: '#FFE66D',
    weaponType: 'spear',
  },
  MAGIKILL: {
    id: 'magikill',
    name: 'Magikill',
    cost: 1200,
    health: 200,
    maxHealth: 200,
    damage: 40,
    attackSpeed: 2.0,
    moveSpeed: 2.5,
    range: 180,
    scale: 1.1,
    color: '#A78BFA',
    weaponType: 'magic',
  },
  GIANT: {
    id: 'giant',
    name: 'Giant',
    cost: 1500,
    health: 1050,
    maxHealth: 1050,
    damage: 60,
    attackSpeed: 2.5,
    moveSpeed: 1.5,
    range: 50,
    scale: 2.0,
    color: '#F87171',
    weaponType: 'club',
  },
  MINER: {
    id: 'miner',
    name: 'Miner',
    cost: 150,
    health: 100,
    maxHealth: 100,
    damage: 5,
    attackSpeed: 0.8,
    moveSpeed: 2,
    range: 30,
    scale: 0.9,
    color: '#94A3B8',
    weaponType: 'pick',
  },
};

export const STATUE_STATS = {
  INITIAL_HEALTH: 1000,
  MAX_HEALTH: 2000,
  WIDTH: 80,
  HEIGHT: 100,
  REGEN_RATE: 0.5,
};

export const GAME_BALANCE = {
  INITIAL_GOLD: 500,
  GOLD_TRICKLE: 1,
  GOLD_TRICKLE_INTERVAL: 2000, // ms
  MAX_UNITS_PER_TEAM: 30,
  UNIT_SPAWN_DELAY: 500, // ms
};

export const SPELL_COOLDOWNS = {
  HEAL: 30000,
  FREEZE: 35000,
  BOMB: 25000,
  RAGE: 30000,
  POISON: 40000,
};

export const AI_CONFIG = {
  PATHFINDING_GRID_SIZE: 50,
  DETECTION_RANGE: 300,
  ATTACK_RANGE_BUFFER: 20,
  UNIT_COLLISION_RADIUS: 25,
};

export const ANIMATION_SPEEDS = {
  IDLE: 200,
  WALK: 150,
  ATTACK: 100,
  DIE: 120,
};

export const PARTICLE_CONFIG = {
  LIFETIME: 500,
  GRAVITY: 0.2,
  FRICTION: 0.98,
};

export const CAMERA_CONFIG = {
  FOLLOW_SPEED: 0.1,
  MIN_ZOOM: 0.5,
  MAX_ZOOM: 2,
  DEFAULT_ZOOM: 1,
};
