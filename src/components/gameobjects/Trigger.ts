import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";
import { Vec3, Body, Box, IBodyEvent } from "cannon";
import { GameObject } from "../core";

export class Trigger extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, color = 0x88aa55) {
    super();

    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshBasicMaterial({ color, opacity: 0.5, transparent: true });
    const body = new Mesh(geometry, material);

    this.add(body);
    
    this.rigidbody = new Body({
      mass: 1,
    
    });
    this.rigidbody.addShape(new Box(new Vec3(size / 2, size / 2, size / 2)));
    this.rigidbody.position = pos;
    this.rigidbody.collisionResponse = false;

    this.rigidbody.addEventListener('collide', (e: IBodyEvent) => console.info('collided with:', e));

    if(kinematic) {
      this.rigidbody.type = Body.KINEMATIC;
    }
  }
}
