import { CdpAction, CdpActionSchemaAny } from "../../cdp_action";
import { WowBuyTokenAction } from "./actions/buy_token";
import { WowSellTokenAction } from "./actions/sell_token";
import { WowCreateTokenAction } from "./actions/create_token";

/**
 * Retrieves all WOW protocol action instances.
 * WARNING: All new WowAction classes must be instantiated here to be discovered.
 *
 * @returns Array of WOW protocol action instances
 */
export function getAllWowActions(): CdpAction<CdpActionSchemaAny>[] {
  // eslint-disable-next-line prettier/prettier
  return [new WowBuyTokenAction(), new WowSellTokenAction(), new WowCreateTokenAction()];
}

export const WOW_ACTIONS = getAllWowActions();

// Export individual actions for direct imports
// eslint-disable-next-line prettier/prettier
export { WowBuyTokenAction, WowSellTokenAction, WowCreateTokenAction };
