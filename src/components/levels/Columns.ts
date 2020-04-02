import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";

const dungeonSize = 10;

export class Columns extends Level {
  init() {
    for(let i = 0; i < dungeonSize; i++) {
      for(let j = 0; j < dungeonSize; j++) {
        this.add(new Cube(new Vec3(i / 2, j / 2, 0), 0.5, false));
      }
    }

    this.add(new Cube(new Vec3(0, -6, 0), 10, true));
  }
}
