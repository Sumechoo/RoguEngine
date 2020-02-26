import { WebGLRenderer, Camera, Scene, DirectionalLight, Euler, AmbientLight, PCFSoftShadowMap, Vector2, FogExp2 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { Updateable } from "../../types";
import { Level } from "../Level";
import { World, NaiveBroadphase } from "cannon";
import { GameState } from "./GameState";

export class Renderer implements Updateable {
  protected static instance: Renderer;

  protected renderer: WebGLRenderer;
  protected physics: World;

  protected scene: Scene;
  protected camera?: Camera;

  private composer: any;

  public aspect: number = 1;

  constructor() {
    this.renderer = new WebGLRenderer();
    this.composer = new EffectComposer(this.renderer);

    const {outerHeight, outerWidth} = window;

    this.aspect = outerWidth / outerHeight;

    this.renderer.setSize(500, 250);
    this.renderer.setClearColor(0x12345678);

    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.physics = new World();
    this.physics.gravity.set(0, -0.005, 0);
    this.physics.broadphase = new NaiveBroadphase();

    this.scene = new Scene();
    this.scene.fog = new FogExp2( 0x12345678, 0.15 );

    this.composer.setSize(outerWidth / 2, outerHeight / 2);

    if (Renderer.instance !== undefined) {
      throw new Error("Renderer instance allready exist");
    }

    Renderer.instance = this;
  }

  public static getInstance() {
    return Renderer.instance;
  }

  update(frame: number) {
    const level = GameState.getState().currentLevel;

    if (!level || !this.camera) {
      return;
    }

    this.composer.render(this.scene, this.camera);
    this.physics.step(0.5);
    level.update(frame);
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
    level.worldRef = this.physics;

    if (this.camera) {
      const SAO = new SAOPass(this.scene, this.camera);

      SAO.params = {
        ...SAO.params,
        saoBlur: 0.1,
        saoIntensity: 0.001,
        saoKernelRadius: 128,
        saoBias: 10,
        saoBlurDepthCutoff: 0.01,
      };

      this.composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 0.25, 1, 0.3));
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(SAO);
    }

    this.renderer.shadowMapEnabled = true;

    const light = new DirectionalLight(0xFFBD6D, 2);
    const ambient = new AmbientLight(0x12345678, 1);

    light.castShadow = true;
    light.shadow.bias = 0;
    light.shadowMapHeight = 2048;
    light.shadowMapWidth = 2048;
    light.position.x = -4;
    light.position.z = 4;
    light.position.y = 10;

    light.setRotationFromEuler(new Euler(45,45,45));

    this.scene.add(light, ambient);
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
