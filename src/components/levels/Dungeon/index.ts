import { Level } from "../../Level";
import { Vec3 } from "cannon";
import { Vector3, Vec2 } from "three";
import { TileType, TileFormat, TileConfig } from "./types";
import { tileToTexture, mapFormatToObject } from "./config";
import { spawnRoom, spawnWalls, spawnPaths, spawnGrass } from "./utils";
import { getRandomItem } from "../../core/utils";

export class Dungeon extends Level {
  private size = 50;
  private data: TileType[][] = [];

  public static entityName = 'Dungeon';

  constructor() {
    super();

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

  spawnDecor(tileCfg: TileConfig, x: number, y: number, level = 0) {
    if (!tileCfg.decoratorAssets) {
      return;
    }

    const config = getRandomItem(tileCfg.decoratorAssets);
    const tileProperties = {
      pos: new Vec3(x, (config.yShift || 0) + level, y),
      size: config.size,
      kinematic: true,
      mat: config.material,
      hollow: !!config.hollow,
    };
    const decor = new mapFormatToObject[config.format || TileFormat.TILE](tileProperties);
  
    this.add(decor);

    if (config.randomShift) {
      decor.transform.setRotation(new Vec3(0, Math.random() * 360, 0));
    }

    if (config.decoratorAssets) {
      this.spawnDecor(config, x, y, level + 1);
    }
  }

  afterInit() {
    this.data.forEach((row, x) => {
      row.forEach((tile, y) => {
        const tileCfg = getRandomItem(tileToTexture[tile] || []);

        if (tileCfg) {
          this.add(new mapFormatToObject[TileFormat.TILE]({
            pos: new Vec3(x, tileCfg.yShift || 0, y),
            kinematic: true,
            mat: tileCfg.material,
          }));

          if (tileCfg.decoratorAssets) {
            this.spawnDecor(tileCfg, x, y, (tileCfg.yShift || 0) + 1);
          }
        }
      });
    });
  }

  init() {
    this.beforeInit();
    this.afterInit();

    // setTimeout(() => this.lazyMode = true, 3000);
    this.lazyMode = true;
  }
}
