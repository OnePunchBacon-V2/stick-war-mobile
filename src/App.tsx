import React, { useState, useEffect } from 'react';
import './App.css';
import MainMenu from './ui/scenes/MainMenu';
import GameScene from './ui/scenes/GameScene';
import GameOverScene from './ui/scenes/GameOverScene';
import { OrientationManager, ResponsiveUtils } from './utils/responsive';

type AppScene = 'menu' | 'game' | 'gameover';

const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<AppScene>('menu');
  const [gameWon, setGameWon] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [portraitWarning, setPortraitWarning] = useState(false);

  useEffect(() => {
    // Check orientation on mount and on resize
    const checkOrientation = () => {
      const isPortrait = ResponsiveUtils.isPortrait();
      setPortraitWarning(isPortrait && ResponsiveUtils.isMobile());
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleStartGame = async () => {
    try {
      // Request fullscreen and orientation lock
      await OrientationManager.requestFullscreen();
      await OrientationManager.lockLandscape();
    } catch (err) {
      console.warn('Could not enable fullscreen/orientation lock:', err);
    }
    setCurrentScene('game');
  };

  const handleGameEnd = (won: boolean) => {
    setGameWon(won);
    setGameScore(Math.random() * 10000); // Placeholder score
    setCurrentScene('gameover');
  };

  const handleRestart = () => {
    setCurrentScene('game');
  };

  const handleMainMenu = () => {
    setCurrentScene('menu');
  };

  return (
    <div className="app">
      {/* Portrait Warning Overlay */}
      {portraitWarning && (
        <div className="portrait-lock active">
          <div className="portrait-lock-content">
            <div className="portrait-lock-icon">📱</div>
            <h2>Please Rotate Your Device</h2>
            <p>For the best experience, please play in landscape mode.</p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="game-container">
        <div className="game-shell">
          {/* Scene Rendering */}
          {currentScene === 'menu' && (
            <MainMenu onStartGame={handleStartGame} />
          )}
          {currentScene === 'game' && (
            <GameScene onGameEnd={handleGameEnd} onMainMenu={handleMainMenu} />
          )}
          {currentScene === 'gameover' && (
            <GameOverScene
              won={gameWon}
              score={Math.round(gameScore)}
              onRestart={handleRestart}
              onMainMenu={handleMainMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
