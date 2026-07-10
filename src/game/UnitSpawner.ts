import { UnitType, Team, GameState, Vector2 } from '../types/game.types';
import { UNIT_STATS } from '../types/constants';
import { UnitFactory } from '../entities/UnitFactory';
import { BaseUnit } from '../entities/BaseUnit';

export class UnitSpawner {
  private spawnQueue: Array<{ type: UnitType; team: Team; timestamp: number }> = [];
  private lastSpawnTime: number = 0;
  private spawnDelay: number = 500; // ms

  spawnUnit(type: UnitType, team: Team, gameState: GameState): boolean {
    const stats = (UNIT_STATS as any)[type.toUpperCase()];

    if (!stats) {
      console.error(`Unknown unit type: ${type}`);
      return false;
    }

    // Check gold
    const playerGold = gameState.playerGold;
    const enemyGold = gameState.enemyGold;

    if ((team === 0 && playerGold < stats.cost) || (team === 1 && enemyGold < stats.cost)) {
      return false;
    }

    // Check unit limit
    const unitCount = gameState.units.size;
    if (unitCount >= 30) {
      return false;
    }

    // Find statue
    const statues = Array.from(gameState.statues.values());
    const statue = statues.find((s) => s.team === team);

    if (!statue) {
      return false;
    }

    // Spawn position
    const spawnPos: Vector2 = {
      x: statue.position.x + (team === 0 ? 100 : -100),
      y: statue.position.y + (Math.random() - 0.5) * 100,
    };

    // Create unit
    const unit = UnitFactory.createUnit(type, team, spawnPos, statue.id);
    gameState.units.set(unit.id, unit);

    // Deduct gold
    if (team === 0) {
      gameState.playerGold -= stats.cost;
    } else {
      gameState.enemyGold -= stats.cost;
    }

    return true;
  }

  queueSpawn(type: UnitType, team: Team): void {
    this.spawnQueue.push({
      type,
      team,
      timestamp: Date.now(),
    });
  }

  processQueue(gameState: GameState): void {
    const now = Date.now();

    for (let i = this.spawnQueue.length - 1; i >= 0; i--) {
      const spawn = this.spawnQueue[i];
      if (now - spawn.timestamp >= this.spawnDelay) {
        this.spawnUnit(spawn.type, spawn.team, gameState);
        this.spawnQueue.splice(i, 1);
      }
    }
  }
}
