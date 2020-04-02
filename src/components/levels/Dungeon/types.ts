export enum TileType {
    WALL, FLOOR, VOID, WATER,
}

export interface TileConfig {
    texture: string;
    yShift?: number;
}

export interface Bounds {
    from: number;
    to: number;
}