import {
  Container,
  EventEmitter,
  Graphics,
  nextPow2,
  Ticker,
  type ContainerOptions,
} from "pixi.js";
import { Particle, ParticleEvents } from "../particle/particle";
import type { EmitterConfig } from "../config/emitterConfig";
import type { Environment } from "../environment/environment";
import type { Modifier } from "../modifiers/modifer";
import { Vector } from "../types/vector";
import { gaussianRandom } from "../functions/randoms";
import { Spot } from "./shapes/spot";

export interface EmitterOptions extends EmitterConfig, ContainerOptions {
  environments?: Environment[];
  modifiers?: Modifier[];
}

export enum EmitterEvents {
  Start = "start",
  Stop = "stop",
}

/** Abstract base class for an emitter. Use this if you want to customize the behavior. */
export abstract class Emitter extends Container {
  protected ticker: Ticker;
  protected particles: Particle[] = [];
  protected emitting: boolean = false;
  protected timeSinceLastSpawn: number = 0;

  protected environments: Environment[] = [];
  protected modifiers: Modifier[] = [];
  protected config: EmitterConfig;

  constructor({
    particleConfig,
    maxParticleCount,
    direction,
    environments,
    modifiers,
    spawnRate,
    lifetime,
    particleClass,
    particleContainer,
    spawnShape,
    ...rest
  }: EmitterOptions) {
    super(rest);
    this.config = {
      particleClass,
      maxParticleCount,
      spawnRate,
      particleConfig,
      direction,
      lifetime,
      spawnShape: spawnShape ?? new Spot(),
      particleContainer: particleContainer ?? this,
    };
    this.ticker = Ticker.shared;
    this.environments = environments || [];
    this.modifiers = modifiers || [];
    this.ticker.add((deltaTime) => this.tick(deltaTime));
  }
  /** Creates the particles for this emitter. */
  protected abstract spawnParticle(): void;
  /** Start the emitter, which in turn starts the emitting of particles. */
  public abstract start(): void;
  /** Gets called once per frame to update the particles. */
  protected abstract tick(ticker: Ticker): void;

  /** Register an event listener to the emitter. */
  public onEvent(event: EmitterEvents | ParticleEvents, callback: () => void) {
    this.on(event, callback);
  }
}

/** The class that can emit the particles. */
export class PixiDustEmitter extends Emitter {
  constructor(options: EmitterOptions) {
    super(options);
    this.label = "PixiDustEmitter";
    const debug = new Graphics().rect(0, 0, 20, 20).fill(0xff00ff);
    // this.addChild(debug);
  }

  public start(): void {
    this.emitting = true;
  }

  public stop(): void {
    this.emitting = false;
  }

  protected spawnParticle(): void {
    const { maxParticleCount } = this.config;
    const direction = new Vector(
      gaussianRandom(0, 0.3),
      gaussianRandom(-1, 0.3),
    );
    if (this.particles.length < maxParticleCount) {
      const { particleConfig } = this.config;

      const p = new this.config.particleClass({
        ...particleConfig,
        direction,
      });
      const nextSpawn = this.config.spawnShape!.getSpawnPos();
      p.position.set(
        this.position.x + nextSpawn.x,
        this.position.y + nextSpawn.y,
      );
      this.particles.push(p);
      this.config.particleContainer!.addChild(p);
    } else {
      const deadParticle = this.particles.find((p) => p.isDead());
      if (deadParticle) {
        const nextSpawn = this.config.spawnShape!.getSpawnPos();
        this.emit(ParticleEvents.Died, deadParticle);
        deadParticle.spawn(direction);
        deadParticle.position.set(
          this.position.x + nextSpawn.x,
          this.position.y + nextSpawn.y,
        );
      }
    }
  }

  protected tick(ticker: Ticker): void {
    const { spawnRate } = this.config;
    if (this.emitting) {
      const spawnTime = 1000 / spawnRate;
      this.timeSinceLastSpawn += ticker.elapsedMS;

      if (this.timeSinceLastSpawn > spawnTime) {
        this.spawnParticle();
        this.timeSinceLastSpawn = 0;
      }

      this.particles.forEach((particle) => {
        // Apply environmental effects to the particle;
        this.environments.forEach((environment) =>
          environment.affect(particle),
        );

        // Apply modifier effects to the particle;
        this.modifiers.forEach((modifier) => modifier.apply(particle));
        particle.tick(ticker);
      });
    }
  }
}
