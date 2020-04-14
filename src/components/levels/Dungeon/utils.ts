import { TileType, Bounds, TileData, TileConfig } from "./types";
import { Vec2 } from "three";
import { Vec3 } from "cannon";

function isBoundaryIndex(index: number, bounds: Bounds) {
    return index === bounds.from || index === bounds.to - 1;
}

export function initEmptyData(size = 10): TileData {
    const data: TileData = [];

    for(let i = 0; i < size; i++) {
        data[i] = [];
        for(let j = 0; j < size; j++) {
            data[i][j] = TileType.VOID;
        }
    }

    return data;
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

    return {
        walls,
        center: {
            x: position.x + size.x / 2,
            y: position.y + size.y / 2,
        } as Vec2,
    };
}

export function spawnPaths(data: TileType[][], roomCenters: Vec2[]) {
    if (roomCenters.length < 2) {
        return;
    }

    for(let i = 0; i < roomCenters.length; i++) {
        const start = roomCenters[i];
        const end = roomCenters[i + 1];

        if (!start || !end) {
            console.info('something goes wrong', start, end);
            
            return;
        }

        const startNormalized: Bounds = {
            from: start.x > end.x ? end.x : start.x,
            to: start.y > end.y ? end.y : start.y,
        };
        const endNormalized: Bounds = {
            from: start.x > end.x ? start.x : end.x,
            to: start.y > end.y ? start.y : end.y,
        };

        for(let x = startNormalized.from; x < endNormalized.to; x++) {
            if (data[x]) {
                data[x][startNormalized.to] = TileType.FLOOR;
            }
        }

        for(let y = startNormalized.to; y < endNormalized.from; y++) {
            if (data[endNormalized.to]) {
                data[endNormalized.to][y] = TileType.FLOOR;
            }
        }
    }
}

export function configToProperties (config: TileConfig, level = 0, x = 0, y = 0) {
    return {
        pos: new Vec3(x, level + (config.yShift || 0), y),
        size: config.size || 1,
        kinematic: true,
        mat: config.material,
        hollow: !!config.hollow,
    }
}

export function spawnWalls(data: TileType[][], walls: Vec2[]) {
    walls.forEach((item) => {
        const {x, y} = item;

        if (data[x] && data[x][y] !== TileType.FLOOR) {
            data[x][y] = TileType.WALL;
        }
    });
}

export function spawnGrass(data: TileType[][]) {
    data.forEach((row, x) => row.forEach((tile, y) => {
        if (tile === TileType.VOID) {
            data[x][y] = TileType.GRASS
        }
    }));
}