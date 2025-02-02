#!/usr/bin/env python3
import json
import os
import sys
from typing import Dict, List, Optional

from anthropic import Anthropic
from langchain_anthropic import ChatAnthropic

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not ANTHROPIC_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY environment variable is required")

class ClaudeServer:
    def __init__(self):
        self.client = Anthropic(api_key=ANTHROPIC_API_KEY)
        self.default_model = "claude-3-opus-20240229"
        self.default_temperature = 0.7
        self.default_system = "You are Claude, a helpful AI assistant."
        self.registered_tools: Dict[str, dict] = {}

    def register_tool(self, tool_name: str, tool_config: dict) -> None:
        """Register a new tool that Claude can call."""
        self.registered_tools[tool_name] = tool_config

    def list_tools(self) -> dict:
        tools = [
            {
                "name": "chat",
                "description": "Send a message to Claude and get a response",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "message": {
                            "type": "string",
                            "description": "The message to send to Claude"
                        },
                        "system": {
                            "type": "string",
                            "description": "Optional system prompt to set Claude's behavior"
                        },
                        "model": {
                            "type": "string",
                            "description": "Claude model to use (claude-3-opus-20240229 or claude-3-sonnet-20240229)",
                            "enum": ["claude-3-opus-20240229", "claude-3-sonnet-20240229"]
                        },
                        "temperature": {
                            "type": "number",
                            "description": "Temperature for response generation (0.0 to 1.0)",
                            "minimum": 0.0,
                            "maximum": 1.0
                        },
                        "tools": {
                            "type": "array",
                            "description": "List of tool names to make available to Claude",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": ["message"]
                }
            },
            {
                "name": "register_tool",
                "description": "Register a new tool that Claude can call",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Name of the tool"
                        },
                        "description": {
                            "type": "string",
                            "description": "Description of what the tool does"
                        },
                        "parameters": {
                            "type": "object",
                            "description": "JSON Schema for the tool's parameters"
                        },
                        "function": {
                            "type": "string",
                            "description": "Python function code that implements the tool"
                        }
                    },
                    "required": ["name", "description", "parameters", "function"]
                }
            }
        ]
        
        # Add registered tools to the list
        tools.extend([{
            "name": name,
            "description": config["description"],
            "inputSchema": config["parameters"]
        } for name, config in self.registered_tools.items()])
        
        return {"tools": tools}

    def execute_tool(self, tool_name: str, args: dict) -> dict:
        """Execute a registered tool."""
        if tool_name not in self.registered_tools:
            raise ValueError(f"Unknown tool: {tool_name}")
        
        tool_config = self.registered_tools[tool_name]
        try:
            # Create a new function from the stored code
            exec(tool_config["function"])
            # Get the function object
            tool_func = locals()[tool_name]
            # Execute the function with the provided arguments
            result = tool_func(**args)
            return {
                "content": [{
                    "type": "text",
                    "text": str(result)
                }]
            }
        except Exception as e:
            return {
                "content": [{
                    "type": "text",
                    "text": f"Tool execution error: {str(e)}"
                }],
                "isError": True
            }

    def prepare_tools_for_claude(self, tool_names: Optional[List[str]] = None) -> List[dict]:
        """Prepare tool definitions for Claude's API."""
        available_tools = []
        if tool_names:
            for name in tool_names:
                if name in self.registered_tools:
                    tool_config = self.registered_tools[name]
                    available_tools.append({
                        "name": name,
                        "description": tool_config["description"],
                        "input_schema": tool_config["parameters"]
                    })
        return available_tools

    def chat(self, args: dict) -> dict:
        message = args["message"]
        system = args.get("system", self.default_system)
        model = args.get("model", self.default_model)
        temperature = args.get("temperature", self.default_temperature)
        tool_names = args.get("tools", [])

        tools = self.prepare_tools_for_claude(tool_names)
        
        messages = [{"role": "user", "content": message}]
        while True:
            response = self.client.messages.create(
                model=model,
                messages=messages,
                system=system,
                temperature=temperature,
                max_tokens=4096,
                tools=tools
            )

            last_message = response.content[0]
            if last_message.type == "text":
                break

            if last_message.type == "tool_calls":
                tool_results = []
                for tool_call in last_message.tool_calls:
                    tool_name = tool_call.name
                    tool_args = json.loads(tool_call.parameters)
                    
                    # Execute the tool and capture the result
                    tool_result = self.execute_tool(tool_name, tool_args)
                    tool_results.append({
                        "tool_name": tool_name,
                        "result": tool_result["content"][0]["text"]
                    })
                
                # Add tool results to the conversation
                messages.append({
                    "role": "assistant",
                    "content": None,
                    "tool_calls": last_message.tool_calls
                })
                messages.append({
                    "role": "tool",
                    "content": json.dumps(tool_results)
                })

        return {
            "content": [{
                "type": "text",
                "text": response.content[0].text
            }]
        }

    def handle_request(self, request: dict) -> dict:
        try:
            if request.get("method") == "list_tools":
                return self.list_tools()
            elif request.get("method") == "call_tool":
                tool_name = request.get("params", {}).get("name")
                tool_args = request.get("params", {}).get("arguments", {})
                
                if tool_name == "chat":
                    return self.chat(tool_args)
                elif tool_name == "register_tool":
                    self.register_tool(tool_args["name"], {
                        "description": tool_args["description"],
                        "parameters": tool_args["parameters"],
                        "function": tool_args["function"]
                    })
                    return {
                        "content": [{
                            "type": "text",
                            "text": f"Successfully registered tool: {tool_args['name']}"
                        }]
                    }
                elif tool_name in self.registered_tools:
                    return self.execute_tool(tool_name, tool_args)
                else:
                    return {
                        "content": [{
                            "type": "text",
                            "text": f"Unknown tool: {tool_name}"
                        }],
                        "isError": True
                    }
            else:
                return {
                    "content": [{
                        "type": "text",
                        "text": f"Unknown method: {request.get('method')}"
                    }],
                    "isError": True
                }
        except Exception as e:
            return {
                "content": [{
                    "type": "text",
                    "text": f"Error: {str(e)}"
                }],
                "isError": True
            }

    def run(self):
        while True:
            try:
                line = sys.stdin.readline()
                if not line:
                    break
                    
                request = json.loads(line)
                response = self.handle_request(request)
                
                print(json.dumps(response))
                sys.stdout.flush()
                
            except Exception as e:
                print(json.dumps({
                    "content": [{
                        "type": "text",
                        "text": f"Server error: {str(e)}"
                    }],
                    "isError": True
                }))
                sys.stdout.flush()

if __name__ == "__main__":
    server = ClaudeServer()
    server.run()