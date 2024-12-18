import type { Particle } from "../../particle/particle";

/**
 * Base class for creating a zone for the particles to be influences by.
 * A zone differes from an environmental effect, as it has only a limited range
 * whereas an environmental effect always applies to all particles spawned.
 */
export abstract class Zone {
  public affect(particle: Particle): void {}
}
