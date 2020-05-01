import { Location, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { concrette, stackSeparate } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnWalls, replaceEmptiness, spawnPaths } from "../utils";
import { GameState } from "../../../singletons/GameState";
import { API } from "../../../singletons/API";
import { Dungeon } from "..";
import { techDemos } from "./techDemos";

const theme: LocationTheme = {
    ...baseTheme,
    wall: [
        {
            ...concrette()[0],
            height: 4,
        }
    ],
    grass: [
        {
            material: 'grass',
            decoratorAssets: [{
                material: 'tree_big',
                size: 1.5,
                height: 3,
                format: TileFormat.SPRITE,
                hollow: true,
                randomShift: true,
            }]
        },
        {
            material: 'grass',
            decoratorAssets: [{
                material: 'bush',
                size: 0.7,
                height: 0.4,
                format: TileFormat.SPRITE,
                hollow: true,
                randomShift: true,
                decoratorAssets: [{
                    material: 'bush',
                    size: 0.7,
                    height: 0.5,
                    format: TileFormat.SPRITE,
                    hollow: true,
                    randomShift: true,
                    yShift: -0.4,
                }]
            }]
        },
        {material: 'grass'},
        {material: 'grass'},
    ],
  };

export const suburb: Location = {
    theme: theme,
    spawner: () => {
        const data = initEmptyData(21);
        const gotoIndoor = () => {
            GameState.setState({location: techDemos});
            API.getInstance().loadLevel(Dungeon);
        };
        const openInvenory = () => {
            API.unlockMouse();
            GameState.setState({
                inventoryCandidate: ['SOME ITEM'],
            });
        }

        const {walls} = spawnRoom(data, {x: 20, y: 10}, {x: 0, y: 0}, {
            floor: [
                ...theme.grass,
                {
                    material: 'grass',
                    decoratorAssets: [{
                        material: 'garbage',
                        hollow: true,
                        size: 0.9,
                        height: 0.005,
                        decoratorAssets: [{
                            material: 'trashCan',
                            size: 0.5,
                            height: 0.5,
                            action: openInvenory,
                            decoratorAssets: [{
                                material: 'garbage',
                                hollow: true,
                                height: 0.005,
                                size: 0.5,
                            }]
                        }]
                    }]
                }
            ],
        });

        for (let i = 2; i <= 17; i++) {
            for(let j = 2; j < 6; j++) {
                const bulb = j === 5 && i % 4 === 0;
                data[i][j] = [{
                    material: 'wall',
                    decoratorAssets: bulb ? [{
                        material: 'wall',
                        size: 0.06,
                        height: 3,
                    }] : undefined,
                }];
            }
        }

        spawnWalls(data, walls, {
            wall: [{
                material:'beton',
                yShift: 1,
            }]
        });

        for (let i = 0; i <= 20; i++) {
            const balcony = i % 4 === 0;
            data[i][1] = stackSeparate(() => [{
                material: balcony ? 'bricks' : 'window',
                size: balcony ? 1.4 : 1,
                height: 1,
                decoratorAssets: balcony ? [{
                    material: 'bricks',
                    height: 0.4,
                    size: 1.8,
                    decoratorAssets: [{
                        material: 'antena',
                        format: TileFormat.SPRITE,
                        randomShift: true,
                    }]
                }] : undefined,
            }], 6);
        }

        data[10][1] = [{
            material: 'door',
            yShift: 1,
            action: gotoIndoor,
            decoratorAssets: stackSeparate(() => [{
                material: 'window',
            }], 4),
        }];

        spawnPaths(data, [{x: 11, y: 1}, {x: 20, y: 1}]);

        spawnPaths(data, [{x: 0, y: 20}, {x: 21, y: 20}]);
        spawnPaths(data, [{x: 0, y: 19}, {x: 21, y: 19}]);
        spawnPaths(data, [{x: 0, y: 18}, {x: 21, y: 18}]);

        console.info('DATA:', gotoIndoor.toString());

        replaceEmptiness(data);

        return {
            data,
            start: {x: 10, y: 5},
        };
    },
}