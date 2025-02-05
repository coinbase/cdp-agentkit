# Product Requirements: Python EvmWalletProvider Implementation

## Overview
Port the TypeScript EvmWalletProvider to Python, implementing EVM wallet functionality using eth-account and web3.py packages. This implementation will serve as the base class for all EVM-compatible wallet providers in the Python AgentKit.

## Core Requirements

### 1. Class Structure
- Inherit from base WalletProvider class
- Implement all abstract methods from WalletProvider
- Mirror TypeScript EvmWalletProvider interface
- Use Python type hints throughout

### 2. Dependencies
Required packages:
- eth-account>=0.8.0
- web3>=6.0.0
- pydantic>=2.0.0

### 3. Core Functionality

#### Message Signing
```python
async def sign_message(self, message: str | bytes) -> str:
    """Sign a message using the wallet's private key."""
```

#### Typed Data Signing (EIP-712)
```python
async def sign_typed_data(self, typed_data: Dict[str, Any]) -> str:
    """Sign typed data according to EIP-712 standard."""
```

#### Transaction Operations
```python
async def sign_transaction(self, transaction: Dict[str, Any]) -> str:
    """Sign an EVM transaction."""

async def send_transaction(self, transaction: Dict[str, Any]) -> str:
    """Send a signed transaction to the network."""

async def wait_for_transaction_receipt(self, tx_hash: str) -> Dict[str, Any]:
    """Wait for transaction confirmation and return receipt."""
```

#### Contract Interactions
```python
async def read_contract(self, params: Dict[str, Any]) -> Any:
    """Read data from a smart contract."""
```

### 4. Type Safety
- Use TypedDict for transaction parameters
- Define clear interfaces for contract interaction parameters
- Implement proper error handling and type checking
- Use Python's typing module extensively

### 5. Error Handling
Standard error types to implement:
- InvalidTransaction
- SigningError
- NetworkError
- ContractError

### 6. Integration Requirements
- Must work seamlessly with existing ActionProvider system
- Support async/await pattern throughout
- Maintain compatibility with web3.py's async providers

## Technical Specifications

### Transaction Type Definition
```python
class EvmTransaction(TypedDict):
    to: str | None
    from_: str | None
    nonce: int | None
    gas: int | None
    gasPrice: int | None
    maxFeePerGas: int | None
    maxPriorityFeePerGas: int | None
    data: str | None
    value: int | None
    chainId: int | None
    type: int | None
```

### Contract Parameters Type
```python
class ContractParameters(TypedDict):
    address: str
    abi: List[Dict[str, Any]]
    function_name: str
    args: List[Any]
```

## Implementation Guidelines

1. Use eth-account for:
   - Message signing
   - Transaction signing
   - EIP-712 typed data signing

2. Use web3.py for:
   - Network interactions
   - Contract calls
   - Transaction management
   - Chain ID validation

3. Testing Requirements:
   - Unit tests for all signing operations
   - Integration tests with local EVM chain
   - Mock provider tests
   - Type checking tests

## Migration Notes

Key differences from TypeScript version:
1. Python uses snake_case instead of camelCase
2. Async/await implementation differs
3. Type system implementation varies
4. Error handling patterns differ

## Future Considerations

1. Support for:
   - EIP-1559 transactions
   - Multiple account management
   - Hardware wallet integration
   - Custom RPC endpoints

2. Performance optimizations:
   - Connection pooling
   - Batch requests
   - Caching

Would you like me to proceed with implementing this specification? 