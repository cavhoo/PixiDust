import type { Particle } from "../particle/particle";
import type { Vector } from "../types/vector";
import { Environment } from "./environment";

export class Wind extends Environment {
  constructor(
    protected direction: Vector,
    protected strength: number = 0.5,
  ) {
    super();
  }
  public affect(particle: Particle): void {
    particle.applyForce(this.direction.multiply(this.strength));
  }

  public setWindDirection(direction: Vector): void {
    this.direction = direction;
  }

  public setWindStrength(strength: number): void {
    this.strength = strength;
  }
}
