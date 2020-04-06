import { TileType, TileConfig, TileFormat } from "./types";
import { ASSETS } from "../../../assets/sprites";
import {Primitive, Cube, Plane} from '../../gameobjects/primitives'

export const mapFormatToObject: Record<TileFormat, Primitive> = {
    [TileFormat.SPRITE]: Plane,
    [TileFormat.TILE]: Cube,
};

export const tileToTexture: Record<TileType, TileConfig | undefined> = {
    [TileType.WALL]: {
        material: ASSETS.window,
        yShift: 1,
        decoratorAssets: [
            {
                material: ASSETS.window,
                size: 1,
                hollow: true,
                decoratorAssets: [
                    {
                        material: ASSETS.window,
                        size: 1,
                        hollow: true,
                        decoratorAssets: [
                            {
                                material: ASSETS.bricks,
                                size: 1,
                                hollow: true,
                            },
                            {
                                material: ASSETS.window,
                                size: 1,
                                hollow: true,
                                decoratorAssets: [
                                    {
                                        material: ASSETS.antena,
                                        size: 0.7,
                                        format: TileFormat.SPRITE,
                                        hollow: true,
                                        randomShift: true,
                                    },
                                    {
                                        material: ASSETS.wall,
                                        size: 1,
                                        hollow: true,
                                    },
                                    {
                                        material: ASSETS.block,
                                        size: 1,
                                        hollow: true,
                                    },
                                    {
                                        material: ASSETS.window,
                                        size: 1,
                                        hollow: true,
                                        decoratorAssets: [
                                            {
                                                material: ASSETS.window,
                                                size: 1,
                                                hollow: true,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    [TileType.FLOOR]: {
        material: ASSETS.wall,
        decoratorAssets: [
            {
                material: ASSETS.bush,
                hollow: true,
                yShift: -0.4,
                size: 0.7,
                format: TileFormat.SPRITE,
                randomShift: true,
            },
            {
                material: ASSETS.tree,
                hollow: true,
                yShift: -0.2,
                size: 1.2,
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