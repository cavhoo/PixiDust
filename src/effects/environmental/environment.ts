import type { Particle } from "../../particle/particle";

export abstract class Environment {
  public abstract affect(particle: Particle): void;
}
