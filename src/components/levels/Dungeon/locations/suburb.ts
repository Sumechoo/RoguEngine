import { Location, TileType, LocationTheme } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { basicWall, stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnPaths, spawnWalls, spawnGrass } from "../utils";
import { Vec2 } from "three";

const theme: LocationTheme = {
    ...baseTheme,
    [TileType.WALL]: [
        ...stack(concrette, 2, concrette),
    ],
    [TileType.GRASS]: [
        {
            ...concrette()[0],
            yShift: 1,
            decoratorAssets: [
                {
                    material: ASSETS.wall,
                    yShift: 1,
                }
            ],
        },
    ],
    [TileType.FLOOR]: [
        {
            material: ASSETS.wall,
            decoratorAssets: [
                {
                    material: ASSETS.wall,
                    yShift: 2,
                }
            ]
        },
    ],
  };

export const suburb: Location = {
    theme: theme,
    spawner: () => {
        const data = initEmptyData(50);
        const start = {x: 12, y: 12};
    
        spawnPaths(data, [start, {x: 5, y: 5}]);
        spawnPaths(data, [start, {x: 20, y: 25}]);
        spawnPaths(data, [start, {x: 45, y: 1}]);
        // spawnWalls(data, []]);
        spawnGrass(data);

        return {
            data,
            start,
        };
    },
}