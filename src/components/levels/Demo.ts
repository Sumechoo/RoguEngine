import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { Trigger } from "../gameobjects/Trigger";

export class Demo extends Level {
  init() {
    this.add(new Cube(Vec3.ZERO.clone(), 1.5, false));
    this.add(new Cube(new Vec3(0, 2, 0), 0.75, false));
    this.add(new Cube(new Vec3(0, 3, 0), 0.35, false));
    this.add(new Cube(new Vec3(0, 4, 0), 0.15, false));

    this.add(new Trigger(new Vec3(3, -0.5, 0), 1, true));

    this.add(new Cube(new Vec3(0, -6, 0), 10, true));
  }
}
