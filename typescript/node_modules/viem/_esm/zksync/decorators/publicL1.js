import { getL1Allowance, } from '../actions/getL1Allowance.js';
import { getL1Balance, } from '../actions/getL1Balance.js';
import { getL1TokenBalance, } from '../actions/getL1TokenBalance.js';
export function publicActionsL1() {
    return (client) => ({
        getL1Allowance: (args) => getL1Allowance(client, args),
        getL1TokenBalance: (args) => getL1TokenBalance(client, args),
        // @ts-expect-error
        getL1Balance: (args) => getL1Balance(client, args),
    });
}
//# sourceMappingURL=publicL1.js.map