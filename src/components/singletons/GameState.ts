import { IGameState } from "../../types";

export class GameState {
  protected static instance: GameState;
  protected state: IGameState;

  constructor() {
    if (GameState.instance !== undefined) {
      throw new Error("Game state instance allready exist");
    }

    this.state = {};

    GameState.instance = this;
  }

  getState() {
    return GameState.instance.state;
  }
}
