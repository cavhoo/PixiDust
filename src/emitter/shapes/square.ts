import { Vector } from "../../types/vector";
import { Shape } from "./shape";

export class Square extends Shape {
  protected size: Vector;
  constructor(size: Vector = new Vector(1, 1)) {
    super();
    this.size = size;
  }
  public getSpawnPos(): Vector {
    const x = Math.random() * this.size.x - this.size.x / 2;
    const y = Math.random() * this.size.y - this.size.y / 2;
    return new Vector(x, y);
  }
}
