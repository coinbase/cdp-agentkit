"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProveWithdrawal = buildProveWithdrawal;
exports.maybeAddProofNode = maybeAddProofNode;
const getBlock_js_1 = require("../../actions/public/getBlock.js");
const getProof_js_1 = require("../../actions/public/getProof.js");
const fromRlp_js_1 = require("../../utils/encoding/fromRlp.js");
const toRlp_js_1 = require("../../utils/encoding/toRlp.js");
const keccak256_js_1 = require("../../utils/hash/keccak256.js");
const contracts_js_1 = require("../contracts.js");
const getWithdrawalHashStorageSlot_js_1 = require("../utils/getWithdrawalHashStorageSlot.js");
const outputRootProofVersion = '0x0000000000000000000000000000000000000000000000000000000000000000';
async function buildProveWithdrawal(client, args) {
    const { account, chain = client.chain, game, output, withdrawal } = args;
    const { withdrawalHash } = withdrawal;
    const { l2BlockNumber } = game ?? output;
    const slot = (0, getWithdrawalHashStorageSlot_js_1.getWithdrawalHashStorageSlot)({ withdrawalHash });
    const [proof, block] = await Promise.all([
        (0, getProof_js_1.getProof)(client, {
            address: contracts_js_1.contracts.l2ToL1MessagePasser.address,
            storageKeys: [slot],
            blockNumber: l2BlockNumber,
        }),
        (0, getBlock_js_1.getBlock)(client, {
            blockNumber: l2BlockNumber,
        }),
    ]);
    return {
        account,
        l2OutputIndex: game?.index ?? output?.outputIndex,
        outputRootProof: {
            latestBlockhash: block.hash,
            messagePasserStorageRoot: proof.storageHash,
            stateRoot: block.stateRoot,
            version: outputRootProofVersion,
        },
        targetChain: chain,
        withdrawalProof: maybeAddProofNode((0, keccak256_js_1.keccak256)(slot), proof.storageProof[0].proof),
        withdrawal,
    };
}
function maybeAddProofNode(key, proof) {
    const lastProofRlp = proof[proof.length - 1];
    const lastProof = (0, fromRlp_js_1.fromRlp)(lastProofRlp);
    if (lastProof.length !== 17)
        return proof;
    const modifiedProof = [...proof];
    for (const item of lastProof) {
        if (!Array.isArray(item))
            continue;
        const suffix = item[0].slice(3);
        if (typeof suffix !== 'string' || !key.endsWith(suffix))
            continue;
        modifiedProof.push((0, toRlp_js_1.toRlp)(item));
    }
    return modifiedProof;
}
//# sourceMappingURL=buildProveWithdrawal.js.map