import { GameObject } from "../GameObject";
import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export class TestCube extends GameObject {
  constructor() {
    super();

    const geometry = new BoxGeometry(2, 0.2, 2);
    const material = new MeshBasicMaterial({ color: 0x88aa55 });
    const body = new Mesh(geometry, material);

    this.add(body);
  }

  update(frameNum) {
    this.position.y = Math.sin(frameNum / 200);
  }
}
