import { MeshPhysicalMaterial } from 'three';
import { Vec3 } from 'cannon';
import { ASSETS } from '../../../assets/sprites';
import {Cube} from './Cube';
import {Plane} from './Plane';

export {Cube} from './Cube';
export {Plane} from './Plane';

export type Primitive = typeof Cube | typeof Plane;

export interface PrimitiveProps {
    pos: Vec3,
    rot: Vec3,
    size: number,
    kinematic: boolean,
    mat: MeshPhysicalMaterial,
    hollow: boolean,
}

export const getDefaults: () => PrimitiveProps = () => ({
    kinematic: false,
    size: 1,
    mat: ASSETS.error,
    pos: Vec3.ZERO.clone(),
    rot: Vec3.ZERO.clone(),
    hollow: false,
})