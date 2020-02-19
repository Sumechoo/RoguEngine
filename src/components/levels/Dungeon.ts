import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { Vector3 } from "three";

const size = 10;

export class Dungeon extends Level {
  constructor() {
    super();

    this.spawnPlayer(new Vector3(15, 1, 15));
  }

  init() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.add(new Cube(new Vec3(i, -2 + Math.ceil(Math.random() * 2), j), 1, true, Math.random() * 0xffffff));
      }
    }
  }
}
