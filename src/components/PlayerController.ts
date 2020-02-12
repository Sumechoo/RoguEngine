import { Object3D } from "three";
import { IForce, Updateable } from "../types";

export class PlayerController implements Updateable {
  protected readonly body: Object3D;
  protected readonly element: HTMLElement;

  protected baseMovementSpeed: number = 0.05;
  protected baseRotationSpeed: number = 0.04;

  private speed: IForce = {
    x: 0,
    y: 0,
    z: 0,
    ry: 0,
    rx: 0
  };

  constructor(body: Object3D, element: HTMLElement) {
    this.body = body;
    this.element = element;
    this.setupListeners();
  }

  private setupListeners() {
    this.element.addEventListener("mousedown", this.listenMouse.bind(this));
    this.element.addEventListener("keydown", this.listenKeyDown.bind(this));
    this.element.addEventListener("keyup", this.listenKeyUp.bind(this));
  }

  private listenMouse() {}

  private listenKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "w":
        this.speed.z = -this.baseMovementSpeed;
        break;
      case "s":
        this.speed.z = this.baseMovementSpeed;
        break;
      case "a":
        this.speed.ry = this.baseRotationSpeed;
        break;
      case "d":
        this.speed.ry = -this.baseRotationSpeed;
        break;
      case "e":
        this.speed.rx = -this.baseRotationSpeed;
        break;
      case "q":
        this.speed.rx = this.baseRotationSpeed;
        break;
    }
  }

  private listenKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case "w":
      case "s":
        this.speed.z = 0;
        break;
      case "a":
      case "d":
        this.speed.ry = 0;
        break;
      case "q":
      case "e":
        this.speed.rx = 0;
        break;
    }
  }

  public update() {
    this.body.translateZ(this.speed.z);
    this.body.rotateY(this.speed.ry);
    this.body.rotateX(this.speed.rx);
  }
}
