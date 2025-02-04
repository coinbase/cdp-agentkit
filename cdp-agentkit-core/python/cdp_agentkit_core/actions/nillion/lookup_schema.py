from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction
from pydantic import BaseModel, Field

from collections.abc import Callable

from langchain_openai import ChatOpenAI
import json

from cdp_agentkit_core.actions.nillion.utils import init, fetch_schemas, filter_schemas

NILLION_LOOKUP_SCHEMA_PROMPT = """
This tool can lookup schemas in your privacy preserving database, called the Nillion SecretVault (or nildb), based on a natural language description. Do not use this tool for other purposes.

Inputs:
- a complete description of the desired nildb schema

Special consideration:
- Remember the UUID4 and schema document values for future use with nillion_upload and nillion_download tools
"""


class NillionLookupSchemaInput(BaseModel):
    """Input argument schema for lookup schema action."""

    schema_description: str = Field(
        ..., description="a complete description of the desired nildb schema"
    )


def nillion_lookup_schema(wallet: Wallet, schema_description: str) -> tuple:
    """Lookup a JSON schema based on input description and return it's UUID."""
    # print(f"fn:lookup_schema [{schema_description}]")
    try:

        init()
        schema_list = fetch_schemas()

        schema_prompt = f"""
        1. I'll provide you with a description of the schema I want to use
        2. I'll provide you with a list of available schemas
        3. You will select the best match and return the associated UUID from the outermost `_id` field
        4. Do not include explanation or comments. Only a valid UUID string
        5. Based on the provided description, select a schema from the provided schemas.

        DESIRED SCHEMA DESCRIPTION:
        {schema_description}

        AVAILABLE SCHEMAS:
        {json.dumps(schema_list)}
        """

        llm = ChatOpenAI(model="gpt-4o-mini")
        response = llm.invoke(schema_prompt)

        my_uuid = response.content
        my_uuid = "".join(c for c in my_uuid if c.lower() in "0123456789abcdef-")

        my_schema = filter_schemas(my_uuid, schema_list)
        return my_uuid, my_schema

    except Exception as e:
        print(f"Error looking up schema: {e!r}")
        return None


class NillionLookupSchemaAction(CdpAction):
    """Nillion Lookup Schema Action."""

    name: str = "nillion_lookup_schema"
    description: str = NILLION_LOOKUP_SCHEMA_PROMPT
    args_schema: type[BaseModel] = NillionLookupSchemaInput
    func: Callable[..., str] = nillion_lookup_schema
