import { MeshPhysicalMaterial } from "three";

export enum TileType {
    WALL, FLOOR, VOID, WATER,
}

export interface TileConfig {
    material: MeshPhysicalMaterial;
    decoratorAssets?: ReadonlyArray<MeshPhysicalMaterial>;
    yShift?: number;
}

export interface Bounds {
    from: number;
    to: number;
}