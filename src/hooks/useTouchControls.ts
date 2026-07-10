import { useEffect, useRef, useCallback } from 'react';
import { Vector2 } from '../types/game.types';

interface TouchOptions {
  onTouchStart?: (pos: Vector2) => void;
  onTouchMove?: (pos: Vector2) => void;
  onTouchEnd?: (pos: Vector2) => void;
  element?: HTMLElement | null;
}

export const useTouchControls = ({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  element,
}: TouchOptions) => {
  const touchPosRef = useRef<Vector2 | null>(null);
  const targetRef = useRef<HTMLElement | null>(element || null);

  const getTouchPosition = useCallback(
    (touch: Touch): Vector2 => {
      const target = targetRef.current || window;
      const rect = (target as any).getBoundingClientRect?.() || {
        left: 0,
        top: 0,
      };
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    },
    []
  );

  useEffect(() => {
    const target = targetRef.current || window;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const pos = getTouchPosition(e.touches[0]);
        touchPosRef.current = pos;
        onTouchStart?.(pos);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const pos = getTouchPosition(e.touches[0]);
        touchPosRef.current = pos;
        onTouchMove?.(pos);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (touchPosRef.current) {
        onTouchEnd?.(touchPosRef.current);
      }
      touchPosRef.current = null;
    };

    (target as any).addEventListener?.('touchstart', handleTouchStart);
    (target as any).addEventListener?.('touchmove', handleTouchMove);
    (target as any).addEventListener?.('touchend', handleTouchEnd);

    return () => {
      (target as any).removeEventListener?.('touchstart', handleTouchStart);
      (target as any).removeEventListener?.('touchmove', handleTouchMove);
      (target as any).removeEventListener?.('touchend', handleTouchEnd);
    };
  }, [getTouchPosition, onTouchStart, onTouchMove, onTouchEnd]);

  return { touchPos: touchPosRef.current };
};
