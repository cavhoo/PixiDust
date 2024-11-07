import { Container, type ContainerOptions } from "pixi.js";

export interface IParticleOptions extends ContainerOptions {}

/** Base class for a single parameter defines boundaries and traits this particle has. */
export abstract class Particle extends Container {
  constructor({ ...rest }: IParticleOptions) {
    super(rest);
  }
}
