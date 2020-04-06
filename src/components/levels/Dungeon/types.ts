import { MeshPhysicalMaterial } from "three";

export enum TileType {
    WALL, FLOOR, VOID, WATER, GRASS,
}

export enum TileFormat {
    TILE, SPRITE,
}

export interface TileConfig {
    material: MeshPhysicalMaterial;
    decoratorAssets?: ReadonlyArray<TileConfig>;
    yShift?: number;
    size?: number;
    hollow?: boolean;
    format?: TileFormat;
    randomShift?: boolean;
}

export interface Bounds {
    from: number;
    to: number;
}