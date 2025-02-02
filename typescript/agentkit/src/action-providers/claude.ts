import "reflect-metadata";
import { z } from "zod";
import { ActionProvider } from "./actionProvider";
import { WalletProvider } from "../wallet-providers";
import { Network } from "../network";
import { Anthropic } from "@anthropic-ai/sdk";
import { CreateAction } from "./actionDecorator";

const ChatSchema = z.object({
  message: z.string().describe("The message to send to Claude"),
  system: z.string().optional().describe("Optional system prompt to set Claude's behavior"),
  model: z.enum(["claude-3-opus-20240229", "claude-3-sonnet-20240229"]).optional().describe("Claude model to use"),
  temperature: z.number().min(0).max(1).optional().describe("Temperature for response generation (0.0 to 1.0)"),
  tools: z.array(z.string()).optional().describe("List of tool names to make available to Claude")
});

const RegisterToolSchema = z.object({
  name: z.string().describe("Name of the tool"),
  description: z.string().describe("Description of what the tool does"),
  parameters: z.object({}).passthrough().describe("JSON Schema for the tool's parameters"),
  function: z.string().describe("Python function code that implements the tool")
});

/**
 * ClaudeActionProvider provides actions for interacting with Claude AI.
 */
export class ClaudeActionProvider extends ActionProvider<WalletProvider> {
  private client: Anthropic;

  /**
   * Constructor for the ClaudeActionProvider.
   */
  constructor() {
    super("claude", []);
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY environment variable is required");
    }
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  /**
   * Registers a new tool that Claude can use.
   *
   * @param args - The tool configuration
   * @returns A success message
   */
  @CreateAction({
    name: "register_tool",
    description: "Register a new tool that Claude can call",
    schema: RegisterToolSchema,
  })
  async registerTool(_walletProvider: WalletProvider, args: z.infer<typeof RegisterToolSchema>): Promise<string> {
    try {
      const response = await fetch('http://localhost:3000/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server: 'claude',
          method: 'call_tool',
          params: {
            name: 'register_tool',
            arguments: args
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to register tool: ${response.statusText}`);
      }

      const result = await response.json();
      return `Successfully registered tool: ${args.name}`;
    } catch (error) {
      return `Error registering tool: ${error}`;
    }
  }

  /**
   * Sends a message to Claude and gets a response.
   *
   * @param args - The input arguments for the action.
   * @returns Claude's response as a string.
   */
  @CreateAction({
    name: "chat",
    description: "Send a message to Claude and get a response",
    schema: ChatSchema,
  })
  async chat(_walletProvider: WalletProvider, args: z.infer<typeof ChatSchema>): Promise<string> {
    try {
      const { message, system, model, temperature, tools } = args;
      
      // If tools are specified, use the MCP server
      if (tools && tools.length > 0) {
        const response = await fetch('http://localhost:3000/mcp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            server: 'claude',
            method: 'call_tool',
            params: {
              name: 'chat',
              arguments: args
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to chat with Claude: ${response.statusText}`);
        }

        const result = await response.json();
        return result.content[0].text;
      }
      
      // Otherwise use direct API access
      const response = await this.client.messages.create({
        model: model || "claude-3-opus-20240229",
        messages: [{
          role: "user",
          content: message
        }],
        system: system || "You are Claude, a helpful AI assistant.",
        temperature: temperature || 0.7,
        max_tokens: 4096
      });

      return response.content[0].text;
    } catch (error) {
      return `Error chatting with Claude: ${error}`;
    }
  }

  /**
   * Checks if the action provider supports the given network.
   * Since Claude actions are network-agnostic, this always returns true.
   *
   * @param _ - The network to check.
   * @returns True, as Claude actions are supported on all networks.
   */
  supportsNetwork = (_: Network): boolean => true;
}

/**
 * Factory function to create a new ClaudeActionProvider instance.
 *
 * @returns A new ClaudeActionProvider instance.
 */
export const claudeActionProvider = () => new ClaudeActionProvider();