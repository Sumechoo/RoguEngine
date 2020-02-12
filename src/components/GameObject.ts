import { Object3D } from "three";
import { Updateable } from "../types";

export class GameObject extends Object3D implements Updateable {
  public update(frameNum: number) {}
}
