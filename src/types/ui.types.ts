// UI Component Type Definitions

export interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface HUDProps {
  playerGold: number;
  playerStatueHealth: number;
  playerStatueMaxHealth: number;
  enemyStatueHealth: number;
  enemyStatueMaxHealth: number;
  playerMana: number;
  maxMana: number;
  selectedUnit: string | null;
  unitCount: number;
}

export interface UnitSelectorProps {
  onUnitSelect: (unitType: string) => void;
  gold: number;
  disabled?: boolean;
}

export interface HealthBarProps {
  current: number;
  max: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export interface PauseMenuProps {
  onResume: () => void;
  onSettings: () => void;
  onMainMenu: () => void;
}

export interface GameOverScreenProps {
  won: boolean;
  score: number;
  level: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

export interface MainMenuProps {
  onStartGame: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export interface UpgradePanelProps {
  upgrades: {
    unitDamage: number;
    unitHealth: number;
    statueHealth: number;
    miningSpeed: number;
  };
  gold: number;
  onUpgrade: (upgradeType: string) => void;
  onClose: () => void;
}

export interface ControlOverlayProps {
  onMove: (direction: number) => void;
  onAttack: () => void;
  onSpecial: () => void;
  onPause: () => void;
}

export interface AnimationFrame {
  frameIndex: number;
  duration: number;
  offsetX?: number;
  offsetY?: number;
}

export interface SpriteAnimation {
  frames: AnimationFrame[];
  currentFrame: number;
  currentTime: number;
  loop: boolean;
  speed: number;
}
