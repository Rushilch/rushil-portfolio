"use client";

// Web Audio API Synthesizer for Persona 3 / Persona 3 Reload SFX & Neo-Soul BGM
// 100% synthesized in-browser, 0 external audio assets needed, instant response!

type AudioStateListener = () => void;

export interface BgmTrack {
  id: string;
  name: string;
  subtitle: string;
  bpm: number;
  intervalMs: number;
  chords: { bass: number; notes: number[] }[];
}

export const BGM_TRACKS: BgmTrack[] = [
  {
    id: "iwatodai",
    name: "Iwatodai Night",
    subtitle: "Neo-Soul Rhodes & Sub-Bass",
    bpm: 85,
    intervalMs: 450,
    // Dm9 -> G13 -> Cmaj9 -> A7#9
    chords: [
      { bass: 73.42, notes: [293.66, 349.23, 440.0, 523.25, 659.25] },
      { bass: 98.0, notes: [349.23, 493.88, 659.25, 783.99] },
      { bass: 65.41, notes: [261.63, 329.63, 392.0, 493.88, 587.33] },
      { bass: 110.0, notes: [392.0, 554.37, 698.46, 880.0] },
    ],
  },
  {
    id: "memories",
    name: "Memories of You",
    subtitle: "Gentle Melodic Progression",
    bpm: 78,
    intervalMs: 480,
    // Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    chords: [
      { bass: 87.31, notes: [349.23, 440.0, 523.25, 659.25] },
      { bass: 82.41, notes: [329.63, 392.0, 493.88, 587.33] },
      { bass: 73.42, notes: [293.66, 349.23, 440.0, 523.25] },
      { bass: 65.41, notes: [261.63, 329.63, 392.0, 493.88] },
    ],
  },
  {
    id: "color-night",
    name: "Color Your Night",
    subtitle: "Smooth Jazz Lo-Fi",
    bpm: 90,
    intervalMs: 420,
    // Am9 -> D9 -> Gmaj9 -> Cmaj7
    chords: [
      { bass: 110.0, notes: [330.0, 392.0, 493.88, 587.33] },
      { bass: 73.42, notes: [293.66, 369.99, 440.0, 523.25] },
      { bass: 98.0, notes: [293.66, 392.0, 493.88, 587.33] },
      { bass: 65.41, notes: [261.63, 329.63, 392.0, 493.88] },
    ],
  },
  {
    id: "burn-dread",
    name: "Burn My Dread",
    subtitle: "Rhythmic Ambient Sub-Bass",
    bpm: 95,
    intervalMs: 395,
    // Em9 -> Cmaj7 -> Am9 -> B7#9
    chords: [
      { bass: 82.41, notes: [330.0, 392.0, 493.88, 587.33] },
      { bass: 65.41, notes: [261.63, 329.63, 392.0, 493.88] },
      { bass: 110.0, notes: [330.0, 392.0, 440.0, 523.25] },
      { bass: 123.47, notes: [370.0, 466.16, 587.33, 740.0] },
    ],
  },
];

class PersonaBgmEngine {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private masterGain: GainNode | null = null;
  public volume: number = 0.25;
  private step: number = 0;
  public currentTrackIndex: number = 0;
  private listeners: Set<AudioStateListener> = new Set();

  public subscribe(fn: AudioStateListener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public notify() {
    this.listeners.forEach((fn) => fn());
  }

  public getCurrentTrack(): BgmTrack {
    return BGM_TRACKS[this.currentTrackIndex] || BGM_TRACKS[0];
  }

  public getTrackName(): string {
    return this.getCurrentTrack().name;
  }

  public nextTrack(): BgmTrack {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % BGM_TRACKS.length;
    this.step = 0;
    if (this.isPlaying) {
      this.stop();
      this.start();
    } else {
      this.start();
    }
    this.notify();
    return this.getCurrentTrack();
  }

  public setTrack(index: number) {
    if (index >= 0 && index < BGM_TRACKS.length) {
      this.currentTrackIndex = index;
      this.step = 0;
      if (this.isPlaying) {
        this.stop();
        this.start();
      }
      this.notify();
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const AudioCtx = win.AudioContext || win.webkitAudioContext;
      if (AudioCtx) {
        const context = new AudioCtx();
        this.ctx = context;
        const gain = context.createGain();
        gain.gain.setValueAtTime(this.volume, context.currentTime);
        gain.connect(context.destination);
        this.masterGain = gain;
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  public toggleBgm(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    this.notify();
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    this.notify();
  }

  public start() {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.step = 0;
    this.notify();

    const track = this.getCurrentTrack();

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const currentTrack = this.getCurrentTrack();
      const chordIndex = Math.floor(this.step / 4) % currentTrack.chords.length;
      const chord = currentTrack.chords[chordIndex];
      const now = this.ctx.currentTime;
      const beatInChord = this.step % 4;

      // Play Electric Piano / Rhodes chord pulse
      if (beatInChord === 0 || beatInChord === 2) {
        chord.notes.forEach((freq, idx) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime((idx - 2) * 4, now);

          const baseGain = 0.035;
          gain.gain.setValueAtTime(baseGain, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 1.6);
        });
      }

      // Play Smooth Sub-Bass
      if (beatInChord === 0 || beatInChord === 3) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(beatInChord === 3 ? chord.bass * 1.5 : chord.bass, now);

        bassGain.gain.setValueAtTime(0.09, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + 0.8);
      }

      // Play Lo-Fi Vinyl / Soft Hi-Hat Tap
      const noise = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();
      noise.type = "square";
      noise.frequency.setValueAtTime(beatInChord % 2 === 0 ? 3000 : 4500, now);
      noiseGain.gain.setValueAtTime(0.008, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      noise.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(now);
      noise.stop(now + 0.04);

      this.step++;
    };

    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(playChordStep, track.intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public bgm = new PersonaBgmEngine();
  private listeners: Set<AudioStateListener> = new Set();

  public subscribe(fn: AudioStateListener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public notify() {
    this.listeners.forEach((fn) => fn());
  }

  public toggleSfx(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) this.playSelect();
    this.notify();
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const AudioCtx = win.AudioContext || win.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  // Persona 3 menu hover tick (crisp metallic click)
  public playHover() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1567.98, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Persona 3 Reload selection chime
  public playSelect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "triangle";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);

      osc2.frequency.setValueAtTime(880, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.18);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Persona 3 menu switch swoosh
  public playMenuSwitch() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Persona 3 back/cancel sound
  public playCancel() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio autoplay policy catch
    }
  }
}

export const sound = new SoundEngine();
