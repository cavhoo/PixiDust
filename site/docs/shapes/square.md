---
sidebar_position: 3
---

# Square

Spawns particles in a rectangular shape around a given position.

The square shape is just like the `Circle` shape capable of spawning particles within it's
area or on the rim of the given square.

This shape can be useful if you want to highlight a box with some sparkles or make something
look like it's on fire.



## Usage

```typescript
const emitter = new PixiDustEmitter({
  //snip
  spawnShape: new Square(new Vector(20,20)),
})
```


## Parameters

The `Square` shape takes a `Vector` as the constructor argument, defining the `width` and `height` of the shape.  
The center of the square is the provided position of the emitter, in relation to the `particleContainer` 0,0.
