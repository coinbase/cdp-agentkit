"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchBlockNumber = watchBlockNumber;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
const getAction_js_1 = require("../../utils/getAction.js");
const observe_js_1 = require("../../utils/observe.js");
const poll_js_1 = require("../../utils/poll.js");
const stringify_js_1 = require("../../utils/stringify.js");
const getBlockNumber_js_1 = require("./getBlockNumber.js");
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval, }) {
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
    let prevBlockNumber;
    const pollBlockNumber = () => {
        const observerId = (0, stringify_js_1.stringify)([
            'watchBlockNumber',
            client.uid,
            emitOnBegin,
            emitMissed,
            pollingInterval,
        ]);
        return (0, observe_js_1.observe)(observerId, { onBlockNumber, onError }, (emit) => (0, poll_js_1.poll)(async () => {
            try {
                const blockNumber = await (0, getAction_js_1.getAction)(client, getBlockNumber_js_1.getBlockNumber, 'getBlockNumber')({ cacheTime: 0 });
                if (prevBlockNumber) {
                    if (blockNumber === prevBlockNumber)
                        return;
                    if (blockNumber - prevBlockNumber > 1 && emitMissed) {
                        for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
                            emit.onBlockNumber(i, prevBlockNumber);
                            prevBlockNumber = i;
                        }
                    }
                }
                if (!prevBlockNumber || blockNumber > prevBlockNumber) {
                    emit.onBlockNumber(blockNumber, prevBlockNumber);
                    prevBlockNumber = blockNumber;
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
    const subscribeBlockNumber = () => {
        const observerId = (0, stringify_js_1.stringify)([
            'watchBlockNumber',
            client.uid,
            emitOnBegin,
            emitMissed,
        ]);
        return (0, observe_js_1.observe)(observerId, { onBlockNumber, onError }, (emit) => {
            let active = true;
            let unsubscribe = () => (active = false);
            (async () => {
                try {
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
                        onData(data) {
                            if (!active)
                                return;
                            const blockNumber = (0, fromHex_js_1.hexToBigInt)(data.result?.number);
                            emit.onBlockNumber(blockNumber, prevBlockNumber);
                            prevBlockNumber = blockNumber;
                        },
                        onError(error) {
                            emit.onError?.(error);
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
        });
    };
    return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}
//# sourceMappingURL=watchBlockNumber.js.map