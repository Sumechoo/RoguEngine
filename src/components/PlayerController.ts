import { IForce, Updateable } from "../types";
import { GameObject } from "./GameObject";
import { Vec3 } from "cannon";
import { Camera, Raycaster, Mesh } from "three";

export class PlayerController implements Updateable {
  protected readonly body: GameObject;
  protected readonly camera: Camera;
  protected readonly element: HTMLElement;

  protected raycaster: Raycaster = new Raycaster();

  protected baseMovementSpeed: number = 0.05;
  protected baseRotationSpeed: number = 0.1;

  private intersectedObject: any;

  private speed: IForce = {
    x: 0,
    y: 0,
    z: 0,
    ry: 0,
    rx: 0
  };

  constructor(body: GameObject, camera: Camera, element: HTMLElement) {
    this.body = body;
    this.camera = camera;
    this.element = element;

    this.body.children.forEach((child) => child.castShadow = false);

    if(this.body.rigidbody) {
      this.body.rigidbody.fixedRotation = true;
      this.body.rigidbody.updateMassProperties();
    }

    this.raycaster.far = 100;

    this.setupListeners();
  }

  private setupListeners() {
    this.element.addEventListener("mousedown", this.listenClick);
    this.element.addEventListener("mousemove", this.listenMouse);
    this.element.addEventListener("keydown", this.listenKeyDown);
    this.element.addEventListener("keyup", this.listenKeyUp);
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

  private listenMouse = (e: MouseEvent) => {
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

  private listenKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
        this.doJump();
        break;
      case "w":
        this.speed.z = -this.baseMovementSpeed;
        break;
      case "s":
        this.speed.z = this.baseMovementSpeed;
        break;
      case "a":
        this.speed.x = -this.baseMovementSpeed;
        break;
      case "d":
        this.speed.x = this.baseMovementSpeed;
        break;
      case "e":
        this.speed.ry = -this.baseRotationSpeed;
        break;
      case "q":
        this.speed.ry = this.baseRotationSpeed;
        break;
    }
  }

  private doJump() {
    const {rigidbody} = this.body;

    if (rigidbody) {
      rigidbody.velocity.y += 0.1;
    }
  }

  private listenKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
      case "s":
        this.speed.z = 0;
        break;
      case "a":
      case "d":
        this.speed.x = 0;
        break;
      case "q":
      case "e":
        this.speed.ry = 0;
        break;
    }
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
