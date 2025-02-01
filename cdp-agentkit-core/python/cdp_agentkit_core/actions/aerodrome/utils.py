from cdp import Wallet
from web3 import Web3
from decimal import Decimal

from cdp_agentkit_core.actions.constants import ERC20_BALANCE_ABI
from cdp_agentkit_core.actions.aerodrome.constants import (
    AERODROME_FACTORY_ABI,
    AERODROME_FACTORY_ADDRESS,
    AERODROME_POOL_ABI,
    BASE_RPC_URL,
)

def create_web3(network_id: str = "base-mainnet") -> Web3:
    """Create a Web3 instance based on network ID."""
    if network_id == "base-mainnet":
        return Web3(Web3.HTTPProvider(BASE_RPC_URL))
    else:
        raise ValueError(f"Unsupported network: {network_id}")

def read_contract(
    web3: Web3,
    contract_address: str,
    abi: list,
    method: str,
    args: list = None
):
    """Read data from a contract using web3."""
    # Ensure contract address is checksummed
    contract_address = Web3.to_checksum_address(contract_address)
    
    contract = web3.eth.contract(
        address=contract_address,
        abi=abi
    )
    
    if args is None:
        args = []
    
    # If any args are addresses, convert them to checksum
    processed_args = []
    for arg in args:
        if isinstance(arg, str) and arg.startswith('0x') and len(arg) == 42:
            processed_args.append(Web3.to_checksum_address(arg))
        else:
            processed_args.append(arg)
            
    return getattr(contract.functions, method)(*processed_args).call()

def get_token_balance(wallet: Wallet, token_address: str, account: str) -> int:
    """Get the token balance for a specific account.
    
    Args:
        wallet (Wallet): The wallet instance to use for the query
        token_address (str): The address of the token contract
        account (str): The address to check the balance for
        
    Returns:
        int: The token balance in atomic units
    """
    try:
        # Create Web3 instance
        web3 = create_web3(wallet.network_id)
        
        result = read_contract(
            web3=web3,
            contract_address=token_address,
            abi=ERC20_BALANCE_ABI,
            method="balanceOf",
            args=[account]
        )
        
        return int(result)
    except Exception as e:
        raise ValueError(f"Error getting token balance: {e!s}")

def get_lp_token_address(wallet: Wallet, token_a: str, token_b: str, stable: bool) -> str:
    """Get LP token address for a given pair."""
    try:
        # Convert addresses to checksum format
        token_a = Web3.to_checksum_address(token_a)
        token_b = Web3.to_checksum_address(token_b)
        
        # Sort tokens for consistent ordering
        sorted_tokens = sorted([token_a, token_b])
        print(f"\nGetting LP token address:")
        print(f"Token A: {token_a}")
        print(f"Token B: {token_b}")
        print(f"Stable: {stable}")
        print(f"Sorted tokens: {sorted_tokens}")
        
        # Query factory contract using web3
        lp_token_address = read_contract(
            web3=create_web3(wallet.network_id),
            contract_address=AERODROME_FACTORY_ADDRESS,
            abi=AERODROME_FACTORY_ABI,
            method="getPool",
            args=[sorted_tokens[0], sorted_tokens[1], stable]
        )
        
        print(f"Returned LP address: {lp_token_address}")
        
        if lp_token_address == "0x0000000000000000000000000000000000000000":
            # Try the reverse stable flag if the pool wasn't found
            print(f"Pool not found, trying with stable={not stable}")
            lp_token_address = read_contract(
                web3=create_web3(wallet.network_id),
                contract_address=AERODROME_FACTORY_ADDRESS,
                abi=AERODROME_FACTORY_ABI,
                method="getPool",
                args=[sorted_tokens[0], sorted_tokens[1], not stable]
            )
            print(f"Reverse stable flag LP address: {lp_token_address}")
            
        if lp_token_address == "0x0000000000000000000000000000000000000000":
            raise ValueError("Pool does not exist for given token pair")
            
        return lp_token_address
        
    except Exception as e:
        print(f"Error details: {str(e)}")
        print(f"Error type: {type(e)}")
        raise

def quote_liquidity(amount_a: int, reserve_a: int, reserve_b: int) -> int:
    """Quote liquidity for volatile pools.
    
    Args:
        amount_a: Amount of token A
        reserve_a: Reserve of token A
        reserve_b: Reserve of token B
        
    Returns:
        int: Optimal amount of token B
        
    Raises:
        ValueError: If amount or reserves are invalid
    """
    if amount_a == 0:
        raise ValueError("Insufficient amount")
    if reserve_a == 0 or reserve_b == 0:
        raise ValueError("Insufficient liquidity")
    
    return (amount_a * reserve_b) // reserve_a

def get_reserves(wallet: Wallet, token_a: str, token_b: str, stable: bool, factory: str) -> tuple[int, int]:
    """Get reserves for a pool.
    
    Args:
        wallet: Wallet instance
        token_a: First token address
        token_b: Second token address
        stable: Whether it's a stable pool
        factory: Factory contract address
        
    Returns:
        tuple[int, int]: Reserve amounts for token A and token B
    """
    try:
        # Get pool address first
        pool_address = get_lp_token_address(wallet, token_a, token_b, stable)
        if not pool_address or pool_address == "0x0000000000000000000000000000000000000000":
            print("Pool does not exist")
            return 0, 0

        print(f"Getting reserves from pool: {pool_address}")
        
        # Call getReserves on the pool contract
        reserves = read_contract(
            web3=create_web3(wallet.network_id),
            contract_address=pool_address,  # Use pool address instead of factory
            abi=AERODROME_POOL_ABI,
            method="getReserves",
            args=[]
        )
        
        print(f"Raw reserves response: {reserves}")
        
        # Unpack reserves (returns reserve0, reserve1, timestamp)
        reserve0, reserve1, _ = reserves
        
        # Return reserves in the same order as input tokens
        if token_a.lower() < token_b.lower():
            return reserve0, reserve1
        return reserve1, reserve0
        
    except Exception as e:
        print(f"Error getting reserves: {str(e)}")
        raise

def quote_add_liquidity(
    wallet: Wallet,
    token_a: str,
    token_b: str,
    stable: bool,
    factory: str,
    amount_a_desired: int,
    amount_b_desired: int
) -> tuple[int, int, int]:
    """Quote amounts for adding liquidity.
    
    Args:
        wallet: Wallet instance
        token_a: Address of token A
        token_b: Address of token B
        stable: Whether the pool is stable
        factory: Factory address
        amount_a_desired: Desired amount of token A
        amount_b_desired: Desired amount of token B
        
    Returns:
        tuple[int, int, int]: (amount_a, amount_b, liquidity)
    """
    MINIMUM_LIQUIDITY = 1000  # From Router contract
    
    # Get pool address
    pool = read_contract(
        web3=create_web3(wallet.network_id),
        contract_address=factory,
        abi=AERODROME_FACTORY_ABI,
        method="getPool",
        args=[token_a, token_b, stable]
    )
    
    # Initialize variables
    reserve_a, reserve_b = 0, 0
    total_supply = 0
    
    # If pool exists, get reserves and total supply
    if pool != "0x0000000000000000000000000000000000000000":
        total_supply = read_contract(
            web3=create_web3(wallet.network_id),
            contract_address=pool,
            abi=AERODROME_POOL_ABI,
            method="totalSupply",
            args=[]
        )
        reserve_a, reserve_b = get_reserves(wallet, token_a, token_b, stable, factory)
    
    # If pool is empty (new pool)
    if reserve_a == 0 and reserve_b == 0:
        amount_a = amount_a_desired
        amount_b = amount_b_desired
        liquidity = int((Decimal(amount_a * amount_b).sqrt() - MINIMUM_LIQUIDITY))
    else:
        # Calculate optimal amounts
        amount_b_optimal = quote_liquidity(amount_a_desired, reserve_a, reserve_b)
        
        if amount_b_optimal <= amount_b_desired:
            amount_a = amount_a_desired
            amount_b = amount_b_optimal
        else:
            amount_a_optimal = quote_liquidity(amount_b_desired, reserve_b, reserve_a)
            amount_a = amount_a_optimal
            amount_b = amount_b_desired
        
        # Calculate liquidity amount
        liquidity = min(
            (amount_a * total_supply) // reserve_a,
            (amount_b * total_supply) // reserve_b
        )
    
    return amount_a, amount_b, liquidity 

def get_total_supply(wallet: Wallet, pool_address: str) -> int:
    """Get total supply of LP tokens for a pool."""
    try:
        total_supply = read_contract(
            web3=create_web3(wallet.network_id),
            contract_address=pool_address,
            abi=AERODROME_POOL_ABI,
            method="totalSupply",
            args={}
        )
        print(f"Total supply for pool {pool_address}: {total_supply}")
        return total_supply
    except Exception as e:
        print(f"Error getting total supply: {str(e)}")
        raise 