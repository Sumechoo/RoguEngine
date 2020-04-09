import { Location, TileType, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { basicWall, stack, concrette } from "../builders";

export const cityTheme: LocationTheme = {
    [TileType.WALL]: [
        ...stack(basicWall, 10, concrette),
    ],
    [TileType.GRASS]: [
        {
            material: ASSETS.grass,
            yShift: 0.05,
            hollow: false,
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
                    yShift: 0,
                    size: 1.2,
                    format: TileFormat.SPRITE,
                    randomShift: true,
                },
            ],
        },
        {
            material: ASSETS.grass,
            yShift: 0.05,
        }
    ],
    [TileType.FLOOR]: [
        {
            material: ASSETS.wall,
            hollow: false,
        },
    ],
  
    [TileType.VOID]: undefined,
  };

export const city: Location = {
    theme: cityTheme,
}