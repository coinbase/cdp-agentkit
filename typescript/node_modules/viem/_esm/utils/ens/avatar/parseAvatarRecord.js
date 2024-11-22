import { getJsonImage, getMetadataAvatarUri, getNftTokenUri, parseAvatarUri, parseNftUri, resolveAvatarUri, } from './utils.js';
/*
 * @description Parses an ENS avatar record.
 *
 * @example
 * parseAvatarRecord('eip155:1/erc1155:0xb32979486938aa9694bfc898f35dbed459f44424/10063')
 * 'https://ipfs.io/ipfs/QmSP4nq9fnN9dAiCj42ug9Wa79rqmQerZXZch82VqpiH7U/image.gif'
 *
 * @see https://docs.ens.domains/web/avatars
 *
 */
export async function parseAvatarRecord(client, { gatewayUrls, record, }) {
    if (/eip155:/i.test(record))
        return parseNftAvatarUri(client, { gatewayUrls, record });
    return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record, }) {
    // parse NFT URI into properties
    const nft = parseNftUri(record);
    // fetch tokenURI from the NFT contract
    const nftUri = await getNftTokenUri(client, { nft });
    // resolve the URI from the fetched tokenURI
    const { uri: resolvedNftUri, isOnChain, isEncoded, } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
    // if the resolved URI is on chain, return the data
    if (isOnChain &&
        (resolvedNftUri.includes('data:application/json;base64,') ||
            resolvedNftUri.startsWith('{'))) {
        const encodedJson = isEncoded
            ? // if it is encoded, decode it
                atob(resolvedNftUri.replace('data:application/json;base64,', ''))
            : // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
                resolvedNftUri;
        const decoded = JSON.parse(encodedJson);
        return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
    }
    let uriTokenId = nft.tokenID;
    if (nft.namespace === 'erc1155')
        uriTokenId = uriTokenId.replace('0x', '').padStart(64, '0');
    return getMetadataAvatarUri({
        gatewayUrls,
        uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId),
    });
}
//# sourceMappingURL=parseAvatarRecord.js.map