import type { Particle } from "../particle/particle";
import { Vector } from "../types/vector";
import { Environment } from "./environment";

export interface GravityConfig {
  force: Vector;
}

/**
 * Environment modifier gravity, applies a certain force to all particles
 * regardless of position or distance to the edges.
 */
export class Gravity extends Environment {
  protected force: Vector;
  constructor({ force }: GravityConfig) {
    super();
    this.force = force;
  }

  public affect(particle: Particle): void {
    particle.applyForce(this.force);
  }
}
