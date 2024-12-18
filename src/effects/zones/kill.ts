import type { Particle } from "../../particle/particle";
import { Zone } from "./zone";

export class Kill extends Zone {
  public affect(particle: Particle): void {
    const particlePosition = particle.position;
    const insideHorizontal = this._position.x < particlePosition.x && this._position.x + this._size.x > particlePosition.x;
    const insideVertical = this._position.y < particlePosition.y && this._position.y + this._size.y > particlePosition.y;

    console.log(insideHorizontal, insideVertical)
    if (insideHorizontal && insideVertical) {
      particle.kill();
    }
  }
}
