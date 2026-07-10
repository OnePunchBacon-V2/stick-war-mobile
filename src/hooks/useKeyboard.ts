import { useEffect, useRef, useCallback } from 'react';

interface KeyboardOptions {
  onKeyDown?: (key: string) => void;
  onKeyUp?: (key: string) => void;
}

export const useKeyboard = ({ onKeyDown, onKeyUp }: KeyboardOptions) => {
  const keysRef = useRef<Set<string>>(new Set());

  const isKeyPressed = useCallback((key: string): boolean => {
    return keysRef.current.has(key.toLowerCase());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);
      onKeyDown?.(key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.delete(key);
      onKeyUp?.(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return { isKeyPressed, keysPressed: keysRef.current };
};
