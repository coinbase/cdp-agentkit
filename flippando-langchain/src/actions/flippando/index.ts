import { z } from "zod"
import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"
import { MintNftAction } from "./mint-nft"
import { GenerateImageForFlipAction } from "./generate_image_for_flip"
import { GetNftMetadataAction } from "./get_flip_metadata"
import { GetAvaialbleNftsAction } from "./get_available_nfts"
import { ChangeFlippingTerritoryAction } from "./change_flipping_territory"
import { FlippandoAction, FlippandoActionSchemaAny } from "../flippando"
import { MakeArtAction } from "./make-art"
import { PostToTwitterAction } from "./post-to-twitter"


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
  }



