import { hexToNumber } from '../../utils/encoding/fromHex.js';
export async function getL1BatchBlockRange(client, parameters) {
    const [number_1, number_2] = await client.request({
        method: 'zks_getL1BatchBlockRange',
        params: [parameters.l1BatchNumber],
    });
    return [hexToNumber(number_1), hexToNumber(number_2)];
}
//# sourceMappingURL=getL1BatchBlockRange.js.map