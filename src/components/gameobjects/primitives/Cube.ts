import { BoxGeometry, MeshPhysicalMaterial, Mesh } from "three";
import { GameObject } from "../../GameObject";
import { Vec3, Body, Box } from "cannon";
import { Object3dWithMaterial } from "../../../types";

export class Cube extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, color = 0x88aa55) {
    super();

    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshPhysicalMaterial({ color, metalness: 0, roughness: 0 });
    const body = new Mesh(geometry, material);

    body.castShadow = true;
    body.receiveShadow = true;

    this.add(body);
    this.body = body as Object3dWithMaterial;
    
    this.rigidbody = new Body({
      mass: 1,
    });
    this.rigidbody.addShape(new Box(new Vec3(size / 2, size / 2, size / 2)));
    this.rigidbody.position = pos;

    if(kinematic) {
      this.rigidbody.type = Body.KINEMATIC;
    }
  }
}
