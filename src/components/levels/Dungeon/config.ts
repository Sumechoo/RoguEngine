import { TileType, TileConfig } from "./types";
import { block, water, wall } from "../../../assets/sprites";


export const tileToTexture: Record<TileType, TileConfig | undefined> = {
    [TileType.WALL]: {
        texture: block,
        yShift: 1,
    },
    [TileType.FLOOR]: {texture: wall},
    [TileType.WATER]: {
        texture: water,
        yShift: -0.2
    },
  
    [TileType.VOID]: undefined,
  };