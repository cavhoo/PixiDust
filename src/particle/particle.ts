import {
  Container,
  Graphics,
  Sprite,
  Texture,
  Ticker,
  type ColorSource,
  type ContainerOptions,
} from "pixi.js";
import type { ParticleConfig } from "../config/particleConfig";
import { Vector } from "../types/vector";
import type { Material } from "../types/material";

export interface ParticleOptions extends ContainerOptions, ParticleConfig {
  direction: Vector;
}

export enum ParticleEvents {
  Spawn = "spawn",
  Died = "died",
}

/** Base class for a single parameter defines boundaries and traits this particle has. */
export class Particle extends Container {
  protected lifeTime: number = 0;
  protected decayFactor: number;
  protected currentLifeTime: number = 0;

  protected acceleration: Vector = new Vector(0, 0);
  protected velocity: Vector = new Vector(0, 0);
  protected direction: Vector = new Vector(0, 0);

  protected config: ParticleConfig;

  protected _particleTexture!: Container;

  constructor({
    lifeTime,
    decayFactor,
    useAlphaDecay,
    alphaDecay,
    direction,
    material,
    startSize,
    ...rest
  }: ParticleOptions) {
    super(rest);

    this.config = {
      lifeTime,
      decayFactor,
      useAlphaDecay,
      material,
      startSize,
      alphaDecay,
    };

    this.lifeTime = lifeTime;
    this.currentLifeTime = lifeTime;
    this.decayFactor = decayFactor;
    this.direction = direction;
    this.blendMode = material.blendMode;
    this.addChild(this.createParticle());
  }

  protected createParticle(): Sprite | Graphics {
    const { texture, color } = this.config.material;
    let p;
    if (texture) {
      p = new Sprite(texture);
    } else if (color) {
      p = new Graphics().circle(0, 0, 10).fill(color ?? "pink");
    }

    if (!p) {
      throw new Error("No valid particle style");
    }

    p.setSize(this.config.startSize.x, this.config.startSize.y);
    this._particleTexture = p;
    this.applyMaterial(this.config.material);
    return p;
  }

  protected applyMaterial(material: Material): void {
    if (material.color) {
      this._particleTexture.tint = material.color;
    }
  }

  public spawn(newDirection: Vector): void {
    const { alphaDecay, useAlphaDecay } = this.config;
    this.renderable = true;
    this.position.set(0, 0);
    this.alpha = useAlphaDecay && alphaDecay ? alphaDecay.from : 1;
    this.direction = newDirection;
    this.velocity.multiplyBy(0);
    this.currentLifeTime = this.lifeTime;
    this.acceleration = this.acceleration.multiply(0);
  }

  public applyForce(force: Vector): void {
    this.acceleration = this.acceleration.add(force);
  }

  public override set tint(val: ColorSource) {
    this._particleTexture.tint = val;
  }

  public override get tint(): number {
    return this._particleTexture.tint;
  }

  public get progress(): number {
    return 1 - this.currentLifeTime / this.lifeTime;
  }

  public tick(ticker: Ticker): void {
    if (this.isDead()) {
      this.renderable = false;
      return;
    }
    this.velocity = this.velocity.add(this.acceleration);
    this.position.set(
      this.velocity.x + this.position.x + this.direction.x,
      this.velocity.y + this.position.y + this.direction.y,
    );
    this.currentLifeTime -= this.decayFactor;
    if (this.config.useAlphaDecay) {
      const { alphaDecay } = this.config;
      if (alphaDecay) {
        const delta = alphaDecay.to - alphaDecay.from;
        this.alpha =
          this.alpha > alphaDecay.to
            ? alphaDecay.from + delta * this.progress
            : alphaDecay.to;
      } else {
        this.alpha = this.progress;
      }
    }

    this.acceleration = this.acceleration.multiply(0);
  }

  public isDead(): boolean {
    return this.currentLifeTime < 0.0;
  }
}

export class PixiDustParticle extends Particle {}
