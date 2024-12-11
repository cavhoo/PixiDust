import type { Vector } from "../../types/vector";

/**
 * Base class to determine the shape the particles should spawn
 * in.
 */
export abstract class Shape {
  public abstract getSpawnPos(): Vector;
}
