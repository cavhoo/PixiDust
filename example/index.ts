import { Application, Assets, Color, Container, Texture } from "pixi.js";
import {
  gaussianRandom,
  Gravity,
  PixiDustEmitter,
  PixiDustParticle,
  Tint,
  Vector,
  Wind,
} from "../src/index.ts";
import { Kill } from "../src/effects/zones/kill.ts";
import { Spot } from "../src/emitter/shapes/spot.ts";
import { Circle } from "../src/emitter/shapes/circle.ts";
const main = async () => {
  const app = new Application();

  await app.init({
    width: 1024,
    height: 768,
  });

  const particleTexture = await Assets.load<Texture>(
    "example/assets/particle.png",
  );

  (globalThis as any).__PIXI_APP__ = app;

  const particleContainer = new Container();
  document.body.appendChild(app.canvas);
  const wind = new Wind(new Vector(-5, 0), 0.01);
  // Create particle Emitter
  const emitter = new PixiDustEmitter({
    particleConfig: {
      lifeTime: 100,
      decayFactor: 3,
      useAlphaDecay: true,
      alphaDecay: { from: 1, to: 0 },
      startSize: new Vector(20, 20),
      material: {
        color: "pink",
        texture: particleTexture,
        blendMode: "normal",
        name: "default",
      },
    },
    particleClass: PixiDustParticle,
    lifetime: 0,
    maxParticleCount: 10000,
    direction: () => new Vector(0, -10),
    spawnRate: 1000,
    environments: [new Gravity({ force: new Vector(0, 0.2) })],
    modifiers: [
      new Tint(new Color([1.0, 0.1, 0.1]), new Color([0.8, 0.8, 0.0])),
    ],
    particleContainer,
    spawnShape: new Circle(30),
    zones: [new Kill(new Vector(100, 100), new Vector(100, 100))],
  });

  emitter.position.set(1024 / 2, 768 / 2);
  emitter.start();
  app.stage.addChild(emitter, particleContainer);
  let totalTime = 0;
  app.ticker.add((ticker) => {
    totalTime += ticker.deltaTime;
    const y = 500;
    const x = Math.sin(totalTime) * 100 + 500;
    // emitter.position.set(x, y);
    //wind.setWindDirection(new Vector(oszilation, 0));
  });
};

main();
