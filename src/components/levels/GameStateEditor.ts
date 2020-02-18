import { Level } from "../Level";
import { GameStateEditorUI } from "../../ui/components/GameStateEditorUI";

export class GameStateEditor extends Level {
  constructor() {
    super();

    this.ui = {
      Component: GameStateEditorUI,
      props: {},
    };
  }

  init() {}
}
