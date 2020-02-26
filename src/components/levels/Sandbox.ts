import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { Vector3 } from "three";

export class Sandbox extends Level {
  init() {
    this.add(new Cube(Vec3.ZERO, 1.5, false, 0x231253));
    this.add(new Cube(new Vec3(0, 2, 0), 0.75, false, 0x5491a4));
    this.add(new Cube(new Vec3(0, 3, 0), 0.35, false, 0x126490));
    this.add(new Cube(new Vec3(0, 4, 0), 0.15, false, 0xaf2449));

    this.spawnPlayer(new Vector3(15, 1, 15));

    this.add(new Cube(new Vec3(0, -6, 0), 10, true, 0xaf2449));
  }
}