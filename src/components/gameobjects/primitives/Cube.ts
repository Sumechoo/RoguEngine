import { BoxGeometry, MeshPhysicalMaterial, Mesh } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { MeshWithMaterial } from "../../../types";
import { ASSETS } from "../../../assets/sprites";
export class Cube extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, mat?: MeshPhysicalMaterial) {
    super();

    const geometry = new BoxGeometry(size, size, size);
    const material = mat || ASSETS.error;
    const body = new Mesh(geometry, material);

    body.castShadow = true;
    body.receiveShadow = true;

    this.add(body);
    this.body = body as MeshWithMaterial;
    
    this.rigidbody = new Body({
      mass: 1,
    });
    this.rigidbody.addShape(new Box(new Vec3(size / 2, size / 2, size / 2)));

    this.transform.setPosition(pos);
    this.update();

    if(kinematic) {
      this.rigidbody.type = Body.KINEMATIC;
    }
  }
}
