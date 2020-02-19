import { GameInputEvent } from "./types";

export function isKeyboardEvent(e: GameInputEvent): e is KeyboardEvent {
    return 'key' in e;
}