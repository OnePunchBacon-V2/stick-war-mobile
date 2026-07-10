import { useEffect, useCallback } from 'react';

interface OrientationOptions {
  onOrientationChange?: (isLandscape: boolean) => void;
  lockLandscape?: boolean;
  enableFullscreen?: boolean;
}

export const useOrientation = ({
  onOrientationChange,
  lockLandscape = true,
  enableFullscreen = true,
}: OrientationOptions) => {
  const isLandscape = useCallback((): boolean => {
    return window.innerWidth > window.innerHeight;
  }, []);

  const requestFullscreen = useCallback(async () => {
    try {
      const elem = document.documentElement as any;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        await elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  }, []);

  const lockOrientation = useCallback(async () => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.warn('Orientation lock failed:', err);
    }
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      const landscape = isLandscape();
      onOrientationChange?.(landscape);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [isLandscape, onOrientationChange]);

  useEffect(() => {
    if (lockLandscape) {
      lockOrientation();
    }
  }, [lockLandscape, lockOrientation]);

  return {
    isLandscape: isLandscape(),
    requestFullscreen,
    lockOrientation,
  };
};
