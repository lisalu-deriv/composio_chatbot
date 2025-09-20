import { Composio } from '@composio/core';
import { LangchainProvider } from '@composio/langchain';

/**
 * Composio client instance for server-side operations with LangChain provider
 * This should only be used in server-side code (API routes, server components)
 * For client-side operations, use the API endpoints in /app/api/
 */
const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

export default composio;
