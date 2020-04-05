import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { Vector3 } from "three";

export class Sandbox extends Level {
  init() {
    this.add(new Cube(Vec3.ZERO.clone(), 1.5, false));
    this.add(new Cube(new Vec3(0, 2, 0), 0.75, false));
    this.add(new Cube(new Vec3(0, 3, 0), 0.35, false));
    this.add(new Cube(new Vec3(0, 4, 0), 0.15, false));

    this.spawnPlayer(new Vector3(0, 1, 0));

    this.add(new Cube(new Vec3(0, -6, 0), 10, true));
  }
}
