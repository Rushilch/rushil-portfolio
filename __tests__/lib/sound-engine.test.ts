import { describe, it, expect, vi } from "vitest";
import { sound, BGM_TRACKS } from "@/lib/sound";

describe("Sound Engine & Audio State Observer", () => {
  it("allows components to subscribe to state changes and receive notifications", () => {
    const listener = vi.fn();
    const unsubscribe = sound.subscribe(listener);

    // Toggle SFX triggers state notification
    sound.toggleSfx();
    expect(listener).toHaveBeenCalled();

    // Toggle again
    sound.toggleSfx();
    expect(listener).toHaveBeenCalledTimes(2);

    // Unsubscribe removes listener
    unsubscribe();
    sound.toggleSfx();
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("toggles SFX enable state back and forth", () => {
    const initial = sound.enabled;
    const toggled = sound.toggleSfx();
    expect(toggled).toBe(!initial);

    const toggledBack = sound.toggleSfx();
    expect(toggledBack).toBe(initial);
  });

  it("subscribes and tracks BGM engine volume adjustments", () => {
    const bgmListener = vi.fn();
    const unsubscribe = sound.bgm.subscribe(bgmListener);

    sound.bgm.setVolume(0.5);
    expect(sound.bgm.volume).toBe(0.5);
    expect(bgmListener).toHaveBeenCalled();

    sound.bgm.setVolume(0.25);
    expect(sound.bgm.volume).toBe(0.25);

    unsubscribe();
  });

  it("cycles through multi-track BGM songs sequentially with nextTrack", () => {
    sound.bgm.setTrack(0);
    expect(sound.bgm.getCurrentTrack().id).toBe("iwatodai");
    expect(sound.bgm.getTrackName()).toBe("Iwatodai Night");

    const track1 = sound.bgm.nextTrack();
    expect(track1.id).toBe("memories");
    expect(track1.name).toBe("Memories of You");

    const track2 = sound.bgm.nextTrack();
    expect(track2.id).toBe("color-night");
    expect(track2.name).toBe("Color Your Night");

    const track3 = sound.bgm.nextTrack();
    expect(track3.id).toBe("burn-dread");
    expect(track3.name).toBe("Burn My Dread");

    // Cycles back to track 0
    const track0 = sound.bgm.nextTrack();
    expect(track0.id).toBe("iwatodai");
  });

  it("has valid chord frequencies in all synthesized BGM tracks", () => {
    expect(BGM_TRACKS.length).toBe(4);
    for (const track of BGM_TRACKS) {
      expect(track.chords.length).toBeGreaterThanOrEqual(4);
      expect(track.bpm).toBeGreaterThan(60);
      expect(track.intervalMs).toBeGreaterThan(300);
      for (const chord of track.chords) {
        expect(chord.bass).toBeGreaterThan(30);
        expect(chord.notes.length).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
