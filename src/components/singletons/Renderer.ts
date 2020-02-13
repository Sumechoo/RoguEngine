import { WebGLRenderer, Camera, Scene, DirectionalLight, Euler, AmbientLight, PCFSoftShadowMap, Vector2 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
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

    this.renderer.shadowMapType = PCFSoftShadowMap;

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
      // this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new SSAOPass(this.scene, this.camera, 0.5, 0.5));
      this.composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 0.3, 1, 0.3));
      this.composer.addPass(new SMAAPass(10,10));
      // this.composer.addPass(new ShaderPass(FXAAShader));
    }

    this.renderer.shadowMapEnabled = true;

    const light = new DirectionalLight(0xffffff, 1);
    const ambient = new AmbientLight(0x12345678, 1);

    light.castShadow = true;
    light.shadow.bias = 0;
    light.shadowMapHeight = 2048;
    light.shadowMapWidth = 2048;
    light.position.x = 1;
    light.position.z = 0.3;

    light.setRotationFromEuler(new Euler(45,45,45));

    this.scene.add(light, ambient);
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
