import { getPaymasterData, } from '../../actions/paymaster/getPaymasterData.js';
import { getPaymasterStubData, } from '../../actions/paymaster/getPaymasterStubData.js';
export function paymasterActions(client) {
    return {
        getPaymasterData: (parameters) => getPaymasterData(client, parameters),
        getPaymasterStubData: (parameters) => getPaymasterStubData(client, parameters),
    };
}
//# sourceMappingURL=paymaster.js.map