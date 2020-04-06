import { GameObject } from "../core";
import { PerspectiveCamera } from "three";
import { Cube } from "./primitives/Cube";
import { Vec3 } from "cannon";
import { Object3dWithMaterial } from "../../types";
import { PlayerController } from "../PlayerController";
import { Renderer } from "../singletons/Renderer";

export class Player extends GameObject {
    protected camera?: PerspectiveCamera;

    public body = new Cube({
        pos: new Vec3(0, 0, 3),
        size: 0.5,
        kinematic: false,
    }) as Object3dWithMaterial;

    protected controller: PlayerController;

    constructor() {
        super();

        this.camera = new PerspectiveCamera(75, Renderer.getInstance().aspect, 0.1, 1000);
        this.body.add(this.camera);
        this.controller = new PlayerController(this.body, this.camera, document.body);

        Renderer.getInstance().setActiveCamera(this.camera);

        (document.body as any).requestPointerLock();
    }

    public getPlayerConponents = () => {
        const {
            camera,
            body,
            controller,
        } = this;

        return {
            camera, body, controller
        }
    }
}