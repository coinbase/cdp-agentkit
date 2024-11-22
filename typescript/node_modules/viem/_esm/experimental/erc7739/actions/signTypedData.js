import { parseAccount } from '../../../accounts/utils/parseAccount.js';
import { getEip712Domain, } from '../../../actions/public/getEip712Domain.js';
import { signTypedData as signTypedData_ } from '../../../actions/wallet/signTypedData.js';
import { AccountNotFoundError } from '../../../errors/account.js';
import { getAction } from '../../../utils/getAction.js';
import { wrapTypedDataSignature } from '../utils/wrapTypedDataSignature.js';
/**
 * Signs an [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data message via [ERC-7739 `TypedDataSign` format](https://eips.ethereum.org/EIPS/eip-7702).
 *
 * This Action is suitable to sign messages for Smart Accounts that implement (or conform to) [ERC-7739](https://eips.ethereum.org/EIPS/eip-7702) (e.g. Solady's [ERC1271.sol](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC1271.sol)).
 *
 * - Docs: https://viem.sh/experimental/erc7739/signTypedData
 *
 * @param client - Client to use
 * @param parameters - {@link SignTypedDataParameters}
 * @returns The signed data. {@link SignTypedDataReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/experimental/erc7739'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signTypedData(client, {
 *   account: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 *   verifier: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/experimental/erc7739'
 *
 * const client = createWalletClient({
 *   account: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb'
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const signature = await signTypedData(client, {
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 *   verifier: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 */
export async function signTypedData(client, parameters) {
    const { account: account_ = client.account, domain, factory, factoryData, message, primaryType, types, verifier, } = parameters;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: '/experimental/erc7739/signTypedData',
        });
    const account = parseAccount(account_);
    // Retrieve account EIP712 domain.
    const { domain: verifierDomain, fields, extensions, } = await (async () => {
        if (parameters.verifierDomain && parameters.fields && parameters.extensions)
            return {
                domain: parameters.verifierDomain,
                fields: parameters.fields,
                extensions: parameters.extensions,
            };
        return getAction(client, getEip712Domain, 'getEip712Domain')({
            address: verifier,
            factory,
            factoryData,
        });
    })();
    // Sign with typed data wrapper.
    const signature = await getAction(client, signTypedData_, 'signTypedData')({
        account,
        domain,
        types: {
            ...types,
            TypedDataSign: [
                { name: 'contents', type: primaryType },
                { name: 'fields', type: 'bytes1' },
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
                { name: 'salt', type: 'bytes32' },
                { name: 'extensions', type: 'uint256[]' },
            ],
        },
        primaryType: 'TypedDataSign',
        message: {
            contents: message,
            fields,
            extensions,
            ...verifierDomain,
        },
    });
    return wrapTypedDataSignature({
        domain,
        message,
        primaryType,
        signature,
        types,
    });
}
//# sourceMappingURL=signTypedData.js.map