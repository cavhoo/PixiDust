import type { Material } from "../types/material";
import type { FromTo } from "../types/transforms";
import type { Vector } from "../types/vector";

/** Describes the properties of a single particle of the emitter. */
export interface ParticleConfig {
  /** Lifetime of a particle in ms. */
  readonly lifeTime: number;
  /** Decayfactor describes how the lifetime is reduced per tick. Factor applied to delta time per frame. */
  readonly decayFactor: number;
  /** Alpha decay, fades out the particle if true.*/
  readonly useAlphaDecay?: boolean;
  /** Values for alpha decay. If useAlphaDecay is true and value is omitted, alpha will fade from 1 to 0. */
  readonly alphaDecay?: FromTo;
  /** Material used for the particle. */
  readonly material: Material;
  /** Size of the particle at spawn time. */
  readonly startSize: Vector;
}
