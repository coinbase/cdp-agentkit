export * from "./create-game"
export * from "./initialize-game"
export * from "./flip-tiles"

import { CreateGameAction } from "./create-game"
import { InitializeGameAction } from "./initialize-game"
import { FlipTilesAction } from "./flip-tiles"

export const FLIPPANDO_ACTIONS = [new CreateGameAction(), new InitializeGameAction(), new FlipTilesAction()]

