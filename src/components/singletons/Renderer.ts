import { WebGLRenderer, Camera, Scene, DirectionalLight, Euler, AmbientLight, PCFSoftShadowMap, Vector2, FogExp2, Vector3 } from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { Updateable } from "../../types";
import { Level } from "../Level";
import { World, NaiveBroadphase, Vec3 } from "cannon";
import { GameState } from "./GameState";
import { Sky } from 'three/examples/jsm/objects/Sky.js';

export class Renderer implements Updateable {
  protected static instance: Renderer;

  protected renderer: WebGLRenderer;
  protected physics: World;

  protected scene: Scene;
  protected camera?: Camera;
  protected sun?: DirectionalLight;

  private composer: any;

  public aspect: number = 1;

  constructor() {
    this.renderer = new WebGLRenderer();
    this.composer = new EffectComposer(this.renderer);

    const {innerHeight, outerWidth} = window;

    this.aspect = outerWidth / innerHeight;

    const rendererDivider = GameState.getState().prod ? 1 : 1.2;

    this.renderer.setSize(outerWidth / rendererDivider, innerHeight / rendererDivider);
    // this.renderer.setClearColor(0xccccff);
    this.renderer.autoClear = false;

    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.physics = new World();
    this.physics.gravity.set(0, -0.005, 0);
    this.physics.broadphase = new NaiveBroadphase();

    this.scene = new Scene();
    this.scene.fog = new FogExp2( 0xaaaaaa, 0.05 );

    this.composer.setSize(outerWidth / 2, innerHeight / 2);

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

    this.renderer.render(this.scene, this.camera);
    this.physics.step(1);
    level.update(frame);

    if (this.camera && this.sun) {
      const cameraPosition = this.camera.localToWorld(this.camera.position.clone());
      this.sun.position.set(
        cameraPosition.x + 20,
        cameraPosition.y + 6,
        cameraPosition.z + 10,
      );
      this.sun.target = this.camera;
    }
  }

  setActiveCamera(camera: Camera) {
    this.camera = camera;
  }

  getActiveCamera() {
    return this.camera;
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
        saoBlur: 0.5,
        saoIntensity: 0.0007,
        saoKernelRadius: 128,
        saoBias: 20,
        saoBlurDepthCutoff: 0.02,
      };

      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(SAO);
    }

    this.renderer.shadowMapEnabled = true;

    const light = new DirectionalLight(0xFFBD6D, 1.4);
    const ambient = new AmbientLight(0x12345678, 1);

    light.castShadow = true;
    light.shadow.bias = 0;
    light.shadowMapHeight = 2048;
    light.shadowMapWidth = 2048;

    light.setRotationFromEuler(new Euler(45,45,45));

    const sky = new Sky();
    sky.scale.setScalar( 1000 );

    const uniforms = sky.material.uniforms;

    const effectController = {
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
      inclination: 0.49,
      azimuth: 0.25,
    };

    uniforms[ "turbidity" ].value = effectController.turbidity;
    uniforms[ "rayleigh" ].value = effectController.rayleigh;
    uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
    uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
    uniforms[ "luminance" ].value = effectController.luminance;
    uniforms[ "sunPosition" ].value.copy( new Vec3(20, 6, 10) );

    this.scene.add(ambient, light, sky);

    this.sun = light;
  }

  public findByUid(id: number) {
    return this.scene.getObjectById(id);
  }

  getDOMElement() {
    return this.renderer.domElement;
  }
}
