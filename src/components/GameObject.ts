import { Object3D, Vector3 } from "three";
import { Updateable } from "../types";
import { Body, Box, Vec3 } from "cannon";

export class GameObject extends Object3D implements Updateable {
  public rigidbody?: Body;
  
  constructor() {
    super();
  }

  public update(frameNum: number) {
    if(this.rigidbody) {
      this.position.x = this.rigidbody.position.x;
      this.position.y = this.rigidbody.position.y;
      this.position.z = this.rigidbody.position.z;
      
      const eulerRotation: Vec3 = new Vec3();

      this.rigidbody.quaternion.toEuler(eulerRotation);

      this.rotation.x = eulerRotation.x;
      this.rotation.y = eulerRotation.y;
      this.rotation.z = eulerRotation.z;
    }
  }
}
