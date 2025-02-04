from cdp import Wallet
from cdp_agentkit_core.actions import CdpAction

from collections.abc import Callable
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
import json
import requests
import uuid


from typing import Union, Dict, List, Optional

from cdp_agentkit_core.actions.nillion.utils import init, get_nodes, get_org_id

NILLION_CREATE_SCHEMA_PROMPT = """
This tool can be used to create schemas in your privacy preserving database, called the Nillion SecretVault (or nildb), based on a natural language description. Do not use this tool for any other purpose.

Inputs:
- a complete description of the desired nildb schema

"""


class NillionCreateSchemaInput(BaseModel):
    """Input argument schema for schema create action."""

    schema_description: str = Field(
        ..., description="a complete description of the desired nildb schema"
    )


def nillion_create_schema(wallet: Wallet, schema_description: str) -> dict:
    """Create a JSON schema based on input description and uploads it to nildb."""
    # print(f"fn:create_schema [{schema_description}]")

    try:

        init()

        # ruff: noqa
        schema_prompt = f"""
        1. I'll provide you with a description of the schema I want to implement
        3. For any fields that could be considered financial, secret, currency, value holding, political, family values, sexual, criminal, risky, personal, private or personally 
           identifying (PII), I want you to replace that type and value, instead, with an object that has a key named `$share` and the value of string as shown in this example:

            ORIGINAL ATTRIBUTE:
            "password": {{
              "type": "string"
            }}

            REPLACED WITH UPDATED ATTRIBUTE PRESERVING NAME:
            "password": {{
                "type": "object",
                "properties": {{
                    "$share": {{
                      "type": "string",
                     }}
                 }}
            }}
        
        4. The JSON document should follow the patterns shown in these examples contained herein where the final result is ready to be included in the POST JSON payload
        5. Do not include explanation or comments. Only a valid JSON payload document.
        
        START OF JSON SCHEMA DESECRIPTION
        
        a JSON Schema following these requirements:
        
        - Use JSON Schema draft-07, type "array"
        - Each record needs a unique _id (UUID format, coerce: true)
        - Use "date-time" format for dates (coerce: true)
        - Mark required fields (_id is always required)
        - Set additionalProperties to false
        - Avoid "$" prefix in field names to prevent query conflicts
        - The schema to create is embedded in the "schema" attribute
        - "_id" should be the only "keys"
        - Note: System adds _created and _updated fields automatically
        
        Example `POST /schema` Payload
        
        {{
          "name": "My services",
          "keys": ["_id"],
          "schema": {{
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "array",
            "items": {{
              "type": "object",
              "properties": {{
                "_id": {{
                  "type": "string",
                  "format": "uuid",
                  "coerce": true
                }},
                "username": {{
                  "type": "string"
                }},
                "password": {{
                  "type": "string"
                }},
              }},
              "required": ["_id", "username", "password"],
              "additionalProperties": false
            }}
          }}
        }}
        
        Based on this description, create a JSON schema:
        {schema_description}
        """

        llm = ChatOpenAI(model="gpt-4o-mini")
        response = llm.invoke(schema_prompt)

        schema = json.loads(response.content)

        schema["_id"] = str(uuid.uuid4())
        schema["owner"] = get_org_id()

        for node in get_nodes():
            headers = {
                "Authorization": f'Bearer {node["bearer"]}',
                "Content-Type": "application/json",
            }

            response = requests.post(
                f"{node['url']}/api/v1/schemas",
                headers=headers,
                json=schema,
            )

            assert (
                response.status_code == 200 and response.json().get("errors", []) == []
            ), response.content.decode("utf8")
        return schema
    except Exception as e:
        print(f"Error creating schema: {str(e)}")
        return ""


class NillionCreateSchemaAction(CdpAction):
    """Nillion Create Schema Action."""

    name: str = "nillion_create_schema"
    description: str = NILLION_CREATE_SCHEMA_PROMPT
    args_schema: type[BaseModel] = NillionCreateSchemaInput
    func: Callable[..., str] = nillion_create_schema
