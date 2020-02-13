import { WebGLRenderer, Camera, Scene } from "three";
import { Updateable } from "../../types";
import { Level } from "../Level";
import { World, NaiveBroadphase } from "cannon";

export class Renderer implements Updateable {
  protected renderer: WebGLRenderer;
  protected physics: World;

  protected scene: Scene;
  protected camera?: Camera;
  protected level?: Level;

  constructor() {
    this.renderer = new WebGLRenderer();

    this.renderer.setSize(320, 240);
    this.renderer.setClearColor(0xeeeeee);

    this.physics = new World();
    this.physics.gravity.set(0, -0.005, 0);
    this.physics.broadphase = new NaiveBroadphase();

    this.scene = new Scene();
  }

  update(frame: number) {
    if (!this.level || !this.camera) {
      return;
    }

    this.renderer.render(this.scene, this.camera);
    this.physics.step(0.5);
    this.level.update(frame);
  }

  setActiveCamera(camera: Camera) {
    this.camera = camera;
  }

  setupLevel(level: Level) {
    level.init();

    this.scene.remove(...this.scene.children);
    this.scene.add(level);

    this.physics.bodies = [];

    level.rigidbodies.forEach((item) => this.physics.addBody(item));

    this.level = level;
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
