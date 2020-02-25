import { IForce, Updateable, Object3dWithMaterial, GameInputEvent } from "../types";
import { Vec3 } from "cannon";
import { Camera, Raycaster } from "three";
import { GameState } from "./singletons/GameState";
import { InputHandler } from "./singletons/InputHandler";
import { isKeyboardEvent } from "../typeguards";
import { SingletoneStore } from "./singletons/SingletoneStore";

export interface AxisConfig {
  name: keyof IForce;
  value: number;
}

export const ConfigMap: Record<string, AxisConfig> = {
  'w': {name: 'z', value: -1},
  's': {name: 'z', value: 1},
  'a': {name: 'x', value: -1},
  'd': {name: 'x', value: 1},
};

export class PlayerController implements Updateable {
  protected readonly body: Object3dWithMaterial;
  protected readonly camera: Camera;
  protected readonly element: HTMLElement;

  protected raycaster: Raycaster = new Raycaster();

  protected baseMovementSpeed: number = 0.05;
  protected baseRotationSpeed: number = 0.1;

  private speed: IForce = {
    x: 0,
    y: 0,
    z: 0,
    ry: 0,
    rx: 0
  };

  constructor(body: Object3dWithMaterial, camera: Camera, element: HTMLElement) {
    this.body = body;
    this.camera = camera;
    this.element = element;

    this.body.children.forEach((child) => child.castShadow = false);

    if(this.body.rigidbody) {
      this.body.rigidbody.fixedRotation = true;
      this.body.rigidbody.updateMassProperties();
    }

    this.raycaster.far = 10;

    this.setupListeners();
  }

  private setupListeners() {
    const inputHandler: InputHandler<any> | undefined = SingletoneStore.getInstance(InputHandler.name);

    if(inputHandler) {
      inputHandler.cleanup();
    }

    SingletoneStore.setInstance(new InputHandler(this.element, {
      // should be added the "wheel" event and configured as rest of listeners after chrome bug will be fixed
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1054332
      mousedown: this.listenClick,
      mousemove: this.listenMouse,
      keydown: this.listenKeyDown,
      keyup: this.listenKeyUp,
    }), InputHandler.name);
  }

  private listenWheel = (e: WheelEvent) => {
    const {activeItem} = GameState.getState();

    GameState.setState({activeItem: activeItem + (Math.sign(e.deltaY))})
  }

  private listenClick = () => {
    const target = this.doRaycast()[0];

    if (target) {
      const object: any = target.object;

      if(!object) {
        return;
      }

      object.material.setValues({color: '#FF0000'});
    }
  }

  private listenMouse = (e: GameInputEvent) => {
    if (isKeyboardEvent(e)) {
      return;
    }

    const movementX = -(e.movementX / 200);
    const movementY = -(e.movementY / 200);
    const {rigidbody} = this.body;

    this.camera.rotateX(movementY);

    if(rigidbody) {
      const oldRotation = new Vec3();

      rigidbody.quaternion.toEuler(oldRotation);
      oldRotation.y += movementX;
      rigidbody.quaternion.setFromEuler(oldRotation.x, oldRotation.y, oldRotation.z);
    }
  }

  private listenKeyDown = (e: GameInputEvent) => {
    if (!isKeyboardEvent(e)) {
      return;
    }

    if (e.key !== ' ' && !isNaN(Number(e.key))) {
      GameState.setState({activeItem: Number(e.key) - 1});
    }

    const cfg = ConfigMap[e.key];
    this.mutateAxis(cfg);

    switch (e.key) {
      case " ":
        this.doJump();
        break;
      case "Escape":
        GameState.setState({showDeveloperMenu:true});
        break;
    }
  }

  private mutateAxis = (cfg: AxisConfig) => {
    if (cfg && cfg.name in this.speed) {
      this.speed[cfg.name] = cfg.value * this.baseMovementSpeed;
    }
  }

  private nillAxis = (cfg: AxisConfig) => {
    this.mutateAxis({
      ...cfg,
      value: 0,
    });
  }

  private doJump() {
    const {rigidbody} = this.body;

    if (rigidbody) {
      rigidbody.velocity.y += 0.1;
    }
  }

  private listenKeyUp = (e: GameInputEvent) => {
    if (!isKeyboardEvent(e)) {
      return;
    }

    let cfg = ConfigMap[e.key];
    this.nillAxis(cfg);
  }

  private doRaycast = () => {
    const {parent} = this.body;

    if(!parent) {
      return [];
    }
  
    this.raycaster.setFromCamera({x: 0, y: 0}, this.camera);
    const intersects = this.raycaster.intersectObjects(parent.children, true);

    if (intersects.length > 0) {
      return intersects;
    }

    return [];
  }

  public update() {
    const {rigidbody} = this.body;

    if (rigidbody) {
      const newVelocity = new Vec3(this.speed.x, this.speed.y, this.speed.z);
      newVelocity.y = rigidbody.velocity.y;

      rigidbody.velocity = rigidbody.vectorToWorldFrame(newVelocity);
    }
  }
}
