import { Object3D } from "three";
import { Updateable, Object3dWithMaterial, MeshWithMaterial } from "../../types";
import { Body, Vec3 } from "cannon";
import { Transform } from "./Transform";
import { Level } from "../Level";
import { Renderer } from "../singletons/Renderer";
import { Vec3ToVector } from "../../utils";

export class GameObject extends Object3D implements Updateable {
  public rigidbody?: Body;
  public body?: Object3dWithMaterial | MeshWithMaterial;

  public transform: Transform = new Transform();
  public levelRef?: Level;

  private updatePosition() {
    const {x, y, z} = this.transform.position;
    this.position.set(x,y,z);
  }

  private updateRotation() {
    const {x, y, z} = this.transform.rotation;
    this.rotation.set(x,y,z);
  }

  public update() {
    if (this.levelRef && this.body) {
      if (this.levelRef.lazyMode) {
        const mainCamera = Renderer.getInstance().getActiveCamera();
        if(mainCamera && mainCamera.parent) {
          const isFarAway = mainCamera.parent.getWorldPosition(mainCamera.parent.position).distanceTo(Vec3ToVector(this.transform.position)) > 5;

          if (isFarAway) {
            this.levelRef.removeRB(this.rigidbody);
            // this.levelRef.remove(this.body);
            // this.body.visible = false;
          } else {
            this.levelRef.addRB(this.rigidbody);
            // this.body.visible = true;
          }
        }
      } else {
        this.levelRef.addRB(this.rigidbody);
      }
    }

    if(this.rigidbody && this.body && this.body.visible) {
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
    }
    
    this.updatePosition();
    this.updateRotation();
  }
}
