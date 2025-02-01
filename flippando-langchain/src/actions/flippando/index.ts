export * from "./create-game"
export * from "./initialize-game"
export * from "./flip-tiles"

import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"


export function getAllFlippandoActions(): FlippandoAction<FlippandoActionSchemaAny>[] {
    return [new CreateGameAction(), new InitializeGameAction(), new FlipTilesAction()];
  }
  
  /**
   * All available Flippando actions.
   */
  export const FLIPPANDO_ACTIONS = getAllFlippandoActions();

  export {
    FlippandoAction,
    FlippandoActionSchemaAny,
    CreateGameAction,
    InitializeGameAction,
    FlipTilesAction,
  }



