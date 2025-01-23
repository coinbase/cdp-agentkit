import requests
from typing import List

PUBLIC_API_KEY = "a4998f968b8ad324eb3e47ed20c00220"
SUBGRAPH_ID = "3AceL1hTiuLK1ZUf2wwJJTKdu4sziTmwvrF6MN48wmsb"
SUBGRAPH_ENDPOINT = f"https://gateway.thegraph.com/api/{PUBLIC_API_KEY}/subgraphs/id/{SUBGRAPH_ID}"


def query_user_lending_position_pool_ids(user_address: str) -> str:
    return f"""
{{
  userLendingPositions(
    first: 10
    where: {{user_: {{id: "{user_address}"}}}}
  ) {{
    reserveId
  }}
}}
"""


def query_farming_vault_id(pair_address: str) -> str:
    return f"""
{{
  vaults(where: {{paused: false, pair: "{pair_address}"}}) {{
    vaultId
  }}
}}
"""


def query_user_farming_vault_positions(user_address: str, vault_id: str | None) -> str:
    if vault_id is not None:
        where_condition = f"{{manager: \"{user_address}\", vaultId: \"{vault_id}\", isActive: true}}"
    else:
        where_condition = f"{{manager: \"{user_address}\", isActive: true}}"
    return f"""
{{
    userVaultPositions(
        where: {where_condition}
    ) {{
        vaultId
        vaultPositionId
    }}
}}
"""


def query_vault_address(vault_id: str) -> str:
    return f"""
{{
  newVaults(where: {{vaultId: "{vault_id}"}}) {{
    vaultAddress
  }}
}}
"""


def get_user_lending_position_pool_ids(user_address: str) -> List[str] | None:
    try:
        response = requests.post(SUBGRAPH_ENDPOINT, json={"query": query_user_lending_position_pool_ids(user_address)})
        response.raise_for_status()
        data = response.json()["data"]["userLendingPositions"]
        return [position["reserveId"] for position in data]
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_farming_vault_id(pair_address: str) -> str | None:
    try:
        json_query: dict = {"query": query_farming_vault_id(pair_address)}
        response = requests.post(SUBGRAPH_ENDPOINT, json=json_query)
        response.raise_for_status()
        data = response.json()["data"]["vaults"]
        return data[0]["vaultId"]
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_user_farming_vault_positions(user_address: str, vault_id: str | None) -> List[dict] | None:
    try:
        response = requests.post(SUBGRAPH_ENDPOINT,
                                 json={"query": query_user_farming_vault_positions(user_address, vault_id)})
        response.raise_for_status()
        data = response.json()["data"]["userVaultPositions"]
        return data
    except Exception as e:
        print(f"Error: {e}")
        return None


def get_vault_address(vault_id: str) -> str | None:
    try:
        response = requests.post(SUBGRAPH_ENDPOINT, json={"query": query_vault_address(vault_id)})
        response.raise_for_status()
        data = response.json()["data"]["newVaults"]
        return data[0]["vaultAddress"]
    except Exception as e:
        print(f"Error: {e}")
        return None
