import { Object3D } from "three";
import { GameObject } from "./GameObject";
import { Updateable, Initable } from "../types";
import { Body } from "cannon";

export class Level extends Object3D implements Updateable, Initable {
  public readonly objects: Array<GameObject> = [];
  public readonly rigidbodies: Array<Body> = [];

  public update(frameNum: number) {
    this.objects.forEach(object => object.update(frameNum));
  }

  public add(...object: Array<GameObject>) {
    this.objects.push(...object);

    const rigidbodiesToAdd = object.map((item) => item.rigidbody);

    rigidbodiesToAdd.forEach((body) => {
      if(body) {
        this.rigidbodies.push(body);
      }
    });

    Object3D.prototype.add.call(this, ...object);
    return this;
  }

  public init() {}
}
