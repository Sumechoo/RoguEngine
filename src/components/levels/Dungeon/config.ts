import { TileType, TileConfig } from "./types";
import { ASSETS } from "../../../assets/sprites";


export const tileToTexture: Record<TileType, TileConfig | undefined> = {
    [TileType.WALL]: {
        material: ASSETS.bricks,
        yShift: 1,
        decoratorAssets: [
            ASSETS.tree,
            ASSETS.bush,
            ASSETS.pen,
            ASSETS.antena,
        ],
    },
    [TileType.FLOOR]: {
        material: ASSETS.wall,
        decoratorAssets: [
            ASSETS.bush,
        ],
    },
    [TileType.WATER]: {
        material: ASSETS.water,
        yShift: -0.2
    },
  
    [TileType.VOID]: undefined,
  };