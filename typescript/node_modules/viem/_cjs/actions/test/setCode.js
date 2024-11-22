"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCode = setCode;
async function setCode(client, { address, bytecode }) {
    if (client.mode === 'ganache')
        await client.request({
            method: 'evm_setAccountCode',
            params: [address, bytecode],
        });
    else
        await client.request({
            method: `${client.mode}_setCode`,
            params: [address, bytecode],
        });
}
//# sourceMappingURL=setCode.js.map