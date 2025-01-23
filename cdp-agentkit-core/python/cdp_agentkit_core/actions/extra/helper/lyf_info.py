import requests
import time


pair_infos = {}
pair_timeout_at = 0


def get_lyf_info() -> dict | None:
    static_url = "https://extra-static.s3.ap-southeast-1.amazonaws.com/data/pools/info-base.json"
    try:
        response = requests.get(static_url)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        return None


def get_latest_lyf_info() -> dict | None:
    lyf_info = get_lyf_info()
    if lyf_info is not None:
        return lyf_info[-1]
    else:
        return None


def get_latest_lyf_lending_pool_info() -> dict | None:
    latest_lyf_info = get_latest_lyf_info()
    if latest_lyf_info is not None:
        return latest_lyf_info["lend"]
    else:
        return None


def get_latest_lyf_farming_info() -> dict | None:
    latest_lyf_info = get_latest_lyf_info()
    if latest_lyf_info is not None:
        return latest_lyf_info["farm"]
    else:
        return None


def get_latest_available_lyf_lending_pool_info() -> list | None:
    latest_lyf_lending_pool_info = get_latest_lyf_lending_pool_info()
    if latest_lyf_lending_pool_info is not None:
        available = []
        for info in latest_lyf_lending_pool_info:
            pool_key = info.get("poolKey")
            if pool_key is not None:
                if info["apr"] > 0.01:
                    if pool_key in ["WETH"]:
                        available.append(info)
                        continue
                    if info["totalLiquidity"] > 200000:
                        if info["borrowingRate"] > 0.09:
                            available.append(info)
                            continue
        return available
    else:
        return None


def get_latest_available_lyf_farming_info() -> list | None:
    latest_lyf_farming_info = get_latest_lyf_farming_info()
    if latest_lyf_farming_info is not None:
        available = []
        for info in latest_lyf_farming_info:
            tvl = info.get("tvl")
            if tvl is not None:
                if tvl > 200000:
                    available.append(info)
        return available
    else:
        return None


def get_apr_change_for_lyf_lending_pool(pool_id: str) -> dict | None:
    pool_info = {}
    initialized = False
    lyf_info = get_lyf_info()
    if lyf_info is not None:
        for info in lyf_info:
            ts = info["ts"]
            for pool in info["lend"]:
                if pool["id"] == pool_id:
                    if not initialized:
                        pool_info["pool_id"] = pool["id"]
                        pool_info["symbol"] = pool["poolKey"]
                        pool_info["address"] = pool["underlyingTokenAddress"]
                        pool_info["apr_change"] = []
                        initialized = True
                    apr_point = {"ts": ts, "apr": pool["apr"]}
                    pool_info["apr_change"].append(apr_point)
        return pool_info
    else:
        return None


def get_apr_and_tvl_change_for_lyf_farming(pair_address: str) -> dict | None:
    farming_info = {}
    initialized = False
    lyf_info = get_lyf_info()
    if lyf_info is not None:
        for info in lyf_info:
            ts = info["ts"]
            for vault in info["farm"]:
                if vault["poolAddress"] == pair_address:
                    if not initialized:
                        farming_info["symbol"] = vault["poolKey"]
                        farming_info["address"] = vault["poolAddress"]
                        farming_info["stable"] = vault["stable"]
                        farming_info["token0"] = vault["token0"]
                        farming_info["token1"] = vault["token1"]
                        farming_info["change"] = []
                        initialized = True
                    point = {"ts": ts, "apr": vault["apr"], "tvl": vault["tvl"]}
                    farming_info["change"].append(point)
        return farming_info
    else:
        return None


def get_concise_lyf_lending_pool_info() -> list | None:
    latest_available_lyf_lending_info = get_latest_available_lyf_lending_pool_info()
    if latest_available_lyf_lending_info is not None:
        concise_info = []
        for info in latest_available_lyf_lending_info:
            concise_info.append({
                "pool_id": info["id"],
                "symbol": info["poolKey"],
                "address": info["underlyingTokenAddress"],
                "apr": info["apr"]
            })
        return concise_info
    else:
        return None


def get_concise_lyf_farming_info() -> list | None:
    latest_available_lyf_farming_info = get_latest_available_lyf_farming_info()
    if latest_available_lyf_farming_info is not None:
        concise_info = []
        for info in latest_available_lyf_farming_info:
            concise_info.append({
                "symbol": info["poolKey"],
                "pair_address": info["poolAddress"],
                "stable": info["stable"],
                "token0": info["token0"],
                "token1": info["token1"],
                "apr": info["apr"],
                "tvl": info["tvl"]
            })
        return concise_info
    else:
        return None


def get_pair_info(pair_address: str) -> dict | None:
    pairs = get_pair_infos()
    if pairs is not None:
        return pairs.get(pair_address)
    else:
        return None


def get_pair_infos() -> dict | None:
    global pair_infos
    global pair_timeout_at
    if len(pair_infos) == 0 or pair_timeout_at < time.time():
        pair_infos = get_pair_infos_from_origin()
        if pair_infos is None:
            return None
        pair_timeout_at = time.time() + 300
    return pair_infos


def get_pair_infos_from_origin() -> dict | None:
    static_url = "https://v1-public-s3-publicresourcebucket-1srs3mnbpd2j.s3.us-east-2.amazonaws.com/8453-pairs.json"
    try:
        response = requests.get(static_url)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        return None


def get_token_price_from_origin() -> dict | None:
    static_url = "https://v1-public-s3-publicresourcebucket-1srs3mnbpd2j.s3.us-east-2.amazonaws.com/8453-tokenPrices.json"
    try:
        response = requests.get(static_url)
        if response.status_code == 200:
            return response.json()
        else:
            return None
    except Exception as e:
        return None


def get_token_price(token_address: str) -> str | None:
    token_prices = get_token_price_from_origin()
    if token_prices is not None:
        price = token_prices.get(token_address, "0")
        return price
    else:
        return None
