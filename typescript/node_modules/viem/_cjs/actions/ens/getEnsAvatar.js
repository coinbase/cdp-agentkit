"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnsAvatar = getEnsAvatar;
const parseAvatarRecord_js_1 = require("../../utils/ens/avatar/parseAvatarRecord.js");
const getAction_js_1 = require("../../utils/getAction.js");
const getEnsText_js_1 = require("./getEnsText.js");
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress, }) {
    const record = await (0, getAction_js_1.getAction)(client, getEnsText_js_1.getEnsText, 'getEnsText')({
        blockNumber,
        blockTag,
        key: 'avatar',
        name,
        universalResolverAddress,
        gatewayUrls,
        strict,
    });
    if (!record)
        return null;
    try {
        return await (0, parseAvatarRecord_js_1.parseAvatarRecord)(client, {
            record,
            gatewayUrls: assetGatewayUrls,
        });
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=getEnsAvatar.js.map