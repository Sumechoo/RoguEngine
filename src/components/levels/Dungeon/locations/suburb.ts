import { Location, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { concrette, stackSeparate } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnWalls } from "../utils";
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
            material: ASSETS.grass,
            decoratorAssets: [{
                material: ASSETS.tree_big,
                size: 1.5,
                height: 3,
                format: TileFormat.SPRITE,
                hollow: true,
                randomShift: true,
            }]
        },
        {
            material: ASSETS.grass,
            decoratorAssets: [{
                material: ASSETS.bush,
                size: 1.5,
                height: 0.5,
                format: TileFormat.SPRITE,
                hollow: true,
                randomShift: true,
            }]
        },
        {material: ASSETS.grass},
        {material: ASSETS.grass},
        {material: ASSETS.grass},
    ],
  };

export const suburb: Location = {
    theme: theme,
    spawner: () => {
        const data = initEmptyData(50);
        const gotoIndoor = () => {
            GameState.setState({location: techDemos});
            API.getInstance().loadLevel(Dungeon);
        };

        const {walls} = spawnRoom(data, {x: 20, y: 20}, {x: 0, y: 0}, {
            floor: theme.grass,
        });

        for (let i = 2; i <= 17; i++) {
            for(let j = 2; j < 6; j++) {
                const bulb = j === 5 && i % 4 === 0;
                data[i][j] = [{
                    material: ASSETS.wall,
                    decoratorAssets: bulb ? [{
                        material: ASSETS.wall,
                        size: 0.06,
                        height: 3,
                    }] : undefined,
                }];
            }
        }

        spawnWalls(data, walls, {
            wall: [{
                material: ASSETS.beton,
                yShift: 1,
            }]
        });

        for (let i = 0; i <= 20; i++) {
            const balcony = i % 4 === 0;
            data[i][1] = stackSeparate(() => [{
                material: balcony ? ASSETS.bricks : ASSETS.window,
                size: balcony ? 1.4 : 1,
                height: 1,
                decoratorAssets: balcony ? [{
                    material: ASSETS.bricks,
                    height: 0.4,
                    size: 1.8,
                }] : undefined,
            }], 6);
        }

        data[10][1] = [{
            material: ASSETS.door,
            yShift: 1,
            action: gotoIndoor,
            decoratorAssets: stackSeparate(() => [{
                material: ASSETS.window,
            }], 4),
        }]

        return {
            data,
            start: {x: 10, y: 10},
        };
    },
}