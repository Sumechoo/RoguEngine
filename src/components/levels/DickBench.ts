import { Level } from "../Level";
import { Cube, Plane } from "../gameobjects/primitives";
import { Vec3 } from "cannon";
import { ASSETS } from "../../assets/sprites";

export class DickBench extends Level {
  spawnDicks() {
    this.add(new Plane({mat: ASSETS.pen}));

    setTimeout(() => this.spawnDicks(), 600);
  }

  init() {
    this.add(new Cube(new Vec3(0, -6, 0), 10, true));
  
    this.spawnDicks();
  }
}
