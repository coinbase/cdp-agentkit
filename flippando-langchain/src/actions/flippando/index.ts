import { z } from "zod"
export * from "./create-game"
export * from "./initialize-game"
export * from "./flip-tiles"

import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { MintNftAction } from "./mint-nft"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"


export function getAllFlippandoActions(): FlippandoAction<FlippandoActionSchemaAny, z.ZodType<any, any, any>>[] {
    return [
        new CreateGameAction(), 
        new InitializeGameAction(), 
        new FlipTilesAction(),
        new MintNftAction(),
    ];
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
    MintNftAction,
  }



