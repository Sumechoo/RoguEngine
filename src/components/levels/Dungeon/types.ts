import { MeshPhysicalMaterial } from "three";

export type LocationTheme = Record<TileType, ReadonlyArray<TileConfig> | undefined>;

export type TileConfigArray = ReadonlyArray<TileConfig>;

export type Builder = () => TileConfigArray;

export enum TileType {
    WALL, FLOOR, VOID, GRASS,
}

export enum TileFormat {
    TILE, SPRITE,
}

export interface Location {
    theme: LocationTheme,
}

export interface TileConfig {
    material: MeshPhysicalMaterial;
    probability?: number;
    decoratorAssets?: TileConfigArray;
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