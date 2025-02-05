---
sidebar_position: 1
---

# Killzone 

A `Killzone` is like the name suggest an area in which the particle get's marked as dead  
once it enters the boundary of the zone.

This can be used to kill particles when they leave the screen area, or if they hit a certain area.

## Usage

```typescript
  const emitter = new PixiDustEmitter({
     // snip
	 zones: [
	   new Kill(new Vector(100, 100), new Vector(100, 100)),
	 ]
  })

```

A `Kill`-Zone is defined by creating a new object in the Zones array of the emitter,
since these Zones are only virtual you can use the same Zone on multiple Emitters if they
need to affect particles in the same space.

The zones are checking the particles every tick and if some are inside their boundaries, they will
mark the particle as `dead` which removes the particle from the scene graph and prepares it for respawning.
