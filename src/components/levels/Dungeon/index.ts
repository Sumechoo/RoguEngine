import { Level } from "../../Level";
import { Cube, Plane } from "../../gameobjects/primitives";
import { Vec3 } from "cannon";
import { Vector3, Vec2 } from "three";
import { TileType } from "./types";
import { tileToTexture } from "./config";
import { spawnRoom, spawnWalls } from "./utils";

export class Dungeon extends Level {
  private size = 30;
  private data: TileType[][] = [];

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

    let playerStart: Vec2 = {x: 0, y: 0};

    for(let i = 0; i < 20; i++) {
      const loc: Vec2 = {x: getRandom(), y: getRandom()};
      const size: Vec2 = {x: 6, y: 6};

      walls.push(...spawnRoom(this.data, size, loc));

      if (i === 15) {
        playerStart = {x: loc.x + 3, y: loc.y + 3};
      }
    }

    spawnWalls(this.data, walls);
    this.spawnPlayer(new Vector3(playerStart.x, 1, playerStart.y));
  }

  afterInit() {
    this.data.forEach((row, x) => {
      row.forEach((tile, y) => {
        const tileCfg = tileToTexture[tile];

        if (tileCfg) {
          this.add(new Cube(new Vec3(x, tileCfg.yShift || 0, y), 1, true, tileCfg.material));

          if (tileCfg.decoratorAssets) {
            const decor = new Plane(new Vec3(x, (tileCfg.yShift || 0) + 0.68, y), 0.35, true, tileCfg.decoratorAssets[0]);
            this.add(decor);

            decor.transform.setRotation(new Vec3(0, Math.random() * 360, 0));
          }
        }
      });
    });
  }

  init() {
    this.beforeInit();
    this.afterInit();
  }
}
