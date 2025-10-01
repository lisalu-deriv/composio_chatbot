import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

interface AgentParameters {
  temperature?: number;
  maxSteps?: number;
  [key: string]: unknown;
}

interface AgentConfig {
  model: string;
  prompts: {
    system: string;
  };
  parameters: AgentParameters;
}

interface AgentsConfig {
  react_agent: AgentConfig;
  [agentId: string]: AgentConfig;
}

const CONFIG_PATH = path.join(process.cwd(), 'config', 'agents.yaml');

let cachedConfig: AgentsConfig | null = null;

const loadAgentsConfig = (): AgentsConfig => {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const fileContents = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const parsed = yaml.load(fileContents) as AgentsConfig;
    cachedConfig = parsed;
    return parsed;
  } catch (error) {
    throw new Error(`Failed to load agent configuration from ${CONFIG_PATH}: ${(error as Error).message}`);
  }
};

export const getAgentConfig = (agentId: keyof AgentsConfig): AgentConfig => {
  const config = loadAgentsConfig();
  const agentConfig = config[agentId];

  if (!agentConfig) {
    throw new Error(`Agent configuration not found for id: ${agentId as string}`);
  }

  return agentConfig;
};

export const invalidateAgentConfigCache = () => {
  cachedConfig = null;
};

