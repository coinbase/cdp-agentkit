"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAvatarRecord = parseAvatarRecord;
const utils_js_1 = require("./utils.js");
async function parseAvatarRecord(client, { gatewayUrls, record, }) {
    if (/eip155:/i.test(record))
        return parseNftAvatarUri(client, { gatewayUrls, record });
    return (0, utils_js_1.parseAvatarUri)({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record, }) {
    const nft = (0, utils_js_1.parseNftUri)(record);
    const nftUri = await (0, utils_js_1.getNftTokenUri)(client, { nft });
    const { uri: resolvedNftUri, isOnChain, isEncoded, } = (0, utils_js_1.resolveAvatarUri)({ uri: nftUri, gatewayUrls });
    if (isOnChain &&
        (resolvedNftUri.includes('data:application/json;base64,') ||
            resolvedNftUri.startsWith('{'))) {
        const encodedJson = isEncoded
            ?
                atob(resolvedNftUri.replace('data:application/json;base64,', ''))
            :
                resolvedNftUri;
        const decoded = JSON.parse(encodedJson);
        return (0, utils_js_1.parseAvatarUri)({ uri: (0, utils_js_1.getJsonImage)(decoded), gatewayUrls });
    }
    let uriTokenId = nft.tokenID;
    if (nft.namespace === 'erc1155')
        uriTokenId = uriTokenId.replace('0x', '').padStart(64, '0');
    return (0, utils_js_1.getMetadataAvatarUri)({
        gatewayUrls,
        uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId),
    });
}
//# sourceMappingURL=parseAvatarRecord.js.map