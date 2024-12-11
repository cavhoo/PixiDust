import { Application, Assets, Color, Container, Texture } from "pixi.js";
import {
  Gravity,
  PixiDustEmitter,
  PixiDustParticle,
  Tint,
  Vector,
  Wind,
} from "../src/index.ts";
import { Circle } from "../src/emitter/shapes/circle.ts";
import { Square } from "../src/emitter/shapes/square.ts";
import { Spot } from "../src/emitter/shapes/spot.ts";
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
      lifeTime: 180,
      decayFactor: 2,
      useAlphaDecay: true,
      alphaDecay: { from: 1, to: 0 },
      startSize: new Vector(20, 20),
      material: {
        color: "blue",
        texture: particleTexture,
        blendMode: "add-npm",
        name: "default",
      },
    },
    particleClass: PixiDustParticle,
    lifetime: 0,
    maxParticleCount: 1000,
    direction: new Vector(0, 0.1),
    spawnRate: 300,
    environments: [new Gravity({ force: new Vector(0, 0.2) })],
    modifiers: [
      new Tint(new Color([1.0, 0.1, 0.1]), new Color([0.8, 0.8, 0.0])),
    ],
    spawnShape: new Spot(), //new Circle(50), //new Square(new Vector(100, 100)),
    particleContainer,
  });

  emitter.position.set(1024 / 2, 500);
  emitter.start();
  app.stage.addChild(emitter, particleContainer);
  let totalTime = 0;
  app.ticker.add((ticker) => {
    totalTime += ticker.deltaTime;
    const y = 500;
    const x = Math.sin(totalTime) * 100 + 500;
    emitter.position.set(x, y);
    //wind.setWindDirection(new Vector(oszilation, 0));
  });
};

main();
