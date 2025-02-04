from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
import uuid

from jsonschema import validators, Draft7Validator

from collections.abc import Callable

from pydantic import BaseModel, Field
import requests

from cdp_agentkit_core.actions.nillion.utils import (
    init,
    get_cluster_key,
    get_nodes,
    fetch_schemas,
    filter_schemas,
)
import nilql


NILLION_DATA_UPLOAD_PROMPT = """
This tool can upload data into your privacy preserving database, called the Nillion SecretVault (or nildb), validating to a schema. Do not use this tool for other purposes.

Inputs:
- a UUID4 that identifies the schema to upload into
- a valid json friendly dict that conforms to the desired schema

Special Considerations:
- The _id field should always contain a valid UUID4

"""


def _mutate_secret_attributes(entry: dict) -> None:
    """Apply encrypotion or secret sharing to all fields in schema that are indicated w/ $share keyname."""
    keys = list(entry.keys())
    for key in keys:
        value = entry[key]
        if key == "_id":
            entry[key] = str(uuid.uuid4())
        elif key == "$share":
            del entry["$share"]
            entry["$allot"] = nilql.encrypt(get_cluster_key(), value)
        elif isinstance(value, dict):
            _mutate_secret_attributes(value)


def _validator_builder():
    """Build a validator to validate the candidate document against loaded schema."""
    return validators.extend(Draft7Validator)


class NillionDataUploadInput(BaseModel):
    """Input argument schema for data upload action."""

    schema_uuid: str = Field(
        description="the UUID obtained from the nillion_lookup_schema tool."
    )
    data_to_store: list = Field(
        description="data to store in the database that validates against desired schema"
    )


def nillion_data_upload(wallet: Wallet, schema_uuid: str, data_to_store: list) -> bool:
    """Create/upload records in the specified node and schema."""
    # print(f"fn:data_upload [{schema_uuid}] [{data_to_store}]")
    try:

        init()

        schema_list = fetch_schemas()
        my_schema = filter_schemas(schema_uuid, schema_list)

        builder = _validator_builder()
        validator = builder(my_schema)

        for entry in data_to_store:
            _mutate_secret_attributes(entry)

        payloads = nilql.allot(data_to_store)
        nodes = get_nodes()

        for idx, shard in enumerate(payloads):

            validator.validate(shard)

            node = nodes[idx]
            headers = {
                "Authorization": f'Bearer {node["bearer"]}',
                "Content-Type": "application/json",
            }

            body = {"schema": schema_uuid, "data": shard}

            response = requests.post(
                f"{node['url']}/api/v1/data/create",
                headers=headers,
                json=body,
            )

            assert (
                response.status_code == 200 and response.json().get("errors", []) == []
            ), "upload failed: " + response.content.decode("utf8")
        return True
    except Exception as e:
        print(f"Error creating records in node: {str(e)}")
        return False


class NillionDataUploadAction(CdpAction):
    """Nillion Data Upload Action."""

    name: str = "nillion_data_upload"
    description: str = NILLION_DATA_UPLOAD_PROMPT
    args_schema: type[BaseModel] = NillionDataUploadInput
    func: Callable[..., str] = nillion_data_upload
