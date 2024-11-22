"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAddresses = requestAddresses;
const getAddress_js_1 = require("../../utils/address/getAddress.js");
async function requestAddresses(client) {
    const addresses = await client.request({ method: 'eth_requestAccounts' }, { dedupe: true, retryCount: 0 });
    return addresses.map((address) => (0, getAddress_js_1.getAddress)(address));
}
//# sourceMappingURL=requestAddresses.js.map