import { BaseUnit } from '../entities/BaseUnit';
import { Animation, AnimationLibrary } from '../utils/animation';

export class AnimationSystem {
  private animations: Map<string, Animation> = new Map();

  createAnimation(unitId: string, animationType: keyof typeof AnimationLibrary): Animation {
    const animData = AnimationLibrary[animationType];
    const animation = new Animation(animData);
    this.animations.set(`${unitId}-${animationType}`, animation);
    return animation;
  }

  update(units: BaseUnit[], deltaTime: number): void {
    for (const unit of units) {
      if ((unit as any).animation) {
        (unit as any).animation.update(deltaTime);
      }
    }
  }

  destroy(): void {
    this.animations.clear();
  }
}
