/** Abstract base class for an emitter. Use this if you want to customize the behavior. */
export abstract class Emitter {
  public abstract start(): void;
}

/** The class that can emit the particles. */
export class PixiDustEmitter extends Emitter {
  constructor() {
    super();
  }

  public start(): void {
    throw new Error("Method not implemented.");
  }
}
