"use client";

// Web Audio API Synthesizer for Persona 3 / Persona 3 Reload SFX & Neo-Soul BGM
// 100% synthesized in-browser, 0 external audio assets needed, instant response!

class PersonaBgmEngine {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  private timerId: any = null;
  private masterGain: GainNode | null = null;
  public volume: number = 0.25;
  private step: number = 0;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Persona 3 inspired Neo-Soul / Acid Jazz chord progression
  // Chords: Dm9 -> G13 -> Cmaj9 -> A7#9 (Iwatodai / Paulownia Mall / Tartarus Chill vibe)
  private chords = [
    // Dm9 (D, F, A, C, E)
    { bass: 73.42, notes: [293.66, 349.23, 440.0, 523.25, 659.25] },
    // G13 (G, F, B, E)
    { bass: 98.0, notes: [349.23, 493.88, 659.25, 783.99] },
    // Cmaj9 (C, E, G, B, D)
    { bass: 65.41, notes: [261.63, 329.63, 392.0, 493.88, 587.33] },
    // A7alt (A, G, C#, F)
    { bass: 110.0, notes: [392.0, 554.37, 698.46, 880.0] },
  ];

  public toggleBgm(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  public start() {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.step = 0;

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chordIndex = Math.floor(this.step / 4) % this.chords.length;
      const chord = this.chords[chordIndex];
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

          // Subtle detune for lush vintage chorus
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

    // 85 BPM Lo-Fi tempo (approx 350ms per sixteenth/quarter step)
    this.timerId = setInterval(playChordStep, 450);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public bgm = new PersonaBgmEngine();

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
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
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime); // C6
      osc.frequency.exponentialRampToValueAtTime(1567.98, this.ctx.currentTime + 0.035); // G6

      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch (e) {}
  }

  // Persona 3 Reload selection chime (satisfying futuristic double-pulse)
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

      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6

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
    } catch (e) {}
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
    } catch (e) {}
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
    } catch (e) {}
  }
}

export const sound = new SoundEngine();
