import { Vec3 } from "cannon";
import { Vector3 } from "three";

export function Vec3ToVector(vec: Vec3): Vector3 {
    return new Vector3(vec.x, vec.y, vec.z);
}

export function Vector3ToVec(vec: Vector3): Vec3 {
    return new Vec3(vec.x, vec.y, vec.z);
}