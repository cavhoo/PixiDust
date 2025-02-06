---
sidebar_position: 2
---

# Emitter

The emitter is the heart of the whole particle system here you define how your particles are going to behave,
be affected and how they should look like.


## PixiDustEmitter

The default implementation of the emitter base class, it contains the logic to spawn and handle the particle flow.

```typescript

import { Container } from "pixi.js";
import { PixiDustEmitter, ParticleConfig, Material, Vector, PixiDustParticle } from "pixidust";


const particleContainer = new Container();

const particleConfig: ParticleConfig = {
   lifetime: 300, // Lifetime in MS
   decayFactor: 3, // Decay per Tick
   startSize: new Vector(20,20), // Initial size in px
   material: {
     name: "default", // Name for material
     blendMode: "normal"  // Blend mode same as PIXI.BLEND_MODES
   }
};

const emitter = new PixiDustEmitter({
  particleConfig,
  maxParticleCount: 100, // How many particles are there
  spawnRate: 10, // Particles per second
  direction: Vector.UP, // Direction of the particles when spawning
  particleClass: PixiDustParticle, // The particle to spawn
  particleContainer, // The container the particles are spawned in
})

emitter.start(); // Start emitting particles

```



