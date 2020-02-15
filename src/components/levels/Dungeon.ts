import { Level } from "../Level";
import { Cube } from "../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { TextureEditor } from "../../ui/components/TextureEditor";
import { Color, Texture } from "three";

const size = 20;

export class Dungeon extends Level {
  init() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.add(new Cube(new Vec3(i, -2 + Math.random(), j), 1, true, Math.random() * 0xffffff));
      }
    }
  }
}
