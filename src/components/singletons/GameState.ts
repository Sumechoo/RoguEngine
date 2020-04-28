import { IGameState } from "../../types";
import { city } from "../levels/Dungeon/locations/city";

export class GameState {
  protected static instance: GameState;
  protected state: IGameState;

  protected listeners: Array<() => void> = [];

  constructor() {
    if (GameState.instance !== undefined) {
      throw new Error("Game state instance allready exist");
    }

    this.state = {
      items: [],
      activeItem: 0,
      showDeveloperMenu: true,
      prod: true,

      location: city,
    };

    GameState.instance = this;
  }

  public static getInstance() {
    return GameState.instance;
  }

  public addListener(delegate: () => void) {
    this.listeners.push(delegate);
  }

  public removeListener(delegate: () => void) {
    const delegateIndex = this.listeners.indexOf(delegate);

    this.listeners.splice(delegateIndex, 1);
  }

  public static getState() {
    return GameState.instance.state;
  }

  public static setState(state: Partial<IGameState>) {
    console.warn('num of delegates:', GameState.instance.listeners.length);

    GameState.instance.state = {
      ...this.instance.state,
      ...state,
    };

    GameState.instance.listeners.forEach((delegate) => delegate());
  }
}
