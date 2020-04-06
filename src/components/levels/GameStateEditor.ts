import { Level } from "../Level";
import { GameStateEditorUI } from "../../ui/components/GameStateEditorUI";

export class GameStateEditor extends Level {
  public static entityName = 'Game State edit demo';

  constructor() {
    super();

    this.ui = {
      Component: GameStateEditorUI,
      props: {},
    };
  }

  init() {}
}
