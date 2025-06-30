# astro-mcp-doc-agent

**astro-mcp-doc-agent** is an AI-powered documentation assistant built with [Astro](https://astro.build/) and [Preact](https://preactjs.com/). It provides an interactive chat interface for answering technical questions about Markdown documentation in a company's repository. The assistant can also create Jira tickets if documentation errors are found, streamlining internal documentation management.

## Features

- **AI Chat Widget:** Ask technical questions about your documentation and get instant answers.
- **Jira Integration:** Automatically create Jira tickets for documentation issues (requires API setup).
- **Markdown Expertise:** Focused on Markdown files in a specified GitHub repository.
- **Internal Logs:** View JavaScript logs directly in the browser for debugging and transparency.

## How It Works

- The main chat interface is provided by the `DocExpertChat` component, which communicates with an AI agent (`docexpert`) configured to answer documentation questions and interact with Jira.
- The agent is defined in `src/agents/docexpert.yaml` and is specialized in Markdown documentation.
- The chat UI is rendered on the main page (`src/pages/index.astro`).
- JavaScript logs are captured and displayed in a dedicated section for easier debugging.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd astro-mcp-doc-agent
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

To start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:4321](http://localhost:4321) by default.

### Building for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Configuration

- **OpenAI API Key:** Set your OpenAI API key in your environment as `PUBLIC_OPENAI_API_KEY` for the chat to function.
- **Jira API:** Update the agent configuration in `src/agents/docexpert.yaml` with your Jira OpenAPI endpoint.

## Project Structure

```
astro-mcp-doc-agent/
├── astro.config.mjs           # Astro configuration
├── package.json               # Project metadata and scripts
├── public/
│   └── console-capture.js     # JS log capture for browser
├── src/
│   ├── agents/
│   │   └── docexpert.yaml     # AI agent configuration
│   ├── components/
│   │   ├── DocExpertChat.astro
│   │   └── DocExpertChat.jsx  # Chat UI logic
│   └── pages/
│       └── index.astro        # Main entry page
```

## License

MIT

---

_This project is a template for building internal documentation assistants using Astro, Preact, and AI integrations._
