"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithdrawalStatus = getWithdrawalStatus;
const readContract_js_1 = require("../../actions/public/readContract.js");
const contract_js_1 = require("../../errors/contract.js");
const abis_js_1 = require("../abis.js");
const withdrawal_js_1 = require("../errors/withdrawal.js");
const getWithdrawals_js_1 = require("../utils/getWithdrawals.js");
const getGame_js_1 = require("./getGame.js");
const getL2Output_js_1 = require("./getL2Output.js");
const getPortalVersion_js_1 = require("./getPortalVersion.js");
const getTimeToFinalize_js_1 = require("./getTimeToFinalize.js");
async function getWithdrawalStatus(client, parameters) {
    const { chain = client.chain, gameLimit = 100, receipt, targetChain: targetChain_, logIndex = 0, } = parameters;
    const targetChain = targetChain_;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const withdrawal = (0, getWithdrawals_js_1.getWithdrawals)(receipt)[logIndex];
    if (!withdrawal)
        throw new withdrawal_js_1.ReceiptContainsNoWithdrawalsError({
            hash: receipt.transactionHash,
        });
    const portalVersion = await (0, getPortalVersion_js_1.getPortalVersion)(client, parameters);
    if (portalVersion.major < 3) {
        const [outputResult, proveResult, finalizedResult, timeToFinalizeResult] = await Promise.allSettled([
            (0, getL2Output_js_1.getL2Output)(client, {
                ...parameters,
                l2BlockNumber: receipt.blockNumber,
            }),
            (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.portalAbi,
                address: portalAddress,
                functionName: 'provenWithdrawals',
                args: [withdrawal.withdrawalHash],
            }),
            (0, readContract_js_1.readContract)(client, {
                abi: abis_js_1.portalAbi,
                address: portalAddress,
                functionName: 'finalizedWithdrawals',
                args: [withdrawal.withdrawalHash],
            }),
            (0, getTimeToFinalize_js_1.getTimeToFinalize)(client, {
                ...parameters,
                withdrawalHash: withdrawal.withdrawalHash,
            }),
        ]);
        if (outputResult.status === 'rejected') {
            const error = outputResult.reason;
            if (error.cause instanceof contract_js_1.ContractFunctionRevertedError &&
                error.cause.data?.args?.[0] ===
                    'L2OutputOracle: cannot get output for a block that has not been proposed')
                return 'waiting-to-prove';
            throw error;
        }
        if (proveResult.status === 'rejected')
            throw proveResult.reason;
        if (finalizedResult.status === 'rejected')
            throw finalizedResult.reason;
        if (timeToFinalizeResult.status === 'rejected')
            throw timeToFinalizeResult.reason;
        const [_, proveTimestamp] = proveResult.value;
        if (!proveTimestamp)
            return 'ready-to-prove';
        const finalized = finalizedResult.value;
        if (finalized)
            return 'finalized';
        const { seconds } = timeToFinalizeResult.value;
        return seconds > 0 ? 'waiting-to-finalize' : 'ready-to-finalize';
    }
    const numProofSubmitters = await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.portal2Abi,
        address: portalAddress,
        functionName: 'numProofSubmitters',
        args: [withdrawal.withdrawalHash],
    }).catch(() => 1n);
    const proofSubmitter = await (0, readContract_js_1.readContract)(client, {
        abi: abis_js_1.portal2Abi,
        address: portalAddress,
        functionName: 'proofSubmitters',
        args: [withdrawal.withdrawalHash, numProofSubmitters - 1n],
    }).catch(() => withdrawal.sender);
    const [disputeGameResult, checkWithdrawalResult, finalizedResult] = await Promise.allSettled([
        (0, getGame_js_1.getGame)(client, {
            ...parameters,
            l2BlockNumber: receipt.blockNumber,
            limit: gameLimit,
        }),
        (0, readContract_js_1.readContract)(client, {
            abi: abis_js_1.portal2Abi,
            address: portalAddress,
            functionName: 'checkWithdrawal',
            args: [withdrawal.withdrawalHash, proofSubmitter],
        }),
        (0, readContract_js_1.readContract)(client, {
            abi: abis_js_1.portal2Abi,
            address: portalAddress,
            functionName: 'finalizedWithdrawals',
            args: [withdrawal.withdrawalHash],
        }),
    ]);
    if (finalizedResult.status === 'fulfilled' && finalizedResult.value)
        return 'finalized';
    if (disputeGameResult.status === 'rejected') {
        const error = disputeGameResult.reason;
        if (error.name === 'GameNotFoundError')
            return 'waiting-to-prove';
        throw disputeGameResult.reason;
    }
    if (checkWithdrawalResult.status === 'rejected') {
        const error = checkWithdrawalResult.reason;
        if (error.cause instanceof contract_js_1.ContractFunctionRevertedError) {
            const errorMessage = error.cause.data?.args?.[0];
            if (errorMessage === 'OptimismPortal: invalid game type' ||
                errorMessage === 'OptimismPortal: withdrawal has not been proven yet' ||
                errorMessage ===
                    'OptimismPortal: withdrawal has not been proven by proof submitter address yet' ||
                errorMessage ===
                    'OptimismPortal: dispute game created before respected game type was updated')
                return 'ready-to-prove';
            if (errorMessage ===
                'OptimismPortal: proven withdrawal has not matured yet' ||
                errorMessage ===
                    'OptimismPortal: output proposal has not been finalized yet' ||
                errorMessage === 'OptimismPortal: output proposal in air-gap')
                return 'waiting-to-finalize';
            if (error.cause.data?.errorName === 'InvalidGameType')
                return 'ready-to-prove';
        }
        throw checkWithdrawalResult.reason;
    }
    if (finalizedResult.status === 'rejected')
        throw finalizedResult.reason;
    return 'ready-to-finalize';
}
//# sourceMappingURL=getWithdrawalStatus.js.map