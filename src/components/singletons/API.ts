import { Level } from "../Level";
import { GameState } from "./GameState";
import { GameObject } from "../core";

export class API {
  protected static instance: API;

  public actions: Record<number, (() => void) | undefined> = {};

  public loadLevel: (levelConstructor: typeof Level) => void = () => {};

  constructor() {
    if (API.instance !== undefined) {
      throw new Error("Engine API instance allready exist");
    }

    API.instance = this;
  }

  public static getInstance() {
    return API.instance;
  }

  public static lockMouse() {
    (document.body as any).requestPointerLock();
  }

  public static unlockMouse() {
    (document as any).exitPointerLock();
  }

  public static findObjectByUID(uuid: string) {
    const levelRef = GameState.getState().currentLevel;

    if (!levelRef) {
      return;
    }

    return levelRef.children.find((item) => item.uuid === uuid) as GameObject;
  }
}
