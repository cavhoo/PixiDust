import type { Particle } from "../../particle/particle";
import type { Vector } from "../../types/vector";

/**
 * Base class for creating a zone for the particles to be influences by.
 * A zone differes from an environmental effect, as it has only a limited range
 * whereas an environmental effect always applies to all particles spawned.
 */
export abstract class Zone {
  protected _position: Vector;
  protected _size: Vector;


  constructor(position: Vector, size: Vector) {
    this._position = position;
    this._size = size;
  }

  public abstract affect(particle: Particle): void;
}
