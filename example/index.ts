import { Application, Assets, Color, Graphics, Texture } from "pixi.js";
import {
  Gravity,
  ParticleEvents,
  PixiDustEmitter,
  PixiDustParticle,
  Tint,
  Vector,
  Wind,
} from "../src/index.ts";
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

  document.body.appendChild(app.canvas);
  const wind = new Wind(new Vector(-2, -0.5), 0.01);
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
    environments: [new Gravity({ force: new Vector(0, -0.03) }), wind],
    modifiers: [
      new Tint(new Color([0.8, 0.1, 0.3]), new Color([0.8, 0.8, 0.0])),
    ],
  });

  emitter.position.set(1024 / 2, 500);
  emitter.start();
  app.stage.addChild(emitter);

  let totalTime = 0;
  app.ticker.add((ticker) => {
    totalTime += ticker.deltaTime;
    const oszilation = Math.sin(totalTime / 10);
    wind.setWindDirection(new Vector(oszilation, 0));
  });
};

main();
