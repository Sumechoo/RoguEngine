import { BoxGeometry, MeshPhysicalMaterial, Mesh, CanvasTexture, Color, NearestFilter, TextureLoader, RepeatWrapping } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { block } from "../../../assets/sprites";
import { MeshWithMaterial } from "../../../types";
export class Cube extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, t?: string) {
    super();
  
    const texture = new TextureLoader().load(t || block);
    texture.magFilter = NearestFilter;

    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshPhysicalMaterial({ map: texture, roughnessMap: texture, bumpMap: texture, transparent: true });
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
