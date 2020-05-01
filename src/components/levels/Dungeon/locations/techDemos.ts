import { Location, TileType, LocationTheme, TileFormat, TileConfigArray } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnWalls } from "../utils";
import { API } from "../../../singletons/API";
import { suburb } from "./suburb";
import { Dungeon } from "..";
import { GameState } from "../../../singletons/GameState";

const theme: LocationTheme = {
    ...baseTheme,
    wall: [
        ...stack(concrette, 3),
    ],
    floor: [
        {
            material: 'wood',
            decoratorAssets: [
                {
                    material: 'wall',
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

        const createDoor = (action?: () => void) : TileConfigArray => [{
            material: 'bricks',
            size: 1.2,
            decoratorAssets: [{
                material: 'door',
                action,
                decoratorAssets: [{
                    material: 'bricks',
                    decoratorAssets: !action ? [{
                        material: 'bricks',
                        height: 0.3,
                        yShift: -1.9,
                        size: 1.1,
                        decoratorAssets: [{
                            material: 'bricks',
                            height: 0.3,
                            size: 1.1,
                            yShift: 0.05,
                        }]
                    }] : [],
                }]
            }],
        }];

        const tableConfig: TileConfigArray = [{
            material: 'wood',
            decoratorAssets: [{
                material: 'wood',
                size: 0.1,
                height: 0.3,
                decoratorAssets: [{
                    material: 'wood',
                    size: 1,
                    height: 0.04,
                    decoratorAssets: [{
                        material: 'wall',
                        yShift: 1.66,
                    }]
                }]
            }]
        }];

        const goOutside = () => {
            GameState.setState({location: suburb});
            API.getInstance().loadLevel(Dungeon);
        }
    
        const {center, walls} = spawnRoom(data, {x: 6, y: 9}, {x: 0, y: 0}, roomCfg);
        wallsToSpawn.push(...walls);

        data[0][2] = createDoor(goOutside);
        data[0][4] = createDoor();
        data[0][6] = createDoor();

        data[2][7] = tableConfig;
        data[3][7] = tableConfig;

        spawnWalls(data, wallsToSpawn, {
            wall: theme.wall,
        });

        return {
            data,
            start: center,
        };
    },
}