import { Bounds, TileData, TileConfig, TileConfigArray } from "./types";
import { Vec2 } from "three";
import { Vec3 } from "cannon";
import { PrimitiveProps } from "../../gameobjects/primitives";
import { ASSETS } from "../../../assets/sprites";

function isBoundaryIndex(index: number, bounds: Bounds) {
    return index === bounds.from || index === bounds.to - 1;
}

export function iterateData(data: TileData, callback: (tile: TileConfigArray, x: number, y: number) => void) {
    data.forEach((row, x) => row.forEach((tile, y) => {
        callback(tile, x, y);
    }));
} 

export function initEmptyData(size = 10): TileData {
    const data: TileData = [];

    for(let i = 0; i < size; i++) {
        data[i] = [];
        for(let j = 0; j < size; j++) {
            data[i][j] = [];
        }
    }

    return data;
}

export function replaceEmptiness(data: TileData) {
    iterateData(data, (tile, x, y) => {
        if (tile.length === 0) {
            data[x][y] = [{
                material: 'grass',
            }];
        }
    })
}

export function spawnRoom(data: TileData, size: Vec2, position: Vec2, cfg: {floor: TileConfigArray}) {
    const {floor} = cfg;
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
            
            if (data[x] && data[x][y]) {
                if (isBoundary) {
                    walls.push({
                        x, y,
                    });
                } else {
                    data[x][y] = floor;
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

export function spawnPaths(data: TileData, roomCenters: Vec2[]) {
    if (roomCenters.length < 2) {
        return;
    }

    for(let i = 0; i < roomCenters.length; i++) {
        const start = roomCenters[i];
        const end = roomCenters[i + 1];

        if (!start || !end) {
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
                data[x][startNormalized.to] = [{
                    material: 'wall',
                }];;
            }
        }

        for(let y = startNormalized.to; y < endNormalized.from; y++) {
            if (data[endNormalized.to]) {
                data[endNormalized.to][y] = [{
                    material: 'wall',
                }];;
            }
        }
    }
}

export function configToProperties (config?: TileConfig, level = 0, x = 0, y = 0) {
    if (!config) {
        return;
    }

    return {
        pos: new Vec3(x, level + (config.yShift || 0) + (config.height || 1) / 2, y),
        size: config.size || 1,
        kinematic: true,
        mat: ASSETS[config.material],
        hollow: !!config.hollow,
        action: config.action,
        height: config.height,
    } as PrimitiveProps;
}

export function spawnWalls(data: TileData, walls: Vec2[], cfg: {wall: TileConfigArray}) {
    const {wall} = cfg;

    walls.forEach((item) => {
        const {x, y} = item;

        if (data[x] && data[x][y] && data[x][y].length === 0) {
            data[x][y] = wall;
        }
    });
}

export function spawnGrass(data: TileData) {
    data.forEach((row, x) => row.forEach((tile, y) => {
        if (tile.length === 0) {
            data[x][y] = [{material: 'grass'}]
        }
    }));
}

export function tileHeight(tile: TileConfigArray): number {
    if (!tile[0] || !tile[0].decoratorAssets) {
        return 1;
    }

    return tile[0].decoratorAssets.length;
}