import { z } from "zod"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"
import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { MintNftAction } from "./mint-nft"
import { GenerateImageForFlipAction } from "./generate-image-for-flip"
import { GetNftMetadataAction } from "./get-flip-metadata"
import { GetAvaialbleNftsAction } from "./get-available-nfts"
import { ChangeFlippingTerritoryAction } from "./change-flipping-territory"
import { MakeArtAction } from "./make-art"
import { PostToTwitterAction } from "./post-to-twitter"
import { PlayGameToCompletionAction } from "./play-game-to-completion"


export function getAllFlippandoActions(): FlippandoAction<FlippandoActionSchemaAny, z.ZodType<any, any, any>>[] {
    return [
        new CreateGameAction(), 
        new InitializeGameAction(), 
        new FlipTilesAction(),
        new MintNftAction(),
        new GenerateImageForFlipAction(),
        new GetNftMetadataAction(),
        new GetAvaialbleNftsAction(),
        new ChangeFlippingTerritoryAction(),
        new MakeArtAction(),
        new PostToTwitterAction(),
        new PlayGameToCompletionAction(),
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
    GetAvaialbleNftsAction,
    ChangeFlippingTerritoryAction,
    MakeArtAction,
    PostToTwitterAction,
    PlayGameToCompletionAction,
  }



