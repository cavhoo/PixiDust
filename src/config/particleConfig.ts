/** Describes the properties of a single particle of the emitter. */
export interface ParticleConfig {
  /** Lifetime of a particle in ms. */
  lifeTime: number;
  /** Decayfactor describes how the lifetime is reduced per tick. Factor applied to delta time per frame. */
  decayFactor: number;
}
