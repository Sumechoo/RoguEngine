import { TileType, TileConfig, TileFormat } from "./types";
import { ASSETS } from "../../../assets/sprites";
import {Primitive, Cube, Plane} from '../../gameobjects/primitives'

export const mapFormatToObject: Record<TileFormat, Primitive> = {
    [TileFormat.SPRITE]: Plane,
    [TileFormat.TILE]: Cube,
};

export const tileToTexture: Record<TileType, TileConfig | undefined> = {
    [TileType.WALL]: {
        material: ASSETS.bricks,
        yShift: 1,
        decoratorAssets: [
            {
                material: ASSETS.antena,
                size: 0.7,
                format: TileFormat.SPRITE,
                hollow: true,
                randomShift: true,
            },
            {
                material: ASSETS.bricks,
                size: 1,
                hollow: true,
            },
            {
                material: ASSETS.window,
                size: 1,
                hollow: true,
            },
        ],
    },
    [TileType.FLOOR]: {
        material: ASSETS.wall,
        decoratorAssets: [
            {
                material: ASSETS.bush,
                hollow: true,
                yShift: 1,
                size: 0.7,
                format: TileFormat.SPRITE,
                randomShift: true,
            },
        ],
    },
    [TileType.WATER]: {
        material: ASSETS.water,
        yShift: -0.2
    },
  
    [TileType.VOID]: undefined,
  };