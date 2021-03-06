import { IForce, Updateable, Object3dWithMaterial, GameInputEvent } from "../types";
import { Vec3 } from "cannon";
import { Camera, Raycaster, Vector3 } from "three";
import { GameState } from "./singletons/GameState";
import { InputHandler } from "./singletons/InputHandler";
import { isKeyboardEvent } from "../typeguards";
import { SingletoneStore } from "./singletons/SingletoneStore";
import { Plane } from "./gameobjects/primitives";
import { API } from "./singletons/API";
import { Renderer } from "./singletons/Renderer";
import { GameObject } from "./core";

export interface AxisConfig {
  name: keyof IForce;
  value: number;
}

export const ConfigMap: Record<number, AxisConfig> = {
  87: {name: 'z', value: -1},
  83: {name: 'z', value: 1},
  65: {name: 'x', value: -1},
  68: {name: 'x', value: 1},
};

export class PlayerController implements Updateable {
  protected readonly body: Object3dWithMaterial;
  protected readonly camera: Camera;
  protected readonly element: HTMLElement;

  protected raycaster: Raycaster = new Raycaster();

  protected baseMovementSpeed: number = 0.05;
  protected baseRotationSpeed: number = 0.1;

  private buildBlockPlaceholder: Object3dWithMaterial;

  private canJump = true;

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
    this.buildBlockPlaceholder = new Plane({
      pos: new Vec3(0.2, -0.1, -0.25),
      rot: new Vec3(-45, 0, 0),
      size: 0.25,
      kinematic: true,
    });

    // this.camera.add(this.buildBlockPlaceholder);
    this.buildBlockPlaceholder.transform.setRotation(new Vec3(45,45,45));

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
    const currentLevel = GameState.getState().currentLevel;

    // if (currentLevel) {
    //   const position = new Vector3();
    //   const rotation = new Quaternion();
    //   this.buildBlockPlaceholder.getWorldPosition(position);
    //   this.buildBlockPlaceholder.getWorldQuaternion(rotation);
    //   const cube = new Plane({
    //     mat: ASSETS.pen,
    //     size: 0.25,
    //   });

    //   cube.transform.setPosition(Vector3ToVec(position));
    //   cube.transform.setRotation(Vector3ToVec(new Euler().setFromQuaternion(rotation).toVector3()));

    //   currentLevel.add(cube);
    // }
  }

  private listenMouse = (e: GameInputEvent) => {
    if (isKeyboardEvent(e) || GameState.getState().inventoryCandidate) {
      return;
    }

    let forward = new Vector3();
    this.camera.getWorldDirection(forward);

    // this.buildBlockPlaceholder.transform.setPosition(new Vec3(0, forward.y / 2, -0.5));
    // this.buildBlockPlaceholder.update();
    const rayResult = this.doRaycast()[0];

    if (rayResult) {
      const mesh = Renderer.getInstance().findByUid(rayResult.object.id);
      const gameObject = mesh && mesh.parent as GameObject;
      const hasAction = gameObject && gameObject.action;
      const isSameAction = hasAction
        ? GameState.getState().currentActionId === (gameObject && gameObject.id)
        : GameState.getState().currentActionId === undefined;

      if (!isSameAction) {
        GameState.setState({currentActionId: hasAction ? gameObject && gameObject.id : undefined});
      }
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

    if (e.keyCode !== 32 && !isNaN(Number(e.key))) {
      GameState.setState({activeItem: Number(e.key) - 1});
    }

    const cfg = ConfigMap[e.keyCode];
    this.mutateAxis(cfg);

    switch (e.keyCode) {
      case 32:
        this.doJump();
        break;
      case 70:
        this.doAction();
        break;
      case 27:
        GameState.setState({showDeveloperMenu:true});
        break;
    }
  }

  private doAction() {
    const id = GameState.getState().currentActionId;

    if (id) {
      const action = API.getInstance().actions[id];

      if (action) {
        action();
      }
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

    if (rigidbody && this.canJump) {
      this.canJump = false;
      rigidbody.velocity.y += 0.1;
      setTimeout(() => this.canJump = true, 600);
    }
  }

  private listenKeyUp = (e: GameInputEvent) => {
    if (!isKeyboardEvent(e)) {
      return;
    }

    let cfg = ConfigMap[e.keyCode];
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
