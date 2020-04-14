import { Location, TileType, LocationTheme, TileFormat } from "../types";
import { ASSETS } from "../../../../assets/sprites";
import { basicWall, stack, concrette } from "../builders";
import { baseTheme } from "../config";
import { initEmptyData, spawnRoom, spawnPaths, spawnWalls, spawnGrass } from "../utils";
import { Vec2 } from "three";

const cityTheme: LocationTheme = {
    ...baseTheme,
    [TileType.WALL]: [
        ...stack(basicWall, 2, concrette),
    ],
    [TileType.GRASS]: [
        {
            material: ASSETS.grass,
            yShift: 0.05,
        },
    ],
    [TileType.FLOOR]: [
        {
            material: ASSETS.wall,
        },
        {
            material: ASSETS.wall,
        }
    ],
  };

export const city2: Location = {
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
          const room = spawnRoom(data, size, loc)
    
          walls.push(...room.walls);
          centers.push(room.center);
    
          if (i === 0) {
            start = {x: loc.x + 3, y: loc.y + 3};
          }
        }
    
        spawnPaths(data, centers);
        spawnWalls(data, walls);
        spawnGrass(data);

        return {
            data,
            start,
        };
    },
}