// Input Manager - Handles keyboard, mouse, and touch input

import { Vector2 } from '../types/game.types';

export type InputCallback = (input: InputData) => void;

export interface InputData {
  type: 'click' | 'touch' | 'key';
  position?: Vector2;
  key?: string;
  button?: number;
}

export class InputManager {
  private canvas: HTMLCanvasElement;
  private callbacks: Map<string, InputCallback[]> = new Map();
  private keysPressed: Set<string> = new Set();
  private mousePos: Vector2 = { x: 0, y: 0 };
  private touchPos: Vector2 | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.setupListeners();
  }

  private setupListeners(): void {
    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Prevent default touch behaviors
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    this.emit('mousemove', { type: 'click', position: this.mousePos });
  }

  private handleMouseDown(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    this.emit('mousedown', { type: 'click', position: pos, button: e.button });
  }

  private handleMouseUp(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    this.emit('mouseup', { type: 'click', position: pos, button: e.button });
  }

  private handleClick(e: MouseEvent): void {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    this.emit('click', { type: 'click', position: pos });
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.touchPos = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      this.emit('touchstart', { type: 'touch', position: this.touchPos });
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.touchPos = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      this.emit('touchmove', { type: 'touch', position: this.touchPos });
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    if (this.touchPos) {
      this.emit('touchend', { type: 'touch', position: this.touchPos });
    }
    this.touchPos = null;
  }

  private handleKeyDown(e: KeyboardEvent): void {
    this.keysPressed.add(e.key.toLowerCase());
    this.emit('keydown', { type: 'key', key: e.key });
  }

  private handleKeyUp(e: KeyboardEvent): void {
    this.keysPressed.delete(e.key.toLowerCase());
    this.emit('keyup', { type: 'key', key: e.key });
  }

  on(event: string, callback: InputCallback): void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);
  }

  off(event: string, callback: InputCallback): void {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: InputData): void {
    const callbacks = this.callbacks.get(event) || [];
    for (const callback of callbacks) {
      callback(data);
    }
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key.toLowerCase());
  }

  getMousePos(): Vector2 {
    return { ...this.mousePos };
  }

  getTouchPos(): Vector2 | null {
    return this.touchPos ? { ...this.touchPos } : null;
  }

  destroy(): void {
    this.canvas.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.removeEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.removeEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.removeEventListener('click', (e) => this.handleClick(e));
    this.canvas.removeEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.removeEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.removeEventListener('touchend', (e) => this.handleTouchEnd(e));
    document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
    document.removeEventListener('keyup', (e) => this.handleKeyUp(e));
    this.callbacks.clear();
    this.keysPressed.clear();
  }
}
