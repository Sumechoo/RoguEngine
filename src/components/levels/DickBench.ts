import { Level } from "../Level";
import { Cube, Plane } from "../gameobjects/primitives";
import { Vec3 } from "cannon";
import { ASSETS } from "../../assets/sprites";

export class DickBench extends Level {
  public static entityName = 'Dickbench';

  spawnDicks() {
    this.add(new Plane({mat: ASSETS.pen}));

    setTimeout(() => this.spawnDicks(), 600);
  }

  init() {
    this.add(new Cube({
      pos: new Vec3(0, -6, 0),
      size: 10,
      kinematic: true,
    }));
  
    this.spawnDicks();
  }
}
