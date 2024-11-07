import { Container, type ContainerOptions } from "pixi.js";

export interface IEmitterOptions extends ContainerOptions {
  particleCount: number;
}

/** Abstract base class for an emitter. Use this if you want to customize the behavior. */
export abstract class Emitter extends Container {
  protected particleCount: number = 1;
  constructor({ particleCount, ...rest }: IEmitterOptions) {
    super({ ...rest });
    this.particleCount = particleCount;
  }
  protected createParticles(): void {}
  public abstract start(): void;
  protected tick(): void {}
}

/** The class that can emit the particles. */
export class PixiDustEmitter extends Emitter {
  constructor(options: IEmitterOptions) {
    super(options);

    console.log("Hello from PixiDust");
  }

  public start(): void {
    throw new Error("Method not implemented.");
  }
}
