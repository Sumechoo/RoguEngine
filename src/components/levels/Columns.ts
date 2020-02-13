import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";

const dungeonSize = 5;

export class Columns extends Level {
  init() {
    for(let i = 0; i < dungeonSize; i++) {
      for(let j = 0; j < dungeonSize; j++) {
        this.add(new Cube(new Vec3(i, j, 0), 0.5, false, Math.random() * 16777215));
      }
    }

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}
