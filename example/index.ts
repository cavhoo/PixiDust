import { Application, Container } from "pixi.js";
import { PixiDustEmitter } from "../src/index.ts";
import { Vector } from "../src/types/vector.ts";
import { Gravity } from "../src/environment/gravity.ts";

const main = async () => {
  const app = new Application();

  await app.init({
    width: 1024,
    height: 768,
  });

  (globalThis as any).__PIXI_APP__ = app;

  document.body.appendChild(app.canvas);
  // Create particle Emitter
  const emitter = new PixiDustEmitter({
    particleConfig: {
      lifeTime: 255,
      decayFactor: 15,
    },
    maxParticleCount: 10,
    direction: new Vector(0, 1),
    spawnRate: 5,
    startVelocity: 5,
    environments: [new Gravity({ force: new Vector(0, -2) })],
  });

  emitter.position.set(1024 / 2, 768 / 2);
  emitter.start();
  app.stage.addChild(emitter);
};

main();
