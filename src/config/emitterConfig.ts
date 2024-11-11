import { Vector } from "../types/vector";
import type { ParticleConfig } from "./particleConfig";

/** Configuration for an emitter. */
export interface EmitterConfig {
  /** Configuration for each particle spawned by the emitter. */
  readonly particleConfig: ParticleConfig;
  /** The direction the emitter should start emitting particles in. */
  readonly direction: Vector;
  /** The start velocity of a particle when being emitted. */
  readonly startVelocity: number;
  /** The total maximum amount of particles being rendered. */
  readonly maxParticleCount: number;
  /** Spawn rate per 1000ms. */
  readonly spawnRate: number;
}
