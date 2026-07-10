// Mobile Responsive Utilities

export const ResponsiveUtils = {
  // Get canvas dimensions maintaining 16:9 aspect ratio
  getCanvasDimensions: (): { width: number; height: number } => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = 16 / 9;
    
    let width: number;
    let height: number;
    
    if (windowWidth / windowHeight > aspectRatio) {
      // Window is wider than needed
      height = windowHeight;
      width = height * aspectRatio;
    } else {
      // Window is taller than needed
      width = windowWidth;
      height = width / aspectRatio;
    }
    
    return { width, height };
  },
  
  // Get device pixel ratio for crisp canvas
  getDevicePixelRatio: (): number => {
    return window.devicePixelRatio || 1;
  },
  
  // Check if device is mobile
  isMobile: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },
  
  // Check if in portrait mode
  isPortrait: (): boolean => {
    return window.innerHeight > window.innerWidth;
  },
  
  // Check if in landscape mode
  isLandscape: (): boolean => {
    return window.innerWidth > window.innerHeight;
  },
  
  // Scale UI elements based on screen size
  scaleUIElement: (baseSize: number): number => {
    const { width } = ResponsiveUtils.getCanvasDimensions();
    return (width / 1920) * baseSize; // 1920 is base width
  },
  
  // Convert touch coordinates to game coordinates
  convertTouchToGame: (touchX: number, touchY: number, canvasRect: DOMRect): { x: number; y: number } => {
    const scaleX = 1920 / canvasRect.width;
    const scaleY = 1080 / canvasRect.height;
    
    return {
      x: (touchX - canvasRect.left) * scaleX,
      y: (touchY - canvasRect.top) * scaleY,
    };
  },
  
  // Get safe area insets (for notched devices)
  getSafeAreaInsets: (): { top: number; right: number; bottom: number; left: number } => {
    const style = getComputedStyle(document.documentElement);
    return {
      top: parseFloat(style.getPropertyValue('--safe-area-inset-top')) || 0,
      right: parseFloat(style.getPropertyValue('--safe-area-inset-right')) || 0,
      bottom: parseFloat(style.getPropertyValue('--safe-area-inset-bottom')) || 0,
      left: parseFloat(style.getPropertyValue('--safe-area-inset-left')) || 0,
    };
  },
};

export const OrientationManager = {
  // Request fullscreen
  requestFullscreen: async (): Promise<void> => {
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
  },
  
  // Lock orientation to landscape
  lockLandscape: async (): Promise<void> => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.warn('Orientation lock failed:', err);
    }
  },
  
  // Exit fullscreen
  exitFullscreen: async (): Promise<void> => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Exit fullscreen failed:', err);
    }
  },
  
  // Unlock orientation
  unlockOrientation: async (): Promise<void> => {
    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    } catch (err) {
      console.warn('Orientation unlock failed:', err);
    }
  },
};
