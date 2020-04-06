import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";

const dungeonSize = 10;

export class Columns extends Level {
  public static entityName = 'Columns bench';

  init() {
    for(let i = 0; i < dungeonSize; i++) {
      for(let j = 0; j < dungeonSize; j++) {
        this.add(new Cube({
          pos: new Vec3(i / 2, j / 2, 0),
          size: 0.5,
          kinematic: false,
        }));
      }
    }

    this.add(new Cube({
      pos: new Vec3(0, -6, 0),
      size: 10,
      kinematic: true,
    }));
  }
}
