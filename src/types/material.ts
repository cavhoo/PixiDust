import type { BLEND_MODES, Graphics, Sprite, Texture } from "pixi.js";

export interface Material {
  /** The face of the particle */
  readonly color?: string;
  /** The texture of the particle. Overwrites the color. */
  readonly texture?: Texture;
  /** Name of the material. Used to swap between different materials. */
  readonly name: string;

  readonly blendMode: BLEND_MODES;
}
