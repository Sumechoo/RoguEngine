import { TileType, TileConfig, TileFormat, LocationTheme } from "./types";
import {Primitive, Cube, Plane} from '../../gameobjects/primitives'
import { basicWall, stack } from "./builders";

export const mapFormatToObject: Record<TileFormat, Primitive> = {
    [TileFormat.SPRITE]: Plane,
    [TileFormat.TILE]: Cube,
};

export const baseTheme: LocationTheme = {
    [TileType.GRASS]: undefined,
    [TileType.VOID]: undefined,
    [TileType.WALL]: stack(basicWall, 16),

    [TileType.FLOOR]: basicWall(),
}

export const tileToTexture: LocationTheme = {
    ...baseTheme,
}
