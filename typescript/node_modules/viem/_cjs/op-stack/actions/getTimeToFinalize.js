"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeToFinalize = getTimeToFinalize;
const multicall_js_1 = require("../../actions/public/multicall.js");
const readContract_js_1 = require("../../actions/public/readContract.js");
const base_js_1 = require("../../errors/base.js");
const abis_js_1 = require("../abis.js");
const getPortalVersion_js_1 = require("./getPortalVersion.js");
const buffer = 10;
async function getTimeToFinalize(client, parameters) {
    const { chain = client.chain, withdrawalHash, targetChain } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const portalVersion = await (0, getPortalVersion_js_1.getPortalVersion)(client, { portalAddress });
    if (portalVersion.major < 3) {
        const l2OutputOracleAddress = (() => {
            if (parameters.l2OutputOracleAddress)
                return parameters.l2OutputOracleAddress;
            if (chain)
                return targetChain.contracts.l2OutputOracle[chain.id].address;
            return Object.values(targetChain.contracts.l2OutputOracle)[0].address;
        })();
        const [[_outputRoot, proveTimestamp, _l2OutputIndex], period] = await (0, multicall_js_1.multicall)(client, {
            allowFailure: false,
            contracts: [
                {
                    abi: abis_js_1.portalAbi,
                    address: portalAddress,
                    functionName: 'provenWithdrawals',
                    args: [withdrawalHash],
                },
                {
                    abi: abis_js_1.l2OutputOracleAbi,
                    address: l2OutputOracleAddress,
                    functionName: 'FINALIZATION_PERIOD_SECONDS',
                },
            ],
        });
        const secondsSinceProven = Date.now() / 1000 - Number(proveTimestamp);
        const secondsToFinalize = Number(period) - secondsSinceProven;
        const seconds = Math.floor(secondsToFinalize < 0 ? 0 : secondsToFinalize + buffer);
        const timestamp = Date.now() + seconds * 1000;
        return { period: Number(period), seconds, timestamp };
    }
    const numProofSubmitters = await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.portal2Abi,
        address: portalAddress,
        functionName: 'numProofSubmitters',
        args: [withdrawalHash],
    }).catch(() => 1n);
    const proofSubmitter = await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.portal2Abi,
        address: portalAddress,
        functionName: 'proofSubmitters',
        args: [withdrawalHash, numProofSubmitters - 1n],
    }).catch(() => undefined);
    const [[_disputeGameProxy, proveTimestamp], proofMaturityDelaySeconds] = await Promise.all([
        proofSubmitter
            ? (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.portal2Abi,
                address: portalAddress,
                functionName: 'provenWithdrawals',
                args: [withdrawalHash, proofSubmitter],
            })
            : Promise.resolve(['0x', 0n]),
        (0, readContract_js_1.readContract)(client, {
            abi: abis_js_1.portal2Abi,
            address: portalAddress,
            functionName: 'proofMaturityDelaySeconds',
        }),
    ]);
    if (proveTimestamp === 0n)
        throw new base_js_1.BaseError('Withdrawal has not been proven on L1.');
    const secondsSinceProven = Date.now() / 1000 - Number(proveTimestamp);
    const secondsToFinalize = Number(proofMaturityDelaySeconds) - secondsSinceProven;
    const seconds = Math.floor(secondsToFinalize < 0n ? 0 : secondsToFinalize + buffer);
    const timestamp = Date.now() + seconds * 1000;
    return { period: Number(proofMaturityDelaySeconds), seconds, timestamp };
}
//# sourceMappingURL=getTimeToFinalize.js.map