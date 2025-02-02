import { z } from "zod"
import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { MintNftAction } from "./mint-nft"
import { GenerateImageForFlipAction } from "./generate_image_for_flip"
import { GetNftMetadataAction } from "./get_flip_metadata"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"


export function getAllFlippandoActions(): FlippandoAction<FlippandoActionSchemaAny, z.ZodType<any, any, any>>[] {
    return [
        new CreateGameAction(), 
        new InitializeGameAction(), 
        new FlipTilesAction(),
        new MintNftAction(),
        new GenerateImageForFlipAction(),
        new GetNftMetadataAction(),
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
    GenerateImageForFlipAction,
    GetNftMetadataAction,
  }



