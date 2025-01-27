---
slug: /
sidebar_position: 1
---

# Getting started 


## Requirements

You don't need a lot to use this library, it's made with as little depedencies as possible.
So the only hard requirement is an installation of pixi.js in v8 or later.


## Installation

Using any package manager that can install npm packages.


With npm:
```bash
npm install pixidust
```

With yarn:

```bash
yarn add pixidust
```

With bun:
```bash
bun add pixidust
```

## Usage

Basic usage to create an emitter:
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

## Advanced options
