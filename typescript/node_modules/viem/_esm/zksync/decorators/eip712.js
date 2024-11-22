import { writeContract } from '../../actions/wallet/writeContract.js';
import { deployContract, } from '../actions/deployContract.js';
import { sendTransaction, } from '../actions/sendTransaction.js';
import { signTransaction, } from '../actions/signTransaction.js';
export function eip712WalletActions() {
    return (client) => ({
        sendTransaction: (args) => sendTransaction(client, args),
        signTransaction: (args) => signTransaction(client, args),
        deployContract: (args) => deployContract(client, args),
        writeContract: (args) => writeContract(Object.assign(client, {
            sendTransaction: (args) => sendTransaction(client, args),
        }), args),
    });
}
//# sourceMappingURL=eip712.js.map