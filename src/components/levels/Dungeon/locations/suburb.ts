import { Location, TileType, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnWalls } from "../utils";

const theme: LocationTheme = {
    ...baseTheme,
    wall: [
        {
            ...concrette()[0],
            height: 4,
        }
        // ...stack(concrette, 2, concrette),
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
    
        const {center, walls} = spawnRoom(data, {x: 6, y: 10}, {x: 5, y: 5}, roomCfg);
        wallsToSpawn.push(...walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 10, y: 4}, {x: 9, y: 5}, roomCfg).walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 5, y: 10}, {x: 15, y: 5}, roomCfg).walls);
        wallsToSpawn.push(...spawnRoom(data, {x: 10, y: 4}, {x: 9, y: 11}, roomCfg).walls);

        wallsToSpawn.push(...spawnRoom(data, {x: 26 , y: 5}, {x: 0, y: 13}, {
            floor: [{
                ...concrette()[0],
                yShift: -1,
            }],
        }).walls);

        data[8][5] = [{
            material: ASSETS.bricks,
            height: 3,
            decoratorAssets: [{
                material: ASSETS.error,
                size: 1.01,
                yShift: 1,
                height: 0.5,
            }],
        }];
        data[6][6] = [{
            material: ASSETS.bricks,
            decoratorAssets: [{
                yShift: 1,
                material: ASSETS.error,
            }],
        }];
        data[6][7] = [{
            material: ASSETS.bricks,
            decoratorAssets: [{
                material: ASSETS.error,
                yShift: 1,
                height: 0.5,
            }],
        }];
        data[6][8] = [{
            material: ASSETS.bricks,
            decoratorAssets: [{
                material: ASSETS.error,
                yShift: 0.5,
                height: 0.5,
            }],
        }];
        data[6][9] = [{
            material: ASSETS.bricks,
            decoratorAssets: [{
                material: ASSETS.error,
                height: 0.5,
            }],
        }];

        spawnWalls(data, wallsToSpawn, {
            wall: theme.wall,
        });

        return {
            data,
            start: center,
        };
    },
}