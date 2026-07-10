// Audio Manager - Sound effects and music

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterVolume: number = 0.5;
  private sfxVolume: number = 0.7;
  private musicVolume: number = 0.3;
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.initialized = true;
    } catch (err) {
      console.warn('Web Audio API not supported:', err);
    }
  }

  // Procedurally generate attack sound
  playAttackSound(unitType: string, volume: number = 1): void {
    if (!this.audioContext || this.audioContext.state === 'suspended') return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const baseFreq = this.getUnitFrequency(unitType);
    oscillator.frequency.setValueAtTime(baseFreq, now);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.1);

    gainNode.gain.setValueAtTime(volume * this.sfxVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // Procedurally generate damage sound
  playDamageSound(volume: number = 1): void {
    if (!this.audioContext || this.audioContext.state === 'suspended') return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);

    gainNode.gain.setValueAtTime(volume * this.sfxVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    oscillator.start(now);
    oscillator.stop(now + 0.15);
  }

  // Procedurally generate unit summon sound
  playSummonSound(volume: number = 1): void {
    if (!this.audioContext || this.audioContext.state === 'suspended') return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.linearRampToValueAtTime(880, now + 0.2);

    gainNode.gain.setValueAtTime(volume * this.sfxVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  // Procedurally generate click sound
  playClickSound(volume: number = 0.3): void {
    if (!this.audioContext || this.audioContext.state === 'suspended') return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gainNode.gain.setValueAtTime(volume * this.sfxVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  // Procedurally generate spell sound
  playSpellSound(spellType: string, volume: number = 1): void {
    if (!this.audioContext || this.audioContext.state === 'suspended') return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const baseFreq = this.getSpellFrequency(spellType);
    oscillator.frequency.setValueAtTime(baseFreq, now);
    oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + 0.3);

    gainNode.gain.setValueAtTime(volume * this.sfxVolume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  private getUnitFrequency(unitType: string): number {
    const frequencies: { [key: string]: number } = {
      swordwrath: 400,
      archidon: 500,
      spearton: 350,
      magikill: 600,
      giant: 200,
      miner: 450,
    };
    return frequencies[unitType] || 400;
  }

  private getSpellFrequency(spellType: string): number {
    const frequencies: { [key: string]: number } = {
      heal: 800,
      freeze: 600,
      bomb: 300,
      rage: 700,
      poison: 500,
    };
    return frequencies[spellType] || 600;
  }

  setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  resumeAudioContext(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
