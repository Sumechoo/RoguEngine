import { BoxGeometry, MeshPhysicalMaterial, Mesh } from "three";
import { GameObject } from "../../core";
import { Vec3, Body, Box } from "cannon";
import { MeshWithMaterial } from "../../../types";
import { ASSETS } from "../../../assets/sprites";
import { PrimitiveProps, getDefaults } from ".";
export class Cube extends GameObject {
  constructor(argProps?: Partial<PrimitiveProps>) {
    super();

    const props = {
      ...getDefaults(),
      ...argProps,
    };

    const {size, pos, mat} = props;

    const geometry = new BoxGeometry(size, size, size);
    const material = mat || ASSETS.error;
    const body = new Mesh(geometry, material);

    body.castShadow = true;
    body.receiveShadow = true;

    this.add(body);
    this.body = body as MeshWithMaterial;
    
    if (!props.hollow) {
      this.rigidbody = new Body({
        mass: 1,
      });
      this.rigidbody.addShape(new Box(new Vec3(size / 2, size / 2, size / 2)));
      if(props.kinematic) {
        this.rigidbody.type = Body.KINEMATIC;
      }
    }

    this.transform.setPosition(pos);
    this.update();
  }
}
