import { WebGLRenderer, Camera, Scene } from "three";
import { Updateable } from "../../types";
import { Level } from "../Level";

export class Renderer implements Updateable {
  protected renderer: WebGLRenderer;
  protected camera: Camera;
  protected scene: Scene;
  protected level: Level;

  constructor() {
    this.renderer = new WebGLRenderer();

    this.renderer.setSize(200, 200);
    this.renderer.setClearColor(0xeeeeee);

    this.scene = new Scene();
  }

  update(frame: number) {
    if (this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    this.level.update(frame);
  }

  setActiveCamera(camera: Camera) {
    this.camera = camera;
  }

  setupLevel(level: Level) {
    this.scene.remove(...this.scene.children);
    this.scene.add(level);
    this.level = level;

    level.init();
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
