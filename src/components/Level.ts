import { Object3D } from "three";
import { GameObject } from "./GameObject";
import { Updateable, Initable } from "../types";

export class Level extends Object3D implements Updateable, Initable {
  public readonly objects: Array<GameObject> = [];

  public update(frameNum: number) {
    this.objects.forEach(object => object.update(frameNum));
  }

  public add(...object: Array<GameObject>) {
    this.objects.push(...object);

    Object3D.prototype.add.call(this, ...object);
    return this;
  }

  public init() {}
}
