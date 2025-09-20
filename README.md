<a href="https://chat.composio.dev">
  <img alt="Composio AI Chatbot Template" src="https://og.composio.dev/api/og?title=chat.composio.dev">
  <h1 align="center">Composio AI Chatbot Template</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Next.js, LangChain/LangGraph, Multi-Provider AI Support, and Composio Integration.
</p>

<p align="center">
  <strong>🚀 Now powered by LangChain/LangGraph with ReAct Agent Architecture!</strong>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#composio-integration"><strong>Composio</strong></a>
</p>
<br/>

## Features

- **🤖 LangChain/LangGraph AI Framework** - Advanced ReAct (Reasoning and Acting) agent architecture
- **🔄 Multi-Provider AI Support** - OpenAI, Anthropic Claude, and Google Gemini
- **🛠️ Intelligent Tool Usage** - Weather tools and 300+ app integrations via Composio
- **💬 Real-time Streaming Chat** - Server-sent events with LangGraph streaming
- **📁 Multiple Artifacts** - Support for code, documents, images, and spreadsheets
- **📤 File Processing** - Upload and process various document types
- **📚 Chat History** - Public/private visibility with persistent storage
- **👍 User Interactions** - Voting and suggestions system
- **🎤 Multi-modal Input** - Text, voice, and file inputs
- **🔗 Third-party Integrations** - Access to 300+ apps via Composio

## Tech Stack

- **[Next.js 15](https://nextjs.org)** - App Router with React Server Components
- **[LangChain/LangGraph](https://langchain.com)** - AI framework with ReAct agent architecture
- **[OpenAI](https://openai.com)** - GPT models (O3, GPT-5-mini, GPT-5-nano)
- **[Anthropic](https://anthropic.com)** - Claude models (Claude-4-sonnet, Claude-3.7-sonnet, Claude-3.5-haiku)
- **[Google Gemini](https://ai.google.dev)** - Gemini models (2.5-flash, 2.5-pro)
- **[Composio](https://composio.dev)** - Third-party app integrations (300+ apps)
- **[Drizzle ORM](https://orm.drizzle.team)** - PostgreSQL database
- **[Auth.js](https://authjs.dev)** - Authentication system
- **[shadcn/ui](https://ui.shadcn.com)** - UI components with Tailwind CSS


## Running locally

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your configuration:

   ```env
   # At least one AI provider is required
   OPENAI_API_KEY=your-openai-key
   OPENAI_BASE_URL=https://api.openai.com/v1  # Optional: for proxies
   ANTHROPIC_API_KEY=your-anthropic-key
   GEMINI_API_KEY=your-gemini-key
   
   # Required
   COMPOSIO_API_KEY=your-composio-key
   POSTGRES_URL=your-postgresql-url
   AUTH_SECRET=your-random-secret
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
   ```

4. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Development Commands

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start development server with Turbo              |
| `npm run build`    | Run database migrations and build production app |
| `npm run lint`     | Run Next.js and Biome linting with auto-fix      |
| `npm run format`   | Format code with Biome                           |
| `npm test`         | Run Playwright e2e tests                         |
| `npm run db:migrate` | Run database migrations                        |
| `npm run db:generate` | Generate Drizzle migrations                   |
| `npm run db:studio` | Open Drizzle Studio for database inspection     |
| `npm run db:push`  | Push schema changes to database                  |

## Project Structure

```
composio_chatbot/
├── app/
│   ├── (auth)/          # Authentication routes and components
│   ├── (chat)/          # Main chat interface and LangGraph API routes
│   └── api/             # API endpoints
├── components/          # Reusable UI components (no AI SDK dependencies)
├── lib/
│   ├── ai/              # LangChain/LangGraph modules
│   │   ├── agent.ts     # ReAct agent implementation
│   │   ├── providers.ts # Multi-provider system (OpenAI, Anthropic, Gemini)
│   │   ├── tools/       # Tool implementations (weather, Composio)
│   │   └── prompts.ts   # System prompts
│   ├── db/              # Database schema and utilities
│   └── services/        # External service integrations
├── hooks/               # Custom React hooks (no AI SDK dependencies)
└── tests/               # Playwright e2e tests
```

## Composio Integration

This template integrates with [Composio](https://composio.dev) to provide seamless access to 300+ third-party applications. Users can connect their accounts and use them as powerful tools within the chat interface.

### Key Integration Features

- **OAuth Management** - Secure connection to user accounts
- **Tool Execution** - Direct API calls from chat interface
- **Real-time Updates** - Live data synchronization
- **Multi-app Workflows** - Chain actions across different platforms

For detailed Composio documentation, see `composio-docs.md`.

## Architecture

### Core Stack

- **Next.js 15** with App Router and React Server Components
- **LangChain/LangGraph** for AI orchestration with ReAct agent pattern
- **Multi-Provider AI** supporting OpenAI, Anthropic, and Gemini
- **Drizzle ORM** with PostgreSQL for data persistence
- **Auth.js** for authentication
- **shadcn/ui** components with Tailwind CSS

### LangChain/LangGraph Integration

- **ReAct Agent**: Reasoning and Acting pattern for intelligent tool usage
- **StateGraph**: Conversation flow management with LangGraph
- **Multi-Provider Support**: Automatic provider selection based on available API keys
- **Tool Binding**: Dynamic tool discovery and binding to models
- **Streaming**: Real-time response streaming with server-sent events
- **Configurable**: Easy model and provider configuration via `/lib/ai/providers.ts`

### AI Models Supported

#### OpenAI Models
- `o3` - Latest reasoning model
- `gpt-5-mini` - Advanced general-purpose model
- `gpt-5-nano` - Ultra-fast lightweight model

#### Anthropic Models
- `claude-4-sonnet` - Most capable Claude model
- `claude-3-7-sonnet-latest` - Enhanced reasoning
- `claude-3-5-haiku-latest` - Fast and efficient

#### Google Gemini Models
- `gemini-2.5-flash` - High-performance multimodal
- `gemini-2.5-flash-lite` - Lightweight version
- `gemini-2.5-pro` - Professional-grade reasoning

### Tool System

- **Weather Tool**: Location-based weather information using Open-Meteo API
- **Composio Integration**: 300+ app integrations (GitHub, Gmail, Calendar, etc.)
- **Custom Tools**: Easy-to-add custom tool framework
- **Tool Execution**: Seamless tool binding and execution within ReAct agent

### Database Schema

- Uses Drizzle ORM with PostgreSQL
- Core tables: User, Chat, Message_v2, Document, Vote, Suggestion
- Migration files in `/lib/db/migrations/`
- The Message table is deprecated in favor of Message_v2

## Contributing

Please refer to `CLAUDE.md` for development guidelines and best practices.

## License

MIT

---

<p align="center">
  Built with ❤️ using <a href="https://composio.dev">Composio</a>
</p>
