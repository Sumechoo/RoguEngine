import { Level } from "../../Level";
import { Cube } from "../../gameobjects/primitives/Cube";
import { Vec3 } from "cannon";
import { Vector3 } from "three";
import { TileType } from "./types";
import { block, pen } from "../../../assets/sprites";

const tileToTexture: Record<TileType, string | undefined> = {
  [TileType.WALL]: block,
  [TileType.FLOOR]: pen,

  [TileType.VOID]: undefined,
};

export class Dungeon extends Level {
  private size = 20;
  private data: TileType[][] = [];

  constructor() {
    super();

    this.data.length = this.size;
    this.data.fill([]);
    this.data.forEach((row, index) => {
      this.data[index].length = this.size;
      this.data[index].fill(TileType.WALL);
    });

    this.spawnPlayer(new Vector3(15, 1, 15));
  }

  beforeInit() {
    // const getRandom = () => Math.ceil(Math.random() * this.size);
    // for(let i = 0; i < 20; i ++) {
    //   console.info('data: ', this.data);

    //   this.data[getRandom()][getRandom()] = TileType.FLOOR;
    // }
  }

  init() {
    this.beforeInit();

    this.data.forEach((row, x) => {
      row.forEach((tile, y) => {
        const texture = tileToTexture[tile];

        if (texture) {
          this.add(new Cube(new Vec3(x, -1, y), 1, true, texture));
        }
      });
    });
  }
}
