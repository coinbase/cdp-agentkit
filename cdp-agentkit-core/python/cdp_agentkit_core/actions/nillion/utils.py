from ecdsa import SigningKey, SECP256k1
import jwt
import nilql
import os
import requests
import time


CONFIG = {}


def get_org_id() -> str:
    return CONFIG["org_did"]


def get_cluster_key() -> dict:
    return CONFIG["cluster_key"]


def get_nodes() -> list:
    return CONFIG["nodes"]


def init() -> bool:
    """Initialize config with JWTs signed with ES256K for multiple node_ids; Add cluster key."""
    global CONFIG
    CONFIG = {
        "secret_key": os.environ["NILLION_SECRET_KEY"],
        "org_did": os.environ["NILLION_ORG_ID"],
    }
    response = requests.post(
        "https://sv-sda-registration.replit.app/api/config",
        headers={
            "Content-Type": "application/json",
        },
        json={"org_did": CONFIG["org_did"]},
    )
    nodes = response.json()["nodes"]

    # Convert the secret key from hex to bytes
    private_key = bytes.fromhex(CONFIG["secret_key"])
    signer = SigningKey.from_string(private_key, curve=SECP256k1)

    for node in nodes:
        # Create payload for each node_id
        payload = {
            "iss": CONFIG["org_did"],
            "aud": node["did"],
            "exp": int(time.time()) + 3600,
        }

        # Create and sign the JWT
        node["bearer"] = jwt.encode(payload, signer.to_pem(), algorithm="ES256K")

    CONFIG["nodes"] = nodes
    CONFIG["cluster_key"] = nilql.ClusterKey.generate(
        {"nodes": [{}] * len(nodes)}, {"store": True}
    )

    return True


def fetch_schemas() -> list:
    """Get all my schemas from the first server."""
    headers = {
        "Authorization": f'Bearer {CONFIG["nodes"][0]["bearer"]}',
        "Content-Type": "application/json",
    }

    response = requests.get(
        f"{CONFIG['nodes'][0]['url']}/api/v1/schemas", headers=headers
    )

    assert (
        response.status_code == 200 and response.json().get("errors", []) == []
    ), response.content.decode("utf8")

    schema_list = response.json()["data"]
    assert len(schema_list) > 0, "failed to fetch schemas from nildb"
    return schema_list


def filter_schemas(schema_uuid: str, schema_list: list) -> dict:
    """Filter a list of schemas by single desired schema id."""
    my_schema = None
    for this_schema in schema_list:
        if this_schema["_id"] == schema_uuid:
            my_schema = this_schema["schema"]
            break
    assert my_schema is not None, "failed to lookup schema"
    return my_schema
