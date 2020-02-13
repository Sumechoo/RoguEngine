import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";

export class Demo2 extends Level {
  init() {
    this.add(new Cube(new Vec3(-1, 1, 0), 1, false, 0x5491a4));
    this.add(new Cube(new Vec3(1, 1, 0), 1, false, 0x126490));

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
