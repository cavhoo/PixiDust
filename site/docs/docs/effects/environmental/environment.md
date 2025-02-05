# Environmental Effects

You can also add environmental effects to your particle emitter, there effects are applied
all the time the particle is alive and have no range.

## Wind

The wind environmental effect as the name suggest applies a directional force onto the particle, 

```typescript
const emitter = new PixiDustEmitter({
  //snip
  spawnShape: new Circle(30),
  environments: [new Wind(Vector.UP, 3)],
})


```

## Gravity

As the name suggest this effect will apply a constant down force to your particle.

```typescript

const emitter = new PixiDustEmitter({
  //snip
  spawnShape: new Circle(30),
  environments: [new Gravity({ force: new Vector(0, 0.5) })],
})

```

