"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfig = void 0;
const estimateGas_js_1 = require("./actions/estimateGas.js");
exports.chainConfig = {
    fees: {
        estimateFeesPerGas,
        async maxPriorityFeePerGas({ block, client, request }) {
            const response = await estimateFeesPerGas({
                block,
                client,
                multiply: (x) => x,
                request,
                type: 'eip1559',
            });
            if (!response?.maxPriorityFeePerGas)
                return null;
            return response.maxPriorityFeePerGas;
        },
    },
};
async function estimateFeesPerGas({ client, multiply, request, type, }) {
    try {
        const response = await (0, estimateGas_js_1.estimateGas)(client, {
            ...request,
            account: request?.account,
        });
        const { priorityFeePerGas: maxPriorityFeePerGas } = response;
        const baseFeePerGas = multiply(BigInt(response.baseFeePerGas));
        const maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas;
        if (type === 'legacy')
            return { gasPrice: maxFeePerGas };
        return {
            maxFeePerGas,
            maxPriorityFeePerGas,
        };
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=chainConfig.js.map