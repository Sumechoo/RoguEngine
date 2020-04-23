import { MeshPhysicalMaterial, Vec2 } from "three";

export type LocationTheme = Record<string, TileConfigArray>;

export type TileData = Array<Array<TileConfigArray>>;

export type TileConfigArray = ReadonlyArray<TileConfig>;

export type Builder = () => TileConfigArray;

export type Spawner = () => {data: TileData, start: Vec2};

export enum TileType {
    WALL, FLOOR, VOID, GRASS, DOOR,
}

export enum TileFormat {
    TILE, SPRITE,
}

export interface Location {
    theme: LocationTheme,
    spawner: Spawner;
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
    action?: () => void;
}

export interface Bounds {
    from: number;
    to: number;
}