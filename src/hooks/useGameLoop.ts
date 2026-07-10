import { useEffect, useRef, useCallback } from 'react';

interface GameLoopOptions {
  targetFps?: number;
  onUpdate?: (deltaTime: number) => void;
  onRender?: () => void;
  enabled?: boolean;
}

export const useGameLoop = ({
  targetFps = 60,
  onUpdate,
  onRender,
  enabled = true,
}: GameLoopOptions) => {
  const frameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const fpsRef = useRef<number>(targetFps);
  const frameCountRef = useRef<number>(0);
  const deltaAccumRef = useRef<number>(0);

  const targetFrameTime = 1000 / targetFps;

  const gameLoop = useCallback(() => {
    const now = performance.now();
    const deltaTime = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;

    // Update
    if (onUpdate) {
      onUpdate(deltaTime);
    }

    // Render
    if (onRender) {
      onRender();
    }

    // FPS tracking
    frameCountRef.current++;
    deltaAccumRef.current += deltaTime;

    if (deltaAccumRef.current >= 1) {
      fpsRef.current = frameCountRef.current;
      frameCountRef.current = 0;
      deltaAccumRef.current = 0;
    }

    if (enabled) {
      frameIdRef.current = requestAnimationFrame(gameLoop);
    }
  }, [onUpdate, onRender, enabled]);

  useEffect(() => {
    if (!enabled) return;

    lastTimeRef.current = performance.now();
    frameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [enabled, gameLoop]);

  return {
    fps: fpsRef.current,
    frameCount: frameCountRef.current,
  };
};
