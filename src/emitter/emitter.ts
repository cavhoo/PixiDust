import { Container, Ticker, type ContainerOptions } from "pixi.js";
import { Particle, PixiDustParticle } from "../particle/particle";
import type { EmitterConfig } from "../config/emitterConfig";
import type { ParticleConfig } from "../config/particleConfig";
import type { Environment } from "../environment/environment";
import type { Modifier } from "../modifiers/modifer";

export interface EmitterOptions extends EmitterConfig, ContainerOptions {
  environments?: Environment[];
  modifiers?: Modifier[];
}

/** Abstract base class for an emitter. Use this if you want to customize the behavior. */
export abstract class Emitter extends Container {
  protected maxParticleCount: number = 1;
  protected ticker: Ticker;
  protected particles: Particle[] = [];
  protected emitting: boolean = false;
  protected particleConfig: ParticleConfig;
  protected direction: [number, number];
  protected startVelocity: number;
  protected spawnRate: number = 0;
  protected timeSinceLastSpawn: number = 0;

  protected environments: Environment[] = [];
  protected modifiers: Modifier[] = [];

  constructor({
    particleConfig,
    maxParticleCount,
    direction,
    startVelocity,
    environments,
    modifiers,
    spawnRate,
    ...rest
  }: EmitterOptions) {
    super(rest);
    this.ticker = Ticker.shared;
    this.maxParticleCount = maxParticleCount;
    this.particleConfig = particleConfig;
    this.direction = direction;
    this.startVelocity = startVelocity;
    this.environments = environments || [];
    this.modifiers = modifiers || [];
    this.spawnRate = spawnRate;
    this.ticker.add((deltaTime) => this.tick(deltaTime));
  }
  /** Creates the particles for this emitter. */
  protected abstract spawnParticle(): void;
  /** Start the emitter, which in turn starts the emitting of particles. */
  public abstract start(): void;
  /** Gets called once per frame to update the particles. */
  protected abstract tick(ticker: Ticker): void;
}

/** The class that can emit the particles. */
export class PixiDustEmitter extends Emitter {
  constructor(options: EmitterOptions) {
    super(options);
    this.label = "PixiDustEmitter";
    console.log("Hello from PixiDust");
  }

  public start(): void {
    this.emitting = true;
  }

  protected spawnParticle(): void {
    if (this.particles.length < this.maxParticleCount) {
      const p = new Particle({ ...this.particleConfig });
      this.particles.push(p);
      this.addChild(p);
    } else {
      const deadParticle = this.particles.find((p) => p.isDead());
      if (deadParticle) {
        deadParticle.spawn();
      }
    }
  }

  protected tick(ticker: Ticker): void {
    if (this.emitting) {
      const spawnTime = 1000 / this.spawnRate;
      this.timeSinceLastSpawn += ticker.elapsedMS;

      if (this.timeSinceLastSpawn > spawnTime) {
        this.spawnParticle();
        this.timeSinceLastSpawn = 0;
      }

      this.particles.forEach((particle) => {
        this.environments.forEach((environment) =>
          environment.affect(particle),
        );
        particle.tick(ticker);
      });
    }
  }
}
