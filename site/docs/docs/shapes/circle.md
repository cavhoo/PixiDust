---
sidebar_position: 2
---

# Circle

Spawns particles in a circular pattern around a given position.

The circle shape provides you with the possibilty to have particles spawn in a circular  
shape. This can either be only on the rim of the circle or on the whole area of the given  
circle shape.

This is useful if you want to create effects like fires, welding points or anything where the particles  
should be more spread out.

## Usage

```typescript

const emitter = new PixiDustEmitter({
  //snip
  spawnShape: new Circle(30),
})

```


## Parameters

The `Circle` shape only has one constructor parameter which is it's radius in pixel.
The radius is taken from the center of the provided emitter position in relation to the particles container 0,0.
