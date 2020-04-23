import { Location, TileType, LocationTheme } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { basicWall, stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnPaths, spawnWalls, spawnGrass } from "../utils";

const theme: LocationTheme = {
    ...baseTheme,
    wall: [
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
    floor: [
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
        const wallsToSpawn = [];
        const roomCfg = {floor: theme.floor};
    
        const {center, walls} = spawnRoom(data, {x: 5, y: 10}, {x: 5, y: 5}, roomCfg);
        wallsToSpawn.push(...walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 10, y: 4}, {x: 9, y: 5}, roomCfg).walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 5, y: 10}, {x: 15, y: 5}, roomCfg).walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 10, y: 3}, {x: 9, y: 12}, roomCfg).walls);

        spawnWalls(data, wallsToSpawn, {
            door: [{material: ASSETS.error}],
            wall: theme.wall,
        });

        return {
            data,
            start: center,
        };
    },
}