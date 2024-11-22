import { getChainId, } from '../../actions/public/getChainId.js';
import { addChain, } from '../../actions/wallet/addChain.js';
import { deployContract, } from '../../actions/wallet/deployContract.js';
import { getAddresses, } from '../../actions/wallet/getAddresses.js';
import { getPermissions, } from '../../actions/wallet/getPermissions.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
import { requestAddresses, } from '../../actions/wallet/requestAddresses.js';
import { requestPermissions, } from '../../actions/wallet/requestPermissions.js';
import { sendRawTransaction, } from '../../actions/wallet/sendRawTransaction.js';
import { sendTransaction, } from '../../actions/wallet/sendTransaction.js';
import { signMessage, } from '../../actions/wallet/signMessage.js';
import { signTransaction, } from '../../actions/wallet/signTransaction.js';
import { signTypedData, } from '../../actions/wallet/signTypedData.js';
import { switchChain, } from '../../actions/wallet/switchChain.js';
import { watchAsset, } from '../../actions/wallet/watchAsset.js';
import { writeContract, } from '../../actions/wallet/writeContract.js';
export function walletActions(client) {
    return {
        addChain: (args) => addChain(client, args),
        deployContract: (args) => deployContract(client, args),
        getAddresses: () => getAddresses(client),
        getChainId: () => getChainId(client),
        getPermissions: () => getPermissions(client),
        prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
        requestAddresses: () => requestAddresses(client),
        requestPermissions: (args) => requestPermissions(client, args),
        sendRawTransaction: (args) => sendRawTransaction(client, args),
        sendTransaction: (args) => sendTransaction(client, args),
        signMessage: (args) => signMessage(client, args),
        signTransaction: (args) => signTransaction(client, args),
        signTypedData: (args) => signTypedData(client, args),
        switchChain: (args) => switchChain(client, args),
        watchAsset: (args) => watchAsset(client, args),
        writeContract: (args) => writeContract(client, args),
    };
}
//# sourceMappingURL=wallet.js.map