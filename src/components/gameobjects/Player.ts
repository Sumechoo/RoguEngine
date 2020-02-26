import { GameObject } from "../GameObject";
import { PerspectiveCamera } from "three";
import { Cube } from "./primitives/Cube";
import { Vec3 } from "cannon";
import { Object3dWithMaterial } from "../../types";
import { PlayerController } from "../PlayerController";
import { Renderer } from "../singletons/Renderer";
import { GameState } from "../singletons/GameState";

export class Player extends GameObject {
    protected camera?: PerspectiveCamera;

    public body = new Cube(new Vec3(0, 0, 3), 0.5, false, 0xff0000) as Object3dWithMaterial;

    protected controller: PlayerController;

    constructor() {
        super();

        this.camera = new PerspectiveCamera(75, Renderer.getInstance().aspect, 0.1, 1000);
        this.body.add(this.camera);
        this.controller = new PlayerController(this.body, this.camera, document.body);

        Renderer.getInstance().setActiveCamera(this.camera);

        (document.body as any).requestPointerLock();
        GameState.setState({showDeveloperMenu: false});
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