// Unit Factory - Creates units of specific types

import { Team, UnitType, Vector2 } from '../types/game.types';
import { BaseUnit } from './BaseUnit';
import { Swordwrath } from './units/Swordwrath';
import { Archidon } from './units/Archidon';
import { Spearton } from './units/Spearton';
import { Magikill } from './units/Magikill';
import { Giant } from './units/Giant';
import { Miner } from './units/Miner';

export class UnitFactory {
  static createUnit(
    type: UnitType,
    team: Team,
    position: Vector2,
    statueId: string
  ): BaseUnit {
    switch (type) {
      case 'swordwrath':
        return new Swordwrath(team, position, statueId);
      case 'archidon':
        return new Archidon(team, position, statueId);
      case 'spearton':
        return new Spearton(team, position, statueId);
      case 'magikill':
        return new Magikill(team, position, statueId);
      case 'giant':
        return new Giant(team, position, statueId);
      case 'miner':
        return new Miner(team, position, statueId);
      default:
        throw new Error(`Unknown unit type: ${type}`);
    }
  }
}
