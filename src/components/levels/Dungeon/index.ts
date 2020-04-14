import { Level } from "../../Level";
import { Vec3 } from "cannon";
import { Vector3 } from "three";
import { TileFormat, Location, TileConfigArray, TileData } from "./types";
import { mapFormatToObject } from "./config";
import { getRandomItem } from "../../core/utils";
import { configToProperties } from "./utils";
import { GameState } from "../../singletons/GameState";

export class Dungeon extends Level {
  private data: TileData = [];

  public static entityName = 'Dungeon';

  private location?: Location;

  constructor() {
    super();

    this.location = GameState.getState().location;
  }

  beforeInit() {
    if (this.location) {
      const {data, start} = this.location.spawner();

      this.data = data;
      this.spawnPlayer(new Vector3(start.x, 1, start.y));
    }    
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
