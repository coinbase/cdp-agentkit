import { addressResolverAbi, universalResolverResolveAbi, } from '../../constants/abis.js';
import { decodeFunctionResult, } from '../../utils/abi/decodeFunctionResult.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getChainContractAddress, } from '../../utils/chain/getChainContractAddress.js';
import { trim } from '../../utils/data/trim.js';
import { toHex } from '../../utils/encoding/toHex.js';
import { isNullUniversalResolverError } from '../../utils/ens/errors.js';
import { namehash } from '../../utils/ens/namehash.js';
import { packetToBytes, } from '../../utils/ens/packetToBytes.js';
import { getAction } from '../../utils/getAction.js';
import { readContract, } from '../public/readContract.js';
/**
 * Gets address for ENS name.
 *
 * - Docs: https://viem.sh/docs/ens/actions/getEnsAddress
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
 *
 * Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract.
 *
 * Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
 *
 * @param client - Client to use
 * @param parameters - {@link GetEnsAddressParameters}
 * @returns Address for ENS name or `null` if not found. {@link GetEnsAddressReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getEnsAddress, normalize } from 'viem/ens'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const ensAddress = await getEnsAddress(client, {
 *   name: normalize('wevm.eth'),
 * })
 * // '0xd2135CfB216b74109775236E36d4b433F1DF507B'
 */
export async function getEnsAddress(client, { blockNumber, blockTag, coinType, name, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_, }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
        if (!client.chain)
            throw new Error('client chain not configured. universalResolverAddress is required.');
        universalResolverAddress = getChainContractAddress({
            blockNumber,
            chain: client.chain,
            contract: 'ensUniversalResolver',
        });
    }
    try {
        const functionData = encodeFunctionData({
            abi: addressResolverAbi,
            functionName: 'addr',
            ...(coinType != null
                ? { args: [namehash(name), BigInt(coinType)] }
                : { args: [namehash(name)] }),
        });
        const readContractParameters = {
            address: universalResolverAddress,
            abi: universalResolverResolveAbi,
            functionName: 'resolve',
            args: [toHex(packetToBytes(name)), functionData],
            blockNumber,
            blockTag,
        };
        const readContractAction = getAction(client, readContract, 'readContract');
        const res = gatewayUrls
            ? await readContractAction({
                ...readContractParameters,
                args: [...readContractParameters.args, gatewayUrls],
            })
            : await readContractAction(readContractParameters);
        if (res[0] === '0x')
            return null;
        const address = decodeFunctionResult({
            abi: addressResolverAbi,
            args: coinType != null ? [namehash(name), BigInt(coinType)] : undefined,
            functionName: 'addr',
            data: res[0],
        });
        if (address === '0x')
            return null;
        if (trim(address) === '0x00')
            return null;
        return address;
    }
    catch (err) {
        if (strict)
            throw err;
        if (isNullUniversalResolverError(err, 'resolve'))
            return null;
        throw err;
    }
}
//# sourceMappingURL=getEnsAddress.js.map