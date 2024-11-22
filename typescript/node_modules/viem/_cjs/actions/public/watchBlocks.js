"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchBlocks = watchBlocks;
const getAction_js_1 = require("../../utils/getAction.js");
const observe_js_1 = require("../../utils/observe.js");
const poll_js_1 = require("../../utils/poll.js");
const stringify_js_1 = require("../../utils/stringify.js");
const getBlock_js_1 = require("./getBlock.js");
function watchBlocks(client, { blockTag = 'latest', emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval, }) {
    const enablePolling = (() => {
        if (typeof poll_ !== 'undefined')
            return poll_;
        if (client.transport.type === 'webSocket')
            return false;
        if (client.transport.type === 'fallback' &&
            client.transport.transports[0].config.type === 'webSocket')
            return false;
        return true;
    })();
    const includeTransactions = includeTransactions_ ?? false;
    let prevBlock;
    const pollBlocks = () => {
        const observerId = (0, stringify_js_1.stringify)([
            'watchBlocks',
            client.uid,
            blockTag,
            emitMissed,
            emitOnBegin,
            includeTransactions,
            pollingInterval,
        ]);
        return (0, observe_js_1.observe)(observerId, { onBlock, onError }, (emit) => (0, poll_js_1.poll)(async () => {
            try {
                const block = await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({
                    blockTag,
                    includeTransactions,
                });
                if (block.number && prevBlock?.number) {
                    if (block.number === prevBlock.number)
                        return;
                    if (block.number - prevBlock.number > 1 && emitMissed) {
                        for (let i = prevBlock?.number + 1n; i < block.number; i++) {
                            const block = (await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({
                                blockNumber: i,
                                includeTransactions,
                            }));
                            emit.onBlock(block, prevBlock);
                            prevBlock = block;
                        }
                    }
                }
                if (!prevBlock?.number ||
                    (blockTag === 'pending' && !block?.number) ||
                    (block.number && block.number > prevBlock.number)) {
                    emit.onBlock(block, prevBlock);
                    prevBlock = block;
                }
            }
            catch (err) {
                emit.onError?.(err);
            }
        }, {
            emitOnBegin,
            interval: pollingInterval,
        }));
    };
    const subscribeBlocks = () => {
        let active = true;
        let emitFetched = true;
        let unsubscribe = () => (active = false);
        (async () => {
            try {
                if (emitOnBegin) {
                    (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({
                        blockTag,
                        includeTransactions,
                    }).then((block) => {
                        if (!active)
                            return;
                        if (!emitFetched)
                            return;
                        onBlock(block, undefined);
                        emitFetched = false;
                    });
                }
                const transport = (() => {
                    if (client.transport.type === 'fallback') {
                        const transport = client.transport.transports.find((transport) => transport.config.type === 'webSocket');
                        if (!transport)
                            return client.transport;
                        return transport.value;
                    }
                    return client.transport;
                })();
                const { unsubscribe: unsubscribe_ } = await transport.subscribe({
                    params: ['newHeads'],
                    async onData(data) {
                        if (!active)
                            return;
                        const block = (await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({
                            blockNumber: data.blockNumber,
                            includeTransactions,
                        }).catch(() => { }));
                        if (!active)
                            return;
                        onBlock(block, prevBlock);
                        emitFetched = false;
                        prevBlock = block;
                    },
                    onError(error) {
                        onError?.(error);
                    },
                });
                unsubscribe = unsubscribe_;
                if (!active)
                    unsubscribe();
            }
            catch (err) {
                onError?.(err);
            }
        })();
        return () => unsubscribe();
    };
    return enablePolling ? pollBlocks() : subscribeBlocks();
}
//# sourceMappingURL=watchBlocks.js.map