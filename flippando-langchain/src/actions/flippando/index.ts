import { z } from "zod"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"
import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { MintNftAction } from "./mint-nft"
import { GetNftMetadataAction } from "./get-flip-metadata"
import { GenerateImageForFlipAction } from "./generate-image-for-flip"
import { GetAvaialbleNftsAction } from "./get-available-nfts"
import { GetArtMetadataAction } from "./get-art-metadata"
import { GenerateImageForArtAction } from "./generate-image-for-art"
import { ChangeFlippingTerritoryAction } from "./change-flipping-territory"
import { MakeArtAction } from "./make-art"
import { PostFlipToTwitterAction } from "./post-flip-to-twitter"
import { PostArtToTwitterAction } from "./post-art-to-twitter"
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
        new PostFlipToTwitterAction(),
        new PostArtToTwitterAction(),
        new PlayGameToCompletionAction(),
        new GetArtMetadataAction(),
        new GenerateImageForArtAction(),
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
    PostFlipToTwitterAction,
    PostArtToTwitterAction,
    PlayGameToCompletionAction,
    GetArtMetadataAction,
    GenerateImageForArtAction,
  }



