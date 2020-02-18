import { IGameState } from "../../types";

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
    };

    GameState.instance = this;
  }

  public static getInstance() {
    return GameState.instance;
  }

  public addListener(delegate: () => void) {
    this.listeners.push(delegate);
  }

  public static getState() {
    return GameState.instance.state;
  }

  public static setState(state: Partial<IGameState>) {
    GameState.instance.state = {
      ...this.instance.state,
      ...state,
    };

    GameState.instance.listeners.forEach((delegate) => delegate());
  }
}
