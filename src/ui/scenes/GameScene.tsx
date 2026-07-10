import React, { useState, useEffect, useRef } from 'react';
import { GameEngine } from '../game/GameEngine';
import { OrientationManager, ResponsiveUtils } from '../utils/responsive';
import styles from './GameScene.module.css';
import Button from './Button';
import HUD from './HUD';
import UnitSelector from './UnitSelector';
import PauseMenu from './PauseMenu';

interface GameSceneProps {
  onGameEnd: (won: boolean) => void;
  onMainMenu: () => void;
}

const GameScene: React.FC<GameSceneProps> = ({ onGameEnd, onMainMenu }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [fps, setFps] = useState(60);
  const fpsRef = useRef(0);
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup orientation and fullscreen
    const setupGame = async () => {
      try {
        await OrientationManager.requestFullscreen();
        await OrientationManager.lockLandscape();
      } catch (err) {
        console.warn('Could not lock orientation or fullscreen:', err);
      }
    };

    setupGame();

    // Create game engine
    const engine = new GameEngine(canvasRef.current);
    setGameEngine(engine);
    engine.start();

    // FPS counter
    const fpsInterval = setInterval(() => {
      setFps(fpsRef.current);
      fpsRef.current = 0;
    }, 1000);

    const animationInterval = setInterval(() => {
      const state = engine.getGameState();
      frameCountRef.current = state.frameCount;
      fpsRef.current = Math.round(state.frameCount / (Date.now() / 1000));
    }, 100);

    return () => {
      clearInterval(fpsInterval);
      clearInterval(animationInterval);
      engine.destroy();
    };
  }, []);

  useEffect(() => {
    if (!gameEngine) return;

    const state = gameEngine.getGameState();
    if (state.won || state.lost) {
      gameEngine.stop();
      onGameEnd(state.won);
    }
  }, [gameEngine?.getGameState().won, gameEngine?.getGameState().lost]);

  const handlePause = () => {
    if (!gameEngine) return;
    if (isPaused) {
      gameEngine.resume();
      setIsPaused(false);
    } else {
      gameEngine.pause();
      setIsPaused(true);
    }
  };

  const handleSpawnUnit = (unitType: string) => {
    if (!gameEngine) return;
    gameEngine.spawnUnit(unitType as any, 0);
  };

  if (!gameEngine) {
    return <div className={styles.loading}>Initializing Game...</div>;
  }

  const state = gameEngine.getGameState();
  const statues = Array.from(state.statues.values());

  return (
    <div className={styles.gameScene}>
      <div className={styles.gameShell}>
        <canvas ref={canvasRef} id="gameCanvas" />
        <HUD
          playerGold={state.playerGold}
          playerStatueHealth={statues[0]?.health || 0}
          playerStatueMaxHealth={statues[0]?.maxHealth || 1000}
          enemyStatueHealth={statues[1]?.health || 0}
          enemyStatueMaxHealth={statues[1]?.maxHealth || 1000}
          playerMana={state.playerMana}
          maxMana={state.maxMana}
          frameCount={state.frameCount}
          fps={fps}
        />
        <UnitSelector onUnitSelect={handleSpawnUnit} gold={state.playerGold} disabled={isPaused} />
        <button className={styles.pauseButton} onClick={handlePause}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
      </div>
      {isPaused && (
        <PauseMenu
          onResume={() => {
            gameEngine.resume();
            setIsPaused(false);
          }}
          onMainMenu={() => {
            gameEngine.destroy();
            onMainMenu();
          }}
        />
      )}
    </div>
  );
};

export default GameScene;
