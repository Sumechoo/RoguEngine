import { BoxGeometry, MeshPhysicalMaterial, Mesh, CanvasTexture, Color, NearestFilter } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { MeshWithMaterial } from "../../../types";

export class Cube extends GameObject {
  constructor(pos: Vec3, size = 1, kinematic = false, color = 0x88aa55) {
    super();

    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.height = 20;
    canvas.width = 20;

    const ctx = canvas.getContext('2d');
    const texture = new CanvasTexture(canvas);

    texture.magFilter = NearestFilter;

    if(ctx) {
      ctx.fillStyle = `#${new Color(color).getHexString()}`;
      ctx.fillRect(0, 0, 20, 20);
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'white';
      ctx.fillRect(2, 2, 16, 16);
      ctx.fill();
    }

    texture.needsUpdate = true;

    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshPhysicalMaterial({ map: texture, roughnessMap: texture, bumpMap: texture });
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
