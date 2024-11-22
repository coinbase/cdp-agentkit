"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineChain = defineChain;
function defineChain(chain) {
    return {
        formatters: undefined,
        fees: undefined,
        serializers: undefined,
        ...chain,
    };
}
//# sourceMappingURL=defineChain.js.map