import { Level } from "../../Level";
import { Cube } from "../../gameobjects/primitives/Cube";
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

    this.spawnPlayer(new Vector3(15, 1, 15));
  }

  beforeInit() {
    const getRandom = () => Math.floor(Math.random() * this.size);
    const walls: Vec2[] = [];

    for(let i = 0; i < 30; i++) {
      walls.push(...spawnRoom(this.data, {x: 6, y: 6}, {x: getRandom(), y: getRandom()}));
    }

    spawnWalls(this.data, walls);
  }

  init() {
    this.beforeInit();
  
    this.data.forEach((row, x) => {
      row.forEach((tile, y) => {
        const tileCfg = tileToTexture[tile];

        if (tileCfg) {
          this.add(new Cube(new Vec3(x, tileCfg.yShift || 0, y), 1, true, tileCfg.texture));
        }
      });
    });
  }
}
