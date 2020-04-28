import { Location, TileType, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnWalls } from "../utils";

const theme: LocationTheme = {
    ...baseTheme,
    wall: [
        ...stack(concrette, 3),
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

export const techDemos: Location = {
    theme: theme,
    spawner: () => {
        const data = initEmptyData(50);
        const wallsToSpawn = [];
        const roomCfg = {floor: theme.floor};

        const createDoor = (action?: () => void) => [{
            material: ASSETS.bricks,
            size: 1.2,
            decoratorAssets: [{
                material: ASSETS.door,
                action,
                decoratorAssets: [{
                    material: ASSETS.bricks,
                    decoratorAssets: !action ? [{
                        material: ASSETS.bricks,
                        height: 0.3,
                        yShift: -1.9,
                        size: 1.1,
                        decoratorAssets: [{
                            material: ASSETS.bricks,
                            height: 0.3,
                            size: 1.1,
                            yShift: 0.05,
                        }]
                    }] : [],
                }]
            }],
        }];
    
        const {center, walls} = spawnRoom(data, {x: 6, y: 9}, {x: 0, y: 0}, roomCfg);
        wallsToSpawn.push(...walls);

        data[0][2] = createDoor(() => alert('Action!'));
        data[0][4] = createDoor();
        data[0][6] = createDoor();

        spawnWalls(data, wallsToSpawn, {
            wall: theme.wall,
        });

        return {
            data,
            start: center,
        };
    },
}