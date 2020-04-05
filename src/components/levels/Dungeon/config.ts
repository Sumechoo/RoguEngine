import { TileType, TileConfig } from "./types";
import { ASSETS } from "../../../assets/sprites";


export const tileToTexture: Record<TileType, TileConfig | undefined> = {
    [TileType.WALL]: {
        material: ASSETS.block,
        yShift: 1,
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