import { TileType, TileFormat, LocationTheme } from "./types";
import {Primitive, Cube, Plane} from '../../gameobjects/primitives'
import { basicWall, stack } from "./builders";
import { ASSETS } from "../../../assets/sprites";

export const mapFormatToObject: Record<TileFormat, Primitive> = {
    [TileFormat.SPRITE]: Plane,
    [TileFormat.TILE]: Cube,
};

export const baseTheme: LocationTheme = {
    [TileType.GRASS]: [{material: ASSETS.grass}],
    [TileType.VOID]: [{material: ASSETS.grass}],
    [TileType.WALL]: stack(basicWall, 16),

    [TileType.FLOOR]: basicWall(),
    [TileType.DOOR]: stack(() => [{
        material: ASSETS.block,
    }], 7),
}