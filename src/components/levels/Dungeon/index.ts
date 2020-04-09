import { Level } from "../../Level";
import { Vec3 } from "cannon";
import { Vector3, Vec2 } from "three";
import { TileType, TileFormat, TileConfig, Location, TileConfigArray } from "./types";
import { mapFormatToObject } from "./config";
import { spawnRoom, spawnWalls, spawnPaths, spawnGrass } from "./utils";
import { getRandomItem } from "../../core/utils";
import { city } from "./locations/city";

function configToProperties (config: TileConfig, level = 0, x = 0, y = 0) {
  return {
    pos: new Vec3(x, level + (config.yShift || 0), y),
    size: config.size || 1,
    kinematic: true,
    mat: config.material,
    hollow: !!config.hollow,
  }
}

export class Dungeon extends Level {
  private size = 50;
  private data: TileType[][] = [];

  public static entityName = 'Dungeon';

  private location?: Location;

  constructor() {
    super();

    this.location = city;

    for(let i = 0; i < this.size; i++) {
      this.data[i] = [];
      for(let j = 0; j < this.size; j++) {
        this.data[i][j] = TileType.VOID;
      }
    }
  }

  beforeInit() {
    const getRandom = () => Math.floor(Math.random() * this.size);
    const walls: Vec2[] = [];
    const centers: Vec2[] = [];

    let playerStart: Vec2 = {x: 0, y: 0};

    for(let i = 0; i < 30; i++) {
      const loc: Vec2 = {x: getRandom(), y: getRandom()};
      const size: Vec2 = {x: 6, y: 6};
      const room = spawnRoom(this.data, size, loc)

      walls.push(...room.walls);
      centers.push(room.center);

      if (i === 0) {
        playerStart = {x: loc.x + 3, y: loc.y + 3};
      }
    }

    spawnPaths(this.data, centers);
    spawnWalls(this.data, walls);
    spawnGrass(this.data);
    this.spawnPlayer(new Vector3(playerStart.x, 1, playerStart.y));
  }

  spawnDecor(tileCfg: TileConfigArray, x: number, y: number, level = 0) {

    const config = getRandomItem(tileCfg);
    const tileProperties = configToProperties(config, level, x, y);
    const decor = new mapFormatToObject[config.format || TileFormat.TILE](tileProperties);
  
    this.add(decor);

    if (config.randomShift) {
      decor.transform.setRotation(new Vec3(0, Math.random() * 360, 0));
    }

    if (config.decoratorAssets) {
      this.spawnDecor(config.decoratorAssets, x, y, level + 1 + (config.yShift || 0));
    }
  }

  afterInit() {
    this.data.forEach((row, x) => {
      row.forEach((tile, y) => {
        this.spawnDecor(this.location && this.location.theme[tile] || [], x, y);
      });
    });
  }

  init() {
    this.beforeInit();
    this.afterInit();

    this.lazyMode = true;
  }
}
