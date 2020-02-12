import { Level } from "../Level";
import { TestCube } from "../gameobjects/TestCube";

export class Demo extends Level {
  init() {
    this.add(new TestCube());
  }
}
