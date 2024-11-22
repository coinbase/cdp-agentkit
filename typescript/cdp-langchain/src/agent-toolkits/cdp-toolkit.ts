import { Tool } from "@langchain/core/tools";
import { CDP_ACTIONS } from '@cdp/agentkit-core';
import { CdpTool } from '../tools/cdp-tool';
import type { CdpAgentkitWrapper } from '../utils/cdp-agentkit-wrapper';

/**
 * Coinbase Developer Platform (CDP) Toolkit.
 */
export class CdpToolkit {
  private readonly tools: Tool[];

  constructor(tools: Tool[] = []) {
    this.tools = tools;
  }

  static fromCdpAgentkitWrapper(wrapper: CdpAgentkitWrapper): CdpToolkit {
    const tools = CDP_ACTIONS.map((action) => {
      return new CdpTool({
        name: action.name,
        description: action.description,
        wrapper,
        action,
      });
    });

    return new CdpToolkit(tools);
  }

  getTools(): Tool[] {
    return this.tools;
  }
} 