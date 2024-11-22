import { zeroHash } from '../../../constants/bytes.js';
import { AbiConstructorNotFoundError, AbiConstructorParamsNotFoundError, } from '../../../errors/abi.js';
import { encodeAbiParameters } from '../../../utils/abi/encodeAbiParameters.js';
import { encodeFunctionData, } from '../../../utils/abi/encodeFunctionData.js';
import { toHex } from '../../../utils/encoding/toHex.js';
import { contractDeployerAbi } from '../../constants/abis.js';
import { accountAbstractionVersion1 } from '../../constants/contract.js';
import { hashBytecode } from '../hashBytecode.js';
const docsPath = '/docs/contract/encodeDeployData';
export function encodeDeployData(parameters) {
    const { abi, args, bytecode, deploymentType, salt } = parameters;
    if (!args || args.length === 0) {
        const { functionName, argsContractDeployer } = getDeploymentDetails(deploymentType, salt ?? zeroHash, toHex(hashBytecode(bytecode)), '0x');
        return encodeFunctionData({
            abi: contractDeployerAbi,
            functionName,
            args: argsContractDeployer,
        });
    }
    const description = abi.find((x) => 'type' in x && x.type === 'constructor');
    if (!description)
        throw new AbiConstructorNotFoundError({ docsPath });
    if (!('inputs' in description))
        throw new AbiConstructorParamsNotFoundError({ docsPath });
    if (!description.inputs || description.inputs.length === 0)
        throw new AbiConstructorParamsNotFoundError({ docsPath });
    const data = encodeAbiParameters(description.inputs, args);
    const { functionName, argsContractDeployer } = getDeploymentDetails(deploymentType, salt ?? zeroHash, toHex(hashBytecode(bytecode)), data);
    return encodeFunctionData({
        abi: contractDeployerAbi,
        functionName,
        args: argsContractDeployer,
    });
}
function getDeploymentDetails(deploymentType, salt, bytecodeHash, data) {
    const contractDeploymentArgs = [salt, bytecodeHash, data];
    const deploymentOptions = {
        create: {
            functionName: 'create',
            argsContractDeployer: contractDeploymentArgs,
        },
        create2: {
            functionName: 'create2',
            argsContractDeployer: contractDeploymentArgs,
        },
        createAccount: {
            functionName: 'createAccount',
            argsContractDeployer: [
                ...contractDeploymentArgs,
                accountAbstractionVersion1,
            ],
        },
        create2Account: {
            functionName: 'create2Account',
            argsContractDeployer: [
                ...contractDeploymentArgs,
                accountAbstractionVersion1,
            ],
        },
    };
    const deploymentKey = deploymentType || 'create';
    return deploymentOptions[deploymentKey];
}
//# sourceMappingURL=encodeDeployData.js.map