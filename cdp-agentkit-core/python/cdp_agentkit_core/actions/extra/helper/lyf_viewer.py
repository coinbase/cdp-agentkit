from cdp import SmartContract, Wallet
from .abi import LYF_LENDING_POOL_ABI, LYF_POSITION_MANAGER_ABI
from .addresses import lyf_addresses
from .lyf_info import (get_concise_lyf_farming_info, get_token_price, get_pair_info,
                       get_apr_and_tvl_change_for_lyf_farming)
from .graph import get_farming_vault_id, get_vault_address
from .erc20 import get_symbol_of, get_decimals_of
from decimal import getcontext, Decimal
from concurrent.futures import ThreadPoolExecutor, as_completed


getcontext().prec = 25


def get_pool_token_address(wallet: Wallet, pool_id: str) -> str | None:
    pool_state = get_pool_status(wallet, pool_id)
    if pool_state is None:
        return None
    token_address = pool_state.get("underlyingTokenAddress")
    return token_address


def get_pool_status(wallet: Wallet, pool_id: str) -> dict | None:
    try:
        pool_ids_array = [pool_id]
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]

        reserve_status = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="getReserveStatus",
            abi=LYF_LENDING_POOL_ABI,
            args={"reserveIdArr": pool_ids_array}
        )
        if not isinstance(reserve_status, list):
            raise TypeError("Reserve status must be a list")
        return reserve_status[0]
    except Exception as e:
        return None


def get_pool_state(wallet: Wallet, pool_id: str) -> dict | None:
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]

        reserve_state = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="reserves",
            abi=LYF_LENDING_POOL_ABI,
            args={"poolId": pool_id}
        )
        if not isinstance(reserve_state, dict):
            raise TypeError("Reserve state must be a dictionary")
        return reserve_state
    except Exception as e:
        return None


def get_lyf_lending_pool_positions(wallet: Wallet, pool_ids: list[str]) -> list | None:
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        user_positions = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="getPositionStatus",
            abi=LYF_LENDING_POOL_ABI,
            args={
                "reserveIdArr": pool_ids,
                "user": wallet.default_address.address_id}
        )
        if not isinstance(user_positions, list):
            raise TypeError("User positions must be a list")
        return user_positions
    except Exception as e:
        return None


def get_lyf_farming_vault_state(wallet: Wallet, vault_id: str) -> dict | None:
    try:
        position_manager = lyf_addresses[wallet.network_id]["VaultPositionManager"]
        vault_state = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=position_manager,
            method="getVault",
            abi=LYF_POSITION_MANAGER_ABI,
            args={"vaultId": vault_id}
        )
        if not isinstance(vault_state, dict):
            raise TypeError("Vault state must be a dictionary")
        return vault_state
    except Exception as e:
        return None


def fetch_vault_info(wallet, info):
    vault_id = get_farming_vault_id(info["pair_address"])
    if vault_id is None:
        return None
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return None
    token0 = info["token0"]
    token0_symbol = get_symbol_of(wallet, token0)
    if token0_symbol is None:
        return None
    token1 = info["token1"]
    token1_symbol = get_symbol_of(wallet, token1)
    if token1_symbol is None:
        return None
    vault_address = get_vault_address(vault_id)
    if vault_address is None:
        return None

    return {
        "vault_id": vault_id,
        "vault_address": vault_address,
        "symbol": info["symbol"],
        "pair_address": info["pair_address"],
        "stable": info["stable"],
        "token0": token0,
        "token0_symbol": token0_symbol,
        "token1": token1,
        "token1_symbol": token1_symbol,
        "apr": info["apr"],
        "tvl": info["tvl"],
        "max_leverage": vault_state["maxLeverage"],
        "liquidateDebtRatio": vault_state["liquidateDebtRatio"],
        "minSwapAmount0": vault_state["minSwapAmount0"],
        "minSwapAmount1": vault_state["minSwapAmount1"],
    }


def get_lyf_farming_vaults_info(wallet: Wallet) -> list | None:
    farming_info = get_concise_lyf_farming_info()
    if farming_info is None:
        return None
    vaults_info = []
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetch_vault_info, wallet, info) for info in farming_info]
        for future in as_completed(futures):
            result = future.result()
            if result is not None:
                vaults_info.append(result)
    return vaults_info


def get_lyf_lending_pool_id_from_debt_position(wallet: Wallet, debt_position_id: str) -> str | None:
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        debt_positions = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="debtPositions",
            abi=LYF_LENDING_POOL_ABI,
            args={"debtId": debt_position_id}
        )
        if not isinstance(debt_positions, dict):
            raise TypeError("Debt positions must be a dictionary")
        return str(debt_positions.get("reserveId"))
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_lyf_vault_related_lending_pool_ids(wallet: Wallet, vault_id: str) -> list | None:
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return None
    pool_ids = []
    debt_position_0 = str(vault_state.get("debtPositionId0"))
    token0_pool_id = get_lyf_lending_pool_id_from_debt_position(wallet, debt_position_0)
    if token0_pool_id is None:
        return None
    pool_ids.append(token0_pool_id)
    debt_position_1 = str(vault_state.get("debtPositionId1"))
    token1_pool_id = get_lyf_lending_pool_id_from_debt_position(wallet, debt_position_1)
    if token1_pool_id is None:
        return None
    pool_ids.append(token1_pool_id)
    return pool_ids


def get_lyf_vault_borrow_credits(wallet: Wallet, pool_id: str, vault_address: str) -> int | None:
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        borrow_credits = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="credits",
            abi=LYF_LENDING_POOL_ABI,
            args={"poolId": pool_id, "vaultAddress": vault_address}
        )
        if not isinstance(borrow_credits, int):
            raise TypeError("Borrow credits must be an integer")
        return borrow_credits
    except Exception as e:
        return None


def get_lyf_lending_total_available(wallet: Wallet, pool_id: str) -> int | None:
    try:
        lending_pool_address = lyf_addresses[wallet.network_id]["LendingPoolContractAddress"]
        total_borrows = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="totalBorrowsOfReserve",
            abi=LYF_LENDING_POOL_ABI,
            args={"reserveId": pool_id}
        )
        if not isinstance(total_borrows, int):
            raise TypeError("Total available must be an integer")
        total_liquidity = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=lending_pool_address,
            method="totalLiquidityOfReserve",
            abi=LYF_LENDING_POOL_ABI,
            args={"reserveId": pool_id}
        )
        if not isinstance(total_liquidity, int):
            raise TypeError("Total liquidity must be an integer")
        max_borrows = int(total_liquidity * 0.8)
        if total_borrows >= max_borrows:
            total_available = 0
        else:
            total_available = max_borrows - total_borrows
        return total_available
    except Exception as e:
        return None


def get_lyf_vault_borrow_available(wallet: Wallet, pool_id: str, vault_address: str) -> int | None:
    vault_credits = get_lyf_vault_borrow_credits(wallet, pool_id, vault_address)
    if vault_credits is None:
        return None
    total_available = get_lyf_lending_total_available(wallet, pool_id)
    if total_available is None:
        return None
    return min(vault_credits, total_available)


def get_basic_pair_apr_tvl(wallet: Wallet, pair_address: str) -> tuple[float, float]:
    try:
        pair = get_pair_info(pair_address)
        if pair is not None:
            token0_address = pair.get("token0")
            token0_reserve = pair.get("reserve0")
            token1_address = pair.get("token1")
            token1_reserve = pair.get("reserve1")
            liquidity = pair.get("liquidity")
            gauge_liquidity = pair.get("gauge_liquidity")
            emissions_address = pair.get("emissions_token")
            emissions = pair.get("emissions")

            token0_value = get_token_value(wallet, token0_address, token0_reserve)
            if token0_value is None:
                return 0.0, 0.0

            token1_value = get_token_value(wallet, token1_address, token1_reserve)
            if token1_value is None:
                return 0.0, 0.0

            emissions_value = get_token_value(wallet, emissions_address, emissions)
            if emissions_value is None:
                return 0.0, 0.0

            tvl = token0_value + token1_value

            gauge_tvl = Decimal(tvl) * (Decimal(gauge_liquidity) / Decimal(liquidity))

            yearly_emissions = Decimal(emissions_value) * Decimal('31536000')
            # 31536000 = 365 * 24 * 3600

            apr = yearly_emissions / gauge_tvl * Decimal('100')
            return float(apr), float(tvl)
        else:
            return 0.0, 0.0
    except Exception as e:
        print(f"Error: {e}")
        return 0.0, 0.0


def get_update_borrow_interest(wallet: Wallet, pool_id: str, borrow_changed: str, liquidity_changed: str) -> int | None:
    pool_state = get_pool_status(wallet, pool_id)
    if pool_state is None:
        return None
    total_borrows = pool_state.get("totalBorrows")
    total_liquidity = pool_state.get("totalLiquidity")
    utilization_rate = ((Decimal(total_borrows) + Decimal(borrow_changed)) /
                        (Decimal(total_liquidity) + Decimal(liquidity_changed)))
    borrowing_rate = calculate_lyf_lending_pool_borrowing_rate(wallet, utilization_rate, pool_id)
    if borrowing_rate is None:
        return None
    return borrowing_rate


def get_token_value(wallet: Wallet, token_address: str, amount: int) -> float | None:
    token_price = get_token_price(token_address)
    if token_price is None:
        return None
    decimals = get_decimals_of(wallet, token_address)
    if decimals is None:
        return None
    value = Decimal(amount) * Decimal(token_price) / (Decimal(10) ** Decimal(decimals))
    return float(value)


def calculate_lyf_lending_pool_borrowing_rate(wallet: Wallet, utilization_rate, pool_id) -> int | None:
    max_utilization = Decimal(10) ** Decimal(18)
    utilization_rate = Decimal(utilization_rate * 10 ** 18)
    pool_state = get_pool_state(wallet, pool_id)
    if pool_state is None:
        return None
    borrowing_rate_config = pool_state.get("borrowingRateConfig")

    utilization_a = Decimal(borrowing_rate_config.get("utilizationA"))
    utilization_b = Decimal(borrowing_rate_config.get("utilizationB"))
    borrowing_rate_a = Decimal(borrowing_rate_config.get("borrowingRateA"))
    borrowing_rate_b = Decimal(borrowing_rate_config.get("borrowingRateB"))
    max_borrowing_rate = Decimal(borrowing_rate_config.get("maxBorrowingRate"))

    if utilization_rate <= utilization_a:
        if utilization_a == Decimal(0):
            return int(borrowing_rate_a)
        borrowing_rate = utilization_rate * borrowing_rate_a / utilization_a
    elif utilization_rate <= utilization_b:
        if utilization_b == utilization_a:
            return int(borrowing_rate_b)
        borrowing_rate = ((borrowing_rate_b - borrowing_rate_a) * (utilization_rate - utilization_a)
                          / (utilization_b - utilization_a) + borrowing_rate_a)
    else:
        if utilization_b >= max_utilization:
            return int(max_borrowing_rate)
        borrowing_rate = (max_borrowing_rate - borrowing_rate_b) * (utilization_rate - utilization_b) / (
                max_utilization - utilization_b) + borrowing_rate_b

    return int(borrowing_rate)


def get_lyf_base_apr(wallet: Wallet, vault_id: str, token0_supply: int, token0_borrow: int,
                     token1_supply: int, token1_borrow: int) -> float | None:
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    if vault_state is None:
        return None
    pair_address = vault_state.get("pair")
    token0_address = vault_state.get("token0")
    token1_address = vault_state.get("token1")
    token0_total_amount = token0_supply + token0_borrow
    token1_total_amount = token1_supply + token1_borrow
    token0_total_value = get_token_value(wallet, token0_address, token0_total_amount)
    token1_total_value = get_token_value(wallet, token1_address, token1_total_amount)

    apr, tvl = get_basic_pair_apr_tvl(wallet, pair_address)
    if apr == 0.0 or tvl == 0.0:
        return None
    base_apr = ((Decimal(apr) * Decimal(tvl)) / (Decimal(token0_total_value + token1_total_value) + Decimal(tvl))
                / Decimal(100))
    return float(base_apr)


def get_lyf_equity_changes_and_apy(initial_equity: float, leverage: int, base_apr: float,
                                   token0_borrow_proportion: float, token0_borrow_interest: int,
                                   token1_borrow_interest: int) -> tuple[float, float]:
    weighted_borrow_interest = (token0_borrow_proportion * token0_borrow_interest +
                                (1 - token0_borrow_proportion) * token1_borrow_interest) / 10 ** 18
    initial_position = initial_equity * leverage / 100
    position_after_a_year = initial_position * (1 + base_apr)
    debt_after_a_year = (initial_position - initial_equity) * (1 + weighted_borrow_interest)
    equity_after_a_year = (position_after_a_year - debt_after_a_year)
    apr = (equity_after_a_year - initial_equity) / initial_equity
    return equity_after_a_year, apr


def get_lyf_farming_apy(wallet: Wallet, vault_id: str, token0_supply: int, token0_borrow: int,
                        token1_supply: int, token1_borrow: int, leverage: int) -> float | None:
    base_apr = get_lyf_base_apr(wallet, vault_id, token0_supply, token0_borrow, token1_supply, token1_borrow)
    if base_apr is None:
        return None
    related_pool_ids = get_lyf_vault_related_lending_pool_ids(wallet, vault_id)
    if related_pool_ids is None:
        return None
    vault_state = get_lyf_farming_vault_state(wallet, vault_id)
    token0_address = vault_state.get("token0")
    token1_address = vault_state.get("token1")
    try:
        token0_borrow_proportion = Decimal(token0_borrow) / (Decimal(token0_borrow) + Decimal(token1_borrow))
        token0_borrow_interest = get_update_borrow_interest(wallet, related_pool_ids[0],
                                                            str(token0_borrow), '0')
        if token0_borrow_interest is None:
            return None
        token1_borrow_interest = get_update_borrow_interest(wallet, related_pool_ids[1],
                                                            str(token1_borrow), '0')
        if token1_borrow_interest is None:
            return None

        token0_value = get_token_value(wallet, token0_address, token0_supply)
        if token0_value is None:
            return None
        token1_value = get_token_value(wallet, token1_address, token1_supply)
        if token1_value is None:
            return None
        initial_equity = token0_value + token1_value

        equity_after_a_year, apy = get_lyf_equity_changes_and_apy(initial_equity,
                                                                  leverage, base_apr, float(token0_borrow_proportion),
                                                                  token0_borrow_interest, token1_borrow_interest)
        return apy
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_vault_position(wallet: Wallet, vault_id: str, position_id: str) -> dict | None:
    try:
        position_manager_address = lyf_addresses[wallet.network_id]["VaultPositionManager"]
        vault_position = SmartContract.read(
            network_id=wallet.network_id,
            contract_address=position_manager_address,
            method="getVaultPosition",
            abi=LYF_POSITION_MANAGER_ABI,
            args={"vaultId": vault_id, "vaultPositionId": position_id}
        )
        if not isinstance(vault_position, dict):
            raise TypeError("Vault position must be a dictionary")
        return vault_position
    except Exception as e:
        return None


def get_historical_farming_apr_tvl(wallet: Wallet, vault_id: str) -> dict | None:
    state = get_lyf_farming_vault_state(wallet, vault_id)
    if state is None:
        return None
    pair_address = state.get("pair")
    info = get_apr_and_tvl_change_for_lyf_farming(pair_address)
    if info is None:
        return None
    return info
