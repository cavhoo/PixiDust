import type { Container } from "pixi.js";
import type { Shape } from "../emitter/shapes/shape";
import type { Particle } from "../particle/particle";
import type { Constructable } from "../types/constructable";
import { Vector } from "../types/vector";
import type { ParticleConfig } from "./particleConfig";

/** Configuration for an emitter. */
export interface EmitterConfig {
  /** Configuration for each particle spawned by the emitter. */
  readonly particleConfig: ParticleConfig;
  /** The direction the emitter should start emitting particles in. */
  readonly direction: Vector;
  /** The total maximum amount of particles being rendered. */
  readonly maxParticleCount: number;
  /** Spawn rate per 1000ms. */
  readonly spawnRate: number;
  /** Lifetime of the emitter in milliseconds. */
  readonly lifetime: number;
  /** The particle that the emitter should create. */
  readonly particleClass: Constructable<Particle>;
  /** Define the shape the particles should spawn in. Default: Spot. */
  readonly spawnShape?: Shape;
  /** Optional container to add the particles to. */
  readonly particleContainer?: Container;
}
