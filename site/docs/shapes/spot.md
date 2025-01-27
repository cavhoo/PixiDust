---
sidebar_position: 1
---

# Spot

Spawns particles on a given position.

This is the most basic shape you can spawn particles in, a singular point will be  
the origin of each particle that then move away in the direction provided for the emitter.

## Usage

The `Spot` shape has no additional parameters as it's just a point in the 2D space.
Hence it's the easiest to use when starting out with particles.

```typescript

const emitter = new PixiDustEmitter({
  // snip
  spawnShape: new Spot();
})

```
