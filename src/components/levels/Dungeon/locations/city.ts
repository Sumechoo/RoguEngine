import { Location, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { basicWall, stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnPaths, spawnWalls, spawnGrass } from "../utils";
import { Vec2 } from "three";
import { API } from "../../../singletons/API";
import { Dungeon } from "..";
import { GameState } from "../../../singletons/GameState";
import { suburb } from "./suburb";

function changeLocation() {
    GameState.setState({location: suburb});
    API.getInstance().loadLevel(Dungeon);
}

export const cityTheme: LocationTheme = {
    ...baseTheme,
    wall: [
        {
            ...stack(basicWall, 50, concrette)[0],
            yShift: 1,
        }
    ],
    door: [
        {
            material: ASSETS.door,
            action: changeLocation,
            yShift: 1,
            decoratorAssets: [
                ...stack(basicWall, 4, concrette),
            ]
        },
        ...stack(basicWall, 6, concrette)
    ],
    grass: [
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
    floor: [
        {
            material: ASSETS.wall,
            hollow: false,
            decoratorAssets: [
                {
                    material: ASSETS.bush,
                    yShift: -0.4,
                    format: TileFormat.SPRITE,
                    hollow: true,
                    randomShift: true,
                }
            ]
        },
        {
            material: ASSETS.wall,
            hollow: false,
        }
    ],
  };

export const city: Location = {
    theme: cityTheme,
    spawner: () => {
        const thisSize = 50;
        const data = initEmptyData(thisSize);
        const getRandom = () => Math.floor(Math.random() * thisSize);
        const walls: Vec2[] = [];
        const centers: Vec2[] = [];
    
        let start: Vec2 = {x: 0, y: 0};
    
        for(let i = 0; i < 30; i++) {
          const loc: Vec2 = {x: getRandom(), y: getRandom()};
          const size: Vec2 = {x: 6, y: 6};
          const room = spawnRoom(data, size, loc, {floor: cityTheme.floor})
    
          walls.push(...room.walls);
          centers.push(room.center);
    
          if (i === 0) {
            start = {x: loc.x + 3, y: loc.y + 3};
          }
        }
    
        spawnPaths(data, centers);
        spawnWalls(data, walls, {
            wall: cityTheme.wall,
        });
        spawnGrass(data);

        return {
            data,
            start,
        };
    },
}