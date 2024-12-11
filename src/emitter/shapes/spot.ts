import { Vector } from "../../types/vector";
import { Shape } from "./shape";

/*
 * Spawns particle on a singular pixel spot.
 */
export class Spot extends Shape {
  public getSpawnPos(): Vector {
    return new Vector(0, 0);
  }
}
