import { Object3D } from "three";
import { Updateable, Object3dWithMaterial, MeshWithMaterial } from "../types";
import { Body, Vec3 } from "cannon";

export class GameObject extends Object3D implements Updateable {
  public rigidbody?: Body;
  public body?: Object3dWithMaterial | MeshWithMaterial;

  public setPosition(newPosition: Vec3, moveBody = true) {
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
    this.position.z = newPosition.z;

    if(moveBody && this.rigidbody) {
      // const wp = this.localToWorld(this.position);
      // this.rigidbody.position.set(wp.x, wp.y, wp.z);
    }
  }

  public update(frameNum: number) {
    if(this.rigidbody) {
      this.setPosition(this.rigidbody.position, false);
      
      const eulerRotation: Vec3 = new Vec3();

      this.rigidbody.quaternion.toEuler(eulerRotation);

      this.rotation.x = eulerRotation.x;
      this.rotation.y = eulerRotation.y;
      this.rotation.z = eulerRotation.z;
    }
  }
}
