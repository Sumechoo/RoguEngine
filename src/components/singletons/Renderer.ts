import { WebGLRenderer, Camera, Scene, Vector2 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { Updateable } from "../../types";
import { Level } from "../Level";
import { World, NaiveBroadphase } from "cannon";

export class Renderer implements Updateable {
  protected renderer: WebGLRenderer;
  protected physics: World;

  protected scene: Scene;
  protected camera?: Camera;
  protected level?: Level;

  private composer: any;

  constructor() {
    this.renderer = new WebGLRenderer();
    this.composer = new EffectComposer(this.renderer);

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

    this.composer.render(this.scene, this.camera);
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

    if (this.camera) {
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new ShaderPass(FXAAShader));
    }
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
