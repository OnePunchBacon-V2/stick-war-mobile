// Math Utilities for Game Logic

import { Vector2 } from '../types/game.types';

export const Vector = {
  create: (x: number, y: number): Vector2 => ({ x, y }),
  
  clone: (v: Vector2): Vector2 => ({ x: v.x, y: v.y }),
  
  add: (a: Vector2, b: Vector2): Vector2 => ({
    x: a.x + b.x,
    y: a.y + b.y,
  }),
  
  subtract: (a: Vector2, b: Vector2): Vector2 => ({
    x: a.x - b.x,
    y: a.y - b.y,
  }),
  
  multiply: (v: Vector2, scalar: number): Vector2 => ({
    x: v.x * scalar,
    y: v.y * scalar,
  }),
  
  distance: (a: Vector2, b: Vector2): number => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  },
  
  distanceSquared: (a: Vector2, b: Vector2): number => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return dx * dx + dy * dy;
  },
  
  length: (v: Vector2): number => {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  },
  
  normalize: (v: Vector2): Vector2 => {
    const len = Vector.length(v);
    if (len === 0) return { x: 0, y: 0 };
    return { x: v.x / len, y: v.y / len };
  },
  
  dot: (a: Vector2, b: Vector2): number => {
    return a.x * b.x + a.y * b.y;
  },
  
  lerp: (a: Vector2, b: Vector2, t: number): Vector2 => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  }),
};

export const Collision = {
  // Circle to circle collision
  circleToCircle: (pos1: Vector2, radius1: number, pos2: Vector2, radius2: number): boolean => {
    const dist = Vector.distance(pos1, pos2);
    return dist < radius1 + radius2;
  },
  
  // Circle to rectangle collision
  circleToRect: (
    circlePos: Vector2,
    radius: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ): boolean => {
    const closestX = Math.max(rectX, Math.min(circlePos.x, rectX + rectWidth));
    const closestY = Math.max(rectY, Math.min(circlePos.y, rectY + rectHeight));
    
    const dx = circlePos.x - closestX;
    const dy = circlePos.y - closestY;
    
    return dx * dx + dy * dy < radius * radius;
  },
  
  // Rectangle to rectangle collision (AABB)
  rectToRect: (
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
  ): boolean => {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  },
  
  // Line to circle collision
  lineToCircle: (
    lineStart: Vector2,
    lineEnd: Vector2,
    circlePos: Vector2,
    radius: number
  ): boolean => {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return Vector.distance(lineStart, circlePos) <= radius;
    
    let t = Math.max(0, Math.min(1, Vector.dot(
      Vector.subtract(circlePos, lineStart),
      { x: dx / length, y: dy / length }
    ) / length));
    
    const closest = Vector.add(lineStart, Vector.multiply({ x: dx, y: dy }, t / length));
    return Vector.distance(closest, circlePos) <= radius;
  },
};

export const Easing = {
  linear: (t: number): number => t,
  
  easeInQuad: (t: number): number => t * t,
  
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  easeInCubic: (t: number): number => t * t * t,
  
  easeOutCubic: (t: number): number =>
    1 + (t - 1) * (t - 1) * (t - 1),
  
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2)),
  
  easeOutElastic: (t: number): number => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  },
};

export const MathUtils = {
  clamp: (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  },
  
  lerp: (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
  },
  
  inverseLerp: (a: number, b: number, value: number): number => {
    return (value - a) / (b - a);
  },
  
  remap: (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    const t = MathUtils.inverseLerp(inMin, inMax, value);
    return MathUtils.lerp(outMin, outMax, t);
  },
  
  random: (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  },
  
  randomInt: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  randomChance: (chance: number): boolean => {
    return Math.random() < chance;
  },
  
  degToRad: (degrees: number): number => {
    return (degrees * Math.PI) / 180;
  },
  
  radToDeg: (radians: number): number => {
    return (radians * 180) / Math.PI;
  },
  
  angleBetween: (from: Vector2, to: Vector2): number => {
    return Math.atan2(to.y - from.y, to.x - from.x);
  },
};
