// Swordwrath Unit

import { BaseUnit } from './BaseUnit';
import { Team, Vector2 } from '../types/game.types';
import { UNIT_STATS } from '../types/constants';

export class Swordwrath extends BaseUnit {
  constructor(team: Team, position: Vector2, statueId: string) {
    super('swordwrath', team, position, UNIT_STATS.SWORDWRATH, statueId);
  }

  protected performAttack(target: any): void {
    // Swordwrath has a basic fast attack
    const damageVariation = this.damage * 0.1; // ±10% damage variation
    const actualDamage =
      this.damage + (Math.random() - 0.5) * damageVariation * 2;
    target.takeDamage(actualDamage);
  }
}
