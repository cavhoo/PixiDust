import { Color } from "pixi.js";
import { Modifier } from "./modifer";
import type { Particle } from "../particle/particle";

export class Tint extends Modifier {
  protected colorDelta: Color;
  constructor(
    protected from: Color,
    protected to: Color,
  ) {
    super();
    this.colorDelta = new Color([
      to.red - from.red,
      to.green - from.green,
      to.blue - from.blue,
    ]);
  }
  public apply(particle: Particle): void {
    particle.tint = new Color([
      this.from.red + this.colorDelta.red * particle.progress,
      this.from.green + this.colorDelta.green * particle.progress,
      this.from.blue + this.colorDelta.blue * particle.progress,
    ]);
  }
}
