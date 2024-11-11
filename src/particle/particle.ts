import {
  Container,
  Graphics,
  Ticker,
  type ContainerChild,
  type ContainerOptions,
} from "pixi.js";
import type { ParticleConfig } from "../config/particleConfig";
import { Vector } from "../types/vector";

export interface ParticleOptions extends ContainerOptions, ParticleConfig {}

/** Base class for a single parameter defines boundaries and traits this particle has. */
export class Particle extends Container {
  protected lifeTime: number = 0;
  protected decayFactor: number;
  protected currentLifeTime: number = 0;

  protected acceleration: Vector = new Vector(0, 0);
  protected velocity: Vector = new Vector(0, 0);
  protected direction: Vector = new Vector(0, 0);

  constructor({ lifeTime, decayFactor, ...rest }: ParticleOptions) {
    super(rest);
    this.lifeTime = lifeTime;
    this.currentLifeTime = lifeTime;
    this.decayFactor = decayFactor;
    this.addChild(new Graphics().rect(0, 0, 20, 20).fill(0xff0000));
  }

  public spawn() {
    this.position.set(0, 0);
    this.velocity.multiplyBy(0);
    this.currentLifeTime = this.lifeTime;
  }

  public applyForce(force: Vector): void {
    this.acceleration = this.acceleration.add(force);
  }

  public tick(ticker: Ticker): void {
    this.velocity = this.velocity.add(this.acceleration);
    this.position.set(
      this.velocity.x + this.position.x,
      this.velocity.y + this.position.y,
    );
    this.currentLifeTime -= this.decayFactor;
    this.acceleration = this.acceleration.multiply(0);
  }

  public isDead(): boolean {
    return this.currentLifeTime < 0.0;
  }
}

export class PixiDustParticle extends Particle {}
