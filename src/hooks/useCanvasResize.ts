import { useEffect, useRef, useCallback } from 'react';

interface ResizeOptions {
  onResize?: (width: number, height: number) => void;
  aspectRatio?: number;
}

export const useCanvasResize = ({ onResize, aspectRatio = 16 / 9 }: ResizeOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return null;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;

    let width: number;
    let height: number;

    if (windowWidth / windowHeight > aspectRatio) {
      height = windowHeight;
      width = height * aspectRatio;
    } else {
      width = windowWidth;
      height = width / aspectRatio;
    }

    return { width, height, devicePixelRatio };
  }, [aspectRatio]);

  useEffect(() => {
    const handleResize = () => {
      const dims = calculateDimensions();
      if (dims && onResize) {
        onResize(dims.width, dims.height);
      }
    };

    // ResizeObserver for container
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserverRef.current.observe(containerRef.current);
    }

    // Window resize listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Initial call
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [calculateDimensions, onResize]);

  return { containerRef, calculateDimensions };
};
