<a href="https://chat.composio.dev">
  <img alt="Composio AI Chatbot Template" src="https://og.composio.dev/api/og?title=chat.composio.dev">
  <h1 align="center">Composio AI Chatbot Template</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Next.js, Anthropic Claude, and Composio Integration.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#composio-integration"><strong>Composio</strong></a>
</p>
<br/>

## Features

- **Advanced Agent Reasoning** - LangGraph React Agent with structured tool calling and multi-step reasoning
- **Hybrid AI Architecture** - LangGraph for agent creation + AI SDK for streaming and UI integration
- **Multiple Artifacts** - Support for code, documents, images, and spreadsheets
- **File Processing** - Upload and process various document types
- **Chat History** - Public/private visibility with persistent storage
- **User Interactions** - Voting and suggestions system
- **Multi-modal Input** - Text, voice, and file inputs
- **Third-party Integrations** - Access to 300+ apps via Composio with enhanced tool calling
- **Robust Error Handling** - Graceful fallback mechanisms for reliable user experience

## Tech Stack

- **[Next.js 15](https://nextjs.org)** - App Router with React Server Components
- **[LangGraph](https://langchain-ai.github.io/langgraphjs/)** - Advanced agent workflows and tool calling
- **[AI SDK](https://sdk.vercel.ai)** - Message streaming and UI integration
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
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your configuration:

   - **Composio API key** from [app.composio.dev](https://app.composio.dev/developers)
   - **Database connection** details
   - **Authentication providers** (Google, GitHub, etc.)
   - **OPENAI API key** for Openai models

4. **Run database migrations**

   ```bash
   pnpm db:migrate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Development Commands

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm dev`         | Start development server with Turbo              |
| `pnpm build`       | Run database migrations and build production app |
| `pnpm lint`        | Run Next.js and Biome linting with auto-fix      |
| `pnpm format`      | Format code with Biome                           |
| `pnpm test`        | Run Playwright e2e and unit tests                |
| `pnpm db:migrate`  | Run database migrations                          |
| `pnpm db:generate` | Generate Drizzle migrations                      |
| `pnpm db:studio`   | Open Drizzle Studio for database inspection      |
| `pnpm db:push`     | Push schema changes to database                  |

## Project Structure

```
chat/
├── app/
│   ├── (auth)/          # Authentication routes and components
│   ├── (chat)/          # Main chat interface and API routes
│   └── api/             # API endpoints
├── artifacts/           # Different artifact types (code, image, text, sheet)
├── components/          # Reusable UI components
├── lib/
│   ├── ai/              # AI model configuration and tools
│   │   ├── agents/      # LangGraph agent implementations
│   │   ├── tools/       # AI tools (Composio, weather, etc.)
│   │   └── utils/       # Message conversion utilities
│   └── db/              # Database schema and utilities
├── hooks/               # Custom React hooks
└── tests/               # Playwright e2e and unit tests
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
- **AI SDK** for LLM integration with Anthropic Claude models
- **Drizzle ORM** with PostgreSQL for data persistence
- **Auth.js** for authentication
- **shadcn/ui** components with Tailwind CSS

### AI Integration

#### Hybrid Architecture
- **LangGraph Agent**: Uses `gpt-4o` with React Agent pattern for enhanced reasoning and tool calling
- **Graceful Fallback**: Automatically falls back to AI SDK when LangGraph encounters errors

#### Configuration
- Models configurable via `/lib/ai/providers.ts`
- Test environment uses mock models from `/lib/ai/models.test.ts`
- AI tools defined in `/lib/ai/tools/`
- LangGraph agents in `/lib/ai/agents/`

#### Agent Features
- **React Agent Pattern**: Structured reasoning with up to 5 steps
- **Enhanced Tool Calling**: Improved Composio integration via LangchainProvider
- **Real-time Context**: System prompt includes current time information
- **Message Conversion**: Seamless format conversion between LangGraph and AI SDK

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
