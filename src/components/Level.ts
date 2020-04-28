import { Object3D, Vector3, PerspectiveCamera } from "three";
import { GameObject } from "./core";
import { Updateable, Initable, UIScope } from "../types";
import { Body, World, Vec3 } from "cannon";
import { Player } from "./gameobjects/Player";
import { Renderer } from "./singletons/Renderer";

export class Level extends Object3D implements Updateable, Initable {
  public readonly objects: Array<Updateable> = [];
  public readonly rigidbodies: Array<Body> = [];

  public static entityName: string = 'Unnamed';

  public ui?: UIScope<any>;
  public worldRef?: World;

  public lazyMode = false;

  constructor() {
    super();

    const levelCamera =  new PerspectiveCamera(75, Renderer.getInstance().aspect, 0.1, 1000);

    levelCamera.position.y = 5;
    levelCamera.position.x = 5;
    levelCamera.lookAt(new Vector3(0,0,0));

    Renderer.getInstance().setActiveCamera(levelCamera);
  }

  protected spawnPlayer = (point = new Vector3(0,0,0)) => {
    const playerObject = new Player();
    const playerComponents = playerObject.getPlayerConponents();

    this.add(playerComponents.body);
    this.objects.push(playerComponents.controller);

    playerComponents.body.transform.setPosition(new Vec3(point.x, point.y + 1, point.z));
  }

  public update(frameNum: number) {
    for (let i = 0; i < this.objects.length; i ++) {
      const obj = this.objects[i];
      obj.update(frameNum);
    }
  }

  public addRB(rb?: Body) {
    if (!rb) {
      return;
    }
    
    if (this.worldRef && !this.worldRef.bodies.includes(rb)) {
      this.rigidbodies.push(rb);

      this.updateWorldRBs();
    }
  }

  public removeRB(rb?: Body) {
    if (!rb) {
      return;
    }

    const index = this.rigidbodies.indexOf(rb);

    if (index > 0) {
      this.rigidbodies.splice(index, 1);
      this.updateWorldRBs();
    }
  }

  private updateWorldRBs() {
    if (this.worldRef !== undefined) {
      this.worldRef.bodies = this.rigidbodies;
    } 
  }

  public add(...object: Array<GameObject>) {
    this.objects.push(...object);

    object.forEach((obj) => obj.levelRef =  this);

    const rigidbodiesToAdd = object.map((item) => item.rigidbody);

    rigidbodiesToAdd.forEach((body) => {
      if(body) {
        this.addRB(body);
      }
    });

    Object3D.prototype.add.call(this, ...object);
    return this;
  }

  public init() {}
}
