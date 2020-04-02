import { TileType, Bounds } from "./types";
import { Vec2 } from "three";

function isBoundaryIndex(index: number, bounds: Bounds) {
    return index === bounds.from || index === bounds.to - 1;
}

export function spawnRoom(data: TileType[][], size: Vec2, position: Vec2) {
    const walls: Array<Vec2> = [];
    const xBounds: Bounds = {
        from: position.x,
        to: position.x + size.x,
    };
    const yBounds: Bounds = {
        from: position.y,
        to: position.y + size.y,
    };

    for (let x = xBounds.from; x < xBounds.to; x++) {
        for (let y = yBounds.from; y < yBounds.to; y++) {
            const isBoundary = isBoundaryIndex(y, yBounds) || isBoundaryIndex(x, xBounds);
            
            if (data[x] && data[x][y] === TileType.VOID) {
                if (isBoundary) {
                    walls.push({
                        x, y,
                    })
                } else {
                    data[x][y] = TileType.FLOOR;
                }
            }
        }
    }

    return walls;
}

export function spawnWalls(data: TileType[][], walls: Vec2[]) {
    walls.forEach((item) => {
        const {x, y} = item;

        if (data[x] && data[x][y] !== TileType.FLOOR) {
            data[x][y] = TileType.WALL;
        }
    });
}