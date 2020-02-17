import { Object3D } from "three";
import { GameObject } from "./GameObject";
import { Updateable, Initable, UIScope } from "../types";
import { Body } from "cannon";
import { Player } from "./gameobjects/Player";
import { Renderer } from "./singletons/Renderer";

export class Level extends Object3D implements Updateable, Initable {
  public readonly objects: Array<Updateable> = [];
  public readonly rigidbodies: Array<Body> = [];

  public ui?: UIScope;

  constructor() {
    super();

    const playerObject = new Player();
    const playerComponents = playerObject.getPlayerConponents();

    this.add(playerComponents.body);
    this.objects.push(playerComponents.controller);

    Renderer.getInstance().setActiveCamera(playerComponents.camera);
  }

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
