import { MeshPhysicalMaterial, Mesh, NearestFilter, TextureLoader, PlaneGeometry, DoubleSide } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { block } from "../../../assets/sprites";
import { MeshWithMaterial } from "../../../types";

export class Plane extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, t?: string) {
    super();
  
    const texture = new TextureLoader().load(t || block);
    texture.magFilter = NearestFilter;

    const geometry = new PlaneGeometry(size, size, 1);
    const material = new MeshPhysicalMaterial({ map: texture, roughnessMap: texture, bumpMap: texture, transparent: true, side: DoubleSide });
    const body = new Mesh(geometry, material);

    body.castShadow = true;
    body.receiveShadow = true;

    this.add(body);
    this.body = body as MeshWithMaterial;
    
    this.rigidbody = new Body({
      mass: 1,
    });
    this.rigidbody.addShape(new Box(new Vec3(size / 2, size / 2, size / 5)));
    this.rigidbody.collisionResponse = false;

    this.transform.setPosition(pos);
    this.update();

    if(kinematic) {
      this.rigidbody.type = Body.KINEMATIC;
    }
  }
}
