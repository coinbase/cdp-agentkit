import { Tool } from "@langchain/core/tools";
import type { BaseActionInput, CdpAction } from '@cdp/agentkit-core';
import type { CdpAgentkitWrapper } from '../utils/cdp-agentkit-wrapper';
import { decamelize } from '../utils/string';
import { z } from "zod";

interface SchemaInput {
  input?: string;
}

export class CdpTool extends Tool {
  name: string;
  description: string;
  private readonly wrapper: CdpAgentkitWrapper;
  private readonly action: CdpAction<any>;

  schema = z.object({
    input: z.string().optional()
  }).transform((val: SchemaInput) => val.input || "");

  constructor({
    name,
    description,
    wrapper,
    action,
  }: {
    name: string;
    description: string;
    wrapper: CdpAgentkitWrapper;
    action: CdpAction<any>;
  }) {
    super();
    this.name = decamelize(name);
    this.description = description;
    this.wrapper = wrapper;
    this.action = action;
  }

  /** @override */
  protected async _call(args: Record<string, unknown>): Promise<string> {
    return this.wrapper.runAction(this.action.execute, args);
  }
} 