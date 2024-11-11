import type { Particle } from "../particle/particle";

/**
 * Base class for all particle modifiers.
 * Modifiers are appliying effects to particles that are based
 * on distnace, state of the particle and other factors. Unlike
 * Environments these modifers are regional as they have a size and
 * a range attached to them.
 */
export abstract class Modifier {
  public abstract apply(particle: Particle): void;
}
