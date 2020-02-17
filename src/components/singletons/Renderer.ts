import { WebGLRenderer, Camera, Scene, DirectionalLight, Euler, AmbientLight, PCFSoftShadowMap, Vector2 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
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

    const {outerHeight, outerWidth} = window;

    this.renderer.setSize(outerWidth / 5, outerHeight / 5);
    this.renderer.setClearColor(0xeeeeee);

    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.physics = new World();
    this.physics.gravity.set(0, -0.005, 0);
    this.physics.broadphase = new NaiveBroadphase();

    this.scene = new Scene();

    this.composer.setSize(outerWidth / 2, outerHeight / 2);
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

    this.composer.passes = [];

    this.scene.remove(...this.scene.children);
    this.scene.add(level);

    this.physics.bodies = [];

    level.rigidbodies.forEach((item) => this.physics.addBody(item));

    this.level = level;


    if (this.camera) {
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(new DotScreenPass());
      // this.composer.addPass(new SSAOPass(this.scene, this.camera, 200, 200));
      // this.composer.addPass(new SAOPass(this.scene, this.camera, false, false, new Vector2(2048, 2048)));
      // this.composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 0.1, 1, 0.3));
      // this.composer.addPass(new SMAAPass(10,10));
      // this.composer.addPass(new ShaderPass(FXAAShader));
    }

    this.renderer.shadowMapEnabled = true;

    const light = new DirectionalLight(0xffbbaa, 1);
    const ambient = new AmbientLight(0x12345678, 1);

    light.castShadow = true;
    light.shadow.bias = 0;
    light.shadowMapHeight = 2048;
    light.shadowMapWidth = 2048;
    light.position.x = 2;
    light.position.z = 3;

    light.setRotationFromEuler(new Euler(45,45,45));

    this.scene.add(light, ambient);
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
