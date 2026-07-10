// Animation System Utilities

export interface AnimationFrame {
  frame: number;
  duration: number;
}

export interface AnimationData {
  frames: AnimationFrame[];
  speed: number;
  loop: boolean;
}

export class Animation {
  currentFrame: number = 0;
  currentTime: number = 0;
  isPlaying: boolean = true;
  isFinished: boolean = false;
  
  constructor(private animationData: AnimationData) {}
  
  update(deltaTime: number): void {
    if (!this.isPlaying || this.isFinished) return;
    
    this.currentTime += deltaTime * this.animationData.speed;
    
    let totalTime = 0;
    for (let i = 0; i < this.animationData.frames.length; i++) {
      totalTime += this.animationData.frames[i].duration;
      if (this.currentTime < totalTime) {
        this.currentFrame = i;
        return;
      }
    }
    
    if (this.animationData.loop) {
      this.currentTime = 0;
      this.currentFrame = 0;
    } else {
      this.isFinished = true;
      this.currentFrame = this.animationData.frames.length - 1;
    }
  }
  
  reset(): void {
    this.currentFrame = 0;
    this.currentTime = 0;
    this.isFinished = false;
    this.isPlaying = true;
  }
  
  play(): void {
    this.isPlaying = true;
  }
  
  pause(): void {
    this.isPlaying = false;
  }
  
  stop(): void {
    this.isPlaying = false;
    this.reset();
  }
  
  getCurrentFrame(): number {
    return this.animationData.frames[this.currentFrame].frame;
  }
}

export const AnimationLibrary = {
  IDLE: {
    frames: [
      { frame: 0, duration: 200 },
      { frame: 1, duration: 200 },
      { frame: 2, duration: 200 },
    ],
    speed: 1,
    loop: true,
  },
  
  WALK: {
    frames: [
      { frame: 0, duration: 100 },
      { frame: 1, duration: 100 },
      { frame: 2, duration: 100 },
      { frame: 3, duration: 100 },
    ],
    speed: 1,
    loop: true,
  },
  
  ATTACK: {
    frames: [
      { frame: 0, duration: 80 },
      { frame: 1, duration: 80 },
      { frame: 2, duration: 80 },
      { frame: 3, duration: 80 },
    ],
    speed: 1,
    loop: false,
  },
  
  DIE: {
    frames: [
      { frame: 0, duration: 100 },
      { frame: 1, duration: 100 },
      { frame: 2, duration: 100 },
    ],
    speed: 1,
    loop: false,
  },
  
  SPECIAL: {
    frames: [
      { frame: 0, duration: 150 },
      { frame: 1, duration: 150 },
      { frame: 2, duration: 150 },
    ],
    speed: 1,
    loop: false,
  },
};
