import { Object3D } from "three";
import { Updateable, Object3dWithMaterial, MeshWithMaterial } from "../../types";
import { Body, Vec3 } from "cannon";
import { Transform } from "./Transform";

export class GameObject extends Object3D implements Updateable {
  public rigidbody?: Body;
  public body?: Object3dWithMaterial | MeshWithMaterial;

  public transform: Transform = new Transform();

  private updatePosition() {
    const {x, y, z} = this.transform.position;
    this.position.set(x,y,z);
  }

  private updateRotation() {
    const {x, y, z} = this.transform.rotation;
    this.rotation.set(x,y,z);
  }

  public update() {
    if(this.rigidbody) {
      if (this.transform.externalModified) {
        this.rigidbody.position = this.transform.position;
        this.rigidbody.quaternion.setFromEuler(
          this.transform.rotation.x,
          this.transform.rotation.y,
          this.transform.rotation.z,
        );

        this.transform.externalModified = false;
      }

      const eulerRotation: Vec3 = new Vec3();
      this.rigidbody.quaternion.toEuler(eulerRotation);

      this.transform.setPosition(this.rigidbody.position, false);
      this.transform.setRotation(eulerRotation, false);

      this.updatePosition();
      this.updateRotation();
    }
  }
}
