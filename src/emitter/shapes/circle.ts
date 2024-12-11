import { Vector } from "../../types/vector";
import { Shape } from "./shape";

export class Circle extends Shape {
  protected radius: number = 1;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  public getSpawnPos(): Vector {
    const angle = Math.ceil(Math.random() * 360 + 1);
    const x = Math.sin(angle) * this.radius;
    const y = Math.cos(angle) * this.radius;
    return new Vector(x, y);
  }
}
