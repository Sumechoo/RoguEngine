import { Mesh, PlaneGeometry } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { MeshWithMaterial } from "../../../types";
import { PrimitiveProps, getDefaults} from ".";

export class Plane extends GameObject {
  constructor(argProps?: Partial<PrimitiveProps>) {
    super();

    const props = {
      ...getDefaults(),
      ...argProps,
    };

    const {size, height} = props;
    const targetHeight = height || size;

    const geometry = new PlaneGeometry(props.size, targetHeight, 1);
    const material = props.mat;
    const body = new Mesh(geometry, material);

    body.castShadow = false;
    body.receiveShadow = true;

    this.add(body);
    this.body = body as MeshWithMaterial;
    this.action = props.action;
    
    if (!props.hollow) {
      this.rigidbody = new Body({
        mass: 1,
      });
      this.rigidbody.addShape(new Box(new Vec3(props.size / 2, props.size / 2, props.size / 5)));
      if(props.kinematic) {
        this.rigidbody.type = Body.KINEMATIC;
      }
    }

    this.transform.setPosition(props.pos);
    this.transform.setRotation(props.rot);
    this.update();
  }
}
