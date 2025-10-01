================
CODE SNIPPETS
================
TITLE: Set up OpenAI Node.js library development environment
DESCRIPTION: Instructions to install project dependencies and build output files for the OpenAI Node.js library using Yarn. This prepares the `dist/` directory for development.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_0

LANGUAGE: sh
CODE:
```
$ yarn
$ yarn build
```

--------------------------------

TITLE: Add and run a TypeScript example in OpenAI Node.js library
DESCRIPTION: Demonstrates how to create a new TypeScript example file in the `examples/` directory, which is not affected by code generation. Includes steps to make the script executable and run it using `yarn tsn`.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_1

LANGUAGE: ts
CODE:
```
// add an example to examples/<your-example>.ts

#!/usr/bin/env -S npm run tsn -T
…
```

LANGUAGE: sh
CODE:
```
$ chmod +x examples/<your-example>.ts
# run the example against your api
$ yarn tsn -T examples/<your-example>.ts
```

--------------------------------

TITLE: Install OpenAI Node.js library from Git via npm
DESCRIPTION: Explains how to install the OpenAI Node.js library directly from its GitHub repository using `npm install` with a Git SSH URL, allowing for direct integration from source.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_2

LANGUAGE: sh
CODE:
```
$ npm install git+ssh://git@github.com:openai/openai-node.git
```

--------------------------------

TITLE: Initiate OpenAI Assistant API Streams
DESCRIPTION: Provides examples of the three primary helper methods available for initiating streams with the OpenAI Assistants API. These methods cover starting a stream for an existing run, creating a new thread and run with a message, and submitting tool outputs to an ongoing run.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_3

LANGUAGE: ts
CODE:
```
openai.beta.threads.runs.stream();
```

LANGUAGE: ts
CODE:
```
openai.beta.threads.createAndRunStream();
```

LANGUAGE: ts
CODE:
```
openai.beta.threads.runs.submitToolOutputsStream();
```

--------------------------------

TITLE: Install `@types/bun` for OpenAI library in Bun (JSON)
DESCRIPTION: This `package.json` snippet shows how to include `@types/bun` in `devDependencies`. This type package provides Bun-specific type definitions, which are necessary for proper TypeScript integration when using the OpenAI library in a Bun project.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_25

LANGUAGE: json
CODE:
```
{
  "devDependencies": {
    "@types/bun": ">= 1.2.0"
  }
}
```

--------------------------------

TITLE: Install OpenAI API Library with JSR (Deno/npm)
DESCRIPTION: These commands demonstrate how to install the OpenAI API library using JSR for Deno or npm, enabling module imports from the `@openai/openai` scope. It also shows direct import for Deno without an install step.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
deno add jsr:@openai/openai
npx jsr add @openai/openai
```

LANGUAGE: ts
CODE:
```
import OpenAI from 'jsr:@openai/openai';
```

--------------------------------

TITLE: Migrate `withResponse` and `asResponse` for Web ReadableStream
DESCRIPTION: When using `withResponse` or `asResponse`, update your code to handle the Web `ReadableStream` instead of `node-fetch`-specific properties. This example demonstrates how to convert a Web `ReadableStream` to a Node.js `Readable` stream using `Readable.fromWeb` for compatibility with Node.js stream operations like piping.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// Before:
const res = await client.example.retrieve('string/with/slash').asResponse();
res.body.pipe(process.stdout);
```

LANGUAGE: typescript
CODE:
```
// After:
import { Readable } from 'node:stream';
const res = await client.example.retrieve('string/with/slash').asResponse();
Readable.fromWeb(res.body).pipe(process.stdout);
```

--------------------------------

TITLE: Install `@types/node` for OpenAI library in Node.js (JSON)
DESCRIPTION: This `package.json` snippet shows how to add the `@types/node` dependency, which is crucial for providing Node.js-specific type definitions when working with the OpenAI library in a TypeScript Node.js project.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_22

LANGUAGE: json
CODE:
```
{
  "devDependencies": {
    "@types/node": ">= 20"
  }
}
```

--------------------------------

TITLE: Replace fileFromPath with Node.js fs.createReadStream for File Handling
DESCRIPTION: The deprecated `fileFromPath` helper for handling files has been removed from the SDK. This example illustrates how to replace its usage with native Node.js `fs.createReadStream` to create readable file streams, which is the recommended approach for file operations in Node.js environments.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_11

LANGUAGE: typescript
CODE:
```
// Before
OpenAI.fileFromPath('path/to/file');
```

LANGUAGE: typescript
CODE:
```
// After
import fs from 'fs';
fs.createReadStream('path/to/file');
```

--------------------------------

TITLE: GET /models
DESCRIPTION: Lists all available models.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_37

LANGUAGE: APIDOC
CODE:
```
## GET /models

### Description
Lists all available models.

### Method
GET

### Endpoint
/models

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **models** (ModelsPage) - A list of model objects.

#### Response Example
{}
```

--------------------------------

TITLE: GET /assistants
DESCRIPTION: Lists all assistants, with optional filtering and pagination.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_90

LANGUAGE: APIDOC
CODE:
```
## GET /assistants

### Description
Lists all assistants.

### Method
GET

### Endpoint
/assistants

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **params** (object) - Optional - Parameters for filtering and pagination.

### Request Example
(None)

### Response
#### Success Response (200)
- **AssistantsPage** (object) - A page containing a list of assistant objects.

#### Response Example
{
  "object": "list",
  "data": [
    {
      "id": "asst_abc123",
      "object": "assistant",
      "name": "My Assistant"
    },
    {
      "id": "asst_def456",
      "object": "assistant",
      "name": "Another Assistant"
    }
  ],
  "first_id": "asst_abc123",
  "last_id": "asst_def456",
  "has_next_page": false
}
```

--------------------------------

TITLE: GET /fine_tuning/jobs
DESCRIPTION: Lists all fine-tuning jobs.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_41

LANGUAGE: APIDOC
CODE:
```
## GET /fine_tuning/jobs

### Description
Lists all fine-tuning jobs.

### Method
GET

### Endpoint
/fine_tuning/jobs

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **params** (object) - Optional - Filtering and pagination parameters.

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **jobs** (FineTuningJobsPage) - A list of fine-tuning job objects.

#### Response Example
{}
```

--------------------------------

TITLE: Set up mock server for OpenAI Node.js library tests with Prism
DESCRIPTION: Details how to set up a mock server using `npx prism` against an OpenAPI specification. This mock server is a prerequisite for running most tests in the OpenAI Node.js library.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_4

LANGUAGE: sh
CODE:
```
$ npx prism mock path/to/your/openapi.yml
```

--------------------------------

TITLE: Execute tests for OpenAI Node.js library
DESCRIPTION: Simple command to run the test suite for the OpenAI Node.js library after the mock server has been successfully set up.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_5

LANGUAGE: sh
CODE:
```
$ yarn run test
```

--------------------------------

TITLE: GET /threads/{thread_id}/runs/{run_id}/steps
DESCRIPTION: Lists all steps for a given run, allowing for pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_118

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/runs/{run_id}/steps

### Description
Lists all steps for a given run, allowing for pagination and filtering.

### Method
GET

### Endpoint
/threads/{thread_id}/runs/{run_id}/steps

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run to list steps for.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Default is 20.
- **order** (string) - Optional - Sort order by created_at. 'asc' or 'desc'. Default is 'desc'.
- **after** (string) - Optional - A cursor for use in pagination. Returns objects after this ID.
- **before** (string) - Optional - A cursor for use in pagination. Returns objects before this ID.

#### Request Body
- (Not applicable)

### Request Example
{}

### Response
#### Success Response (200)
- **data** (array of RunStep) - A list of run step objects.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next** (boolean) - True if there are more items to retrieve.

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: Install OpenAI API Library with npm
DESCRIPTION: This command installs the official OpenAI API library for Node.js projects using npm, making it available for use in TypeScript and JavaScript applications.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm install openai
```

--------------------------------

TITLE: Install `@cloudflare/workers-types` for OpenAI library in Cloudflare Workers (JSON)
DESCRIPTION: This `package.json` snippet specifies how to add `@cloudflare/workers-types` to `devDependencies`. This type package is essential for providing Cloudflare Workers-specific type definitions when using the OpenAI library in such an environment.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_24

LANGUAGE: json
CODE:
```
{
  "devDependencies": {
    "@cloudflare/workers-types": ">= 0.20221111.0"
  }
}
```

--------------------------------

TITLE: Run OpenAI SDK Migration CLI Tool
DESCRIPTION: Utilize the provided migration tool to automatically update your codebase for the new OpenAI SDK version. First, upgrade the `openai` package, then execute the CLI command with your source folders. Use the `--dry` option to preview changes without writing them to disk.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_0

LANGUAGE: bash
CODE:
```
./node_modules/.bin/openai migrate ./your/src/folders
```

LANGUAGE: bash
CODE:
```
./node_modules/.bin/openai migrate ./your/src/folders --dry
```

--------------------------------

TITLE: Import Uploadable Type and toFile Utility after Core Refactor
DESCRIPTION: Following the `core` refactor, the `openai/uploads` module was relocated to `openai/core/uploads`. This example demonstrates how to correctly import the `Uploadable` type and the `toFile` utility function, which remain public API exports, unlike many other removed exports.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_9

LANGUAGE: typescript
CODE:
```
import { type Uploadable, toFile } from 'openai/core/uploads';
```

--------------------------------

TITLE: Link local OpenAI Node.js library repository for development
DESCRIPTION: Provides instructions for linking a locally cloned OpenAI Node.js repository to another project using `yarn link` or `pnpm link`. This enables local development and testing without publishing the package.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_3

LANGUAGE: sh
CODE:
```
# Clone
$ git clone https://www.github.com/openai/openai-node
$ cd openai-node

# With yarn
$ yarn link
$ cd ../my-package
$ yarn link openai

# With pnpm
$ pnpm link --global
$ cd ../my-package
$ pnpm link -—global openai
```

--------------------------------

TITLE: Create and Stream OpenAI Assistant Run with Event Subscriptions
DESCRIPTION: Demonstrates how to create a new run for an OpenAI Assistant, stream its output, and subscribe to various events such as 'textCreated', 'textDelta', 'toolCallCreated', and 'toolCallDelta'. This example includes handling code interpreter outputs for real-time display.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_2

LANGUAGE: ts
CODE:
```
const run = openai.beta.threads.runs
  .stream(thread.id, { assistant_id: assistant.id })
  .on('textCreated', (text) => process.stdout.write('\nassistant > '))
  .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
  .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        process.stdout.write(toolCallDelta.code_interpreter.input);
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write('\noutput >\n');
        toolCallDelta.code_interpreter.outputs.forEach((output) => {
          if (output.type === 'logs') {
            process.stdout.write(`\n${output.logs}\n`);
          }
        });
      }
    }
  });
```

--------------------------------

TITLE: Use OpenAI Realtime API with WebSocket
DESCRIPTION: Demonstrates how to initialize and use the `OpenAIRealtimeWebSocket` for building low-latency, multi-modal conversational experiences. This example shows how to connect to the Realtime API and listen for text delta responses.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_11

LANGUAGE: ts
CODE:
```
import { OpenAIRealtimeWebSocket } from 'openai/realtime/websocket';

const rt = new OpenAIRealtimeWebSocket({ model: 'gpt-realtime' });

rt.on('response.text.delta', (event) => process.stdout.write(event.delta));
```

--------------------------------

TITLE: Configure Proxy Agents for OpenAI Node.js Client Across Runtimes
DESCRIPTION: Provides examples for configuring proxy behavior when using the OpenAI Node.js client in different JavaScript runtimes. It shows how to set up proxies for Node.js (using `undici.ProxyAgent`), Bun, and Deno environments.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_25

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'openai';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new OpenAI({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'npm:openai';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new OpenAI({
  fetchOptions: {
    client: httpClient,
  },
});
```

--------------------------------

TITLE: Update OpenAI Resource Class Import Methods
DESCRIPTION: This snippet illustrates the revised approach for importing resource classes like `Completions` in the OpenAI Node.js SDK. Direct root imports are no longer supported; users must now access them as static properties of the main `OpenAI` client or import them directly from their specific resource files.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_8

LANGUAGE: typescript
CODE:
```
// Before
const { Completions } = require('openai');
```

LANGUAGE: typescript
CODE:
```
// After
const { OpenAI } = require('openai');
OpenAI.Completions; // or import directly from openai/resources/completions
```

--------------------------------

TITLE: Simplify Manual Pagination Request Options with nextPageRequestOptions()
DESCRIPTION: The interface for manually paginating through list results has been simplified in the SDK. This snippet illustrates the change from using `nextPageParams()` or `nextPageInfo()` to the unified `nextPageRequestOptions()`, which provides all necessary parameters for fetching the next page.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_14

LANGUAGE: typescript
CODE:
```
// Before
page.nextPageParams();
page.nextPageInfo();
// Required manually handling { url } | { params } type
```

LANGUAGE: typescript
CODE:
```
// After
page.nextPageRequestOptions();
```

--------------------------------

TITLE: GET /vector_stores
DESCRIPTION: Lists all available vector stores, with optional filtering and pagination.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_58

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores

### Description
Lists all available vector stores, with optional filtering and pagination.

### Method
GET

### Endpoint
/vector_stores

### Parameters
#### Query Parameters
- **params** (object) - Optional - Additional query parameters for filtering and pagination (e.g., `limit`, `order`).

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **data** (array) - An array of vector store objects.

#### Response Example
{
  "data": [
    {
      "id": "vs_abc123",
      "name": "My Documents Store",
      "status": "active"
    },
    {
      "id": "vs_def456",
      "name": "Another Store",
      "status": "active"
    }
  ],
  "has_next_page": false
}
```

--------------------------------

TITLE: Configure OpenAI Node.js Client Proxy with fetchOptions (Before/After)
DESCRIPTION: The `httpAgent` client option has been removed in favor of `fetchOptions` for configuring HTTP agents and proxies. This change was made because `httpAgent` relies on Node.js-specific `node:http` agents, which are incompatible with modern `fetch` implementations. Users should migrate to `fetchOptions` with `undici.ProxyAgent` for proxy support.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_6

LANGUAGE: typescript
CODE:
```
import OpenAI from 'openai';
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configure the default for all requests:
const client = new OpenAI({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});
```

LANGUAGE: typescript
CODE:
```
import OpenAI from 'openai';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent(process.env.PROXY_URL);
const client = new OpenAI({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

--------------------------------

TITLE: GET /batches
DESCRIPTION: Lists all batch jobs associated with your account. This endpoint supports pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_138

LANGUAGE: APIDOC
CODE:
```
## GET /batches

### Description
Lists all batch jobs associated with your account. This endpoint supports pagination and filtering.

### Method
GET

### Endpoint
/batches

### Parameters
#### Query Parameters
- **params** (object) - Optional - Pagination and filtering options (e.g., `limit`, `after`).

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **object** (string) - The object type, usually "list".
- **data** (array<Batch>) - An array of Batch objects.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_more** (boolean) - True if there are more objects to retrieve.

#### Response Example
{
  "object": "list",
  "data": [
    {
      "id": "batch_abc123",
      "object": "batch",
      "endpoint": "/v1/chat/completions",
      "status": "completed"
    },
    {
      "id": "batch_def456",
      "object": "batch",
      "endpoint": "/v1/embeddings",
      "status": "in_progress"
    }
  ],
  "first_id": "batch_abc123",
  "last_id": "batch_def456",
  "has_more": false
}
```

--------------------------------

TITLE: Migrate from runFunctions() to runTools() in Chat Completions
DESCRIPTION: The deprecated `client.chat.completions.runFunctions()` method and its associated types have been removed from the SDK. This snippet demonstrates the updated approach, advising users to transition to `client.chat.completions.runTools()` for handling tool-based chat completions.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_17

LANGUAGE: typescript
CODE:
```
// Before
client.chat.completions.runFunctions();
```

LANGUAGE: typescript
CODE:
```
// After
client.chat.completions.runTools();
```

--------------------------------

TITLE: GET /files
DESCRIPTION: Lists all files that have been uploaded to your OpenAI account. You can optionally filter the list by their purpose.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_18

LANGUAGE: APIDOC
CODE:
```
## GET /files

### Description
Lists all files that have been uploaded to your OpenAI account. You can optionally filter the list by their purpose.

### Method
GET

### Endpoint
/files

### Parameters
#### Query Parameters
- **purpose** (string) - Optional - Only return files with the given purpose.

### Request Example
{}

### Response
#### Success Response (200)
- **data** (array<object>) - A list of file objects.
- **object** (string) - The object type, always "list".
- **has_next** (boolean) - Indicates if there are more objects to retrieve.

#### Response Example
{
  "data": [
    {
      "id": "file-XjGxS3KTG0uWsA3mWp6lAPad",
      "object": "file",
      "bytes": 140,
      "created_at": 1613779121,
      "filename": "mydata.jsonl",
      "purpose": "fine-tune",
      "status": "processed"
    },
    {
      "id": "file-abcdefg123hijklmn456opqrs7",
      "object": "file",
      "bytes": 2000,
      "created_at": 1678901234,
      "filename": "another_file.jsonl",
      "purpose": "assistants",
      "status": "uploaded"
    }
  ],
  "object": "list",
  "has_next": false
}
```

--------------------------------

TITLE: Initialize Azure OpenAI Realtime WebSocket Client (TypeScript)
DESCRIPTION: This example illustrates how to set up a real-time streaming client for Azure OpenAI using `OpenAIRealtimeWS.azure`. It requires a pre-configured `AzureOpenAI` client, demonstrating the integration of authentication and API versioning for real-time capabilities.

SOURCE: https://github.com/openai/openai-node/blob/master/azure.md#_snippet_1

LANGUAGE: typescript
CODE:
```
const cred = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const deploymentName = 'gpt-4o-realtime-preview-1001';
const azureADTokenProvider = getBearerTokenProvider(cred, scope);
const client = new AzureOpenAI({
  azureADTokenProvider,
  apiVersion: '2024-10-01-preview',
  deployment: deploymentName,
});
const rt = await OpenAIRealtimeWS.azure(client);
```

--------------------------------

TITLE: Manually publish OpenAI Node.js library to npm
DESCRIPTION: Instructions for manually publishing the OpenAI Node.js library to npm by running a specific script. This method requires an `NPM_TOKEN` environment variable to be set and is used when automated release pipelines are not utilized.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_8

LANGUAGE: sh
CODE:
```
bin/publish-npm
```

--------------------------------

TITLE: GET /fine_tuning/jobs/{fine_tuning_job_id}/checkpoints
DESCRIPTION: Lists checkpoints for a specific fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_46

LANGUAGE: APIDOC
CODE:
```
## GET /fine_tuning/jobs/{fine_tuning_job_id}/checkpoints

### Description
Lists checkpoints for a specific fine-tuning job.

### Method
GET

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job.

#### Query Parameters
- **params** (object) - Optional - Filtering and pagination parameters for checkpoints.

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **checkpoints** (FineTuningJobCheckpointsPage) - A list of fine-tuning job checkpoint objects.

#### Response Example
{}
```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}/files
DESCRIPTION: Lists all files associated with a specific vector store, with options for pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_64

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}/files

### Description
Lists all files associated with a specific vector store, with options for pagination and filtering.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}/files

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
- **order** (string) - Optional - Sort order by the 'created_at' timestamp of the objects. 'asc' for ascending order and 'desc' for descending order. Default is 'desc'.
- **after** (string) - Optional - A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include `after=obj_foo` in your request to fetch the next page of the list.
- **before** (string) - Optional - A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include `before=obj_foo` in your request to fetch the previous page of the list.
- **status** (string) - Optional - Filter by the `status` of the files. Can be one of `in_progress`, `completed`, `failed`, `cancelled`.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **object** (string) - The type of object, typically "list".
- **data** (array<VectorStoreFile>) - A list of vector store files.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next_page** (boolean) - True if there are more items to retrieve.

#### Response Example
```json
{
  "object": "list",
  "data": [
    {
      "id": "file_abc123",
      "object": "vector_store.file",
      "created_at": 1678886400,
      "vector_store_id": "vs_xyz789",
      "status": "completed",
      "last_error": null,
      "usage_bytes": 10240
    }
  ],
  "first_id": "file_abc123",
  "last_id": "file_def456",
  "has_next_page": false
}
```
```

--------------------------------

TITLE: GET /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions
DESCRIPTION: Retrieves the list of permissions associated with a specific fine-tuning checkpoint.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_51

LANGUAGE: APIDOC
CODE:
```
## GET /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

### Description
Retrieves the list of permissions associated with a specific fine-tuning checkpoint.

### Method
GET

### Endpoint
/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

### Parameters
#### Path Parameters
- **fine_tuned_model_checkpoint** (string) - Required - The ID of the fine-tuned model checkpoint.

#### Query Parameters
- **params** (object) - Optional - Additional query parameters for filtering permissions.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **data** (array) - An array of permission objects for the checkpoint.

#### Response Example
{
  "data": [
    {
      "id": "perm_abc123",
      "fine_tuned_model_checkpoint": "ftc-xyz789",
      "permission_type": "read",
      "user_id": "user_abc123"
    }
  ]
}
```

--------------------------------

TITLE: Access Raw HTTP Response Data in OpenAI Node.js Library
DESCRIPTION: Explains how to access the raw `Response` object from `fetch()` using `.asResponse()` to get headers without consuming the body, or `.withResponse()` to get the raw response along with the parsed data after body consumption.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_18

LANGUAGE: typescript
CODE:
```
const client = new OpenAI();

const httpResponse = await client.responses
  .create({ model: 'gpt-4o', input: 'say this is a test.' })
  .asResponse();

// access the underlying web standard Response object
console.log(httpResponse.headers.get('X-My-Header'));
console.log(httpResponse.statusText);

const { data: modelResponse, response: raw } = await client.responses
  .create({ model: 'gpt-4o', input: 'say this is a test.' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(modelResponse);
```

--------------------------------

TITLE: GET /evals
DESCRIPTION: Lists all evaluations. This endpoint supports pagination and filtering to retrieve a collection of evaluations.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_170

LANGUAGE: APIDOC
CODE:
```
## GET /evals

### Description
Lists all evaluations. This endpoint supports pagination and filtering to retrieve a collection of evaluations.

### Method
GET

### Endpoint
/evals

### Parameters
#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
- **starting_after** (string) - Optional - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list.
- **ending_before** (string) - Optional - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **data** (array) - A list of evaluation objects.
- **object** (string) - The type of object, typically 'list'.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next** (boolean) - True if there are more objects in the list.

#### Response Example
```json
{
  "data": [
    {
      "id": "eval_abc123",
      "object": "eval",
      "status": "completed"
    },
    {
      "id": "eval_def456",
      "object": "eval",
      "status": "failed"
    }
  ],
  "object": "list",
  "first_id": "eval_abc123",
  "last_id": "eval_def456",
  "has_next": false
}
```
```

--------------------------------

TITLE: GET /fine_tuning/jobs/{fine_tuning_job_id}
DESCRIPTION: Retrieves details about a specific fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_40

LANGUAGE: APIDOC
CODE:
```
## GET /fine_tuning/jobs/{fine_tuning_job_id}

### Description
Retrieves details about a specific fine-tuning job.

### Method
GET

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job to retrieve.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **job** (FineTuningJob) - The requested fine-tuning job object.

#### Response Example
{}
```

--------------------------------

TITLE: Automate Function Calls with OpenAI Node.js `runTools` Helper
DESCRIPTION: This example demonstrates how to use the `openai.chat.completions.runTools` helper to automatically execute JavaScript functions based on model requests. It shows how to define tools with associated functions and parameters, handle function arguments with a `parse` function (e.g., `JSON.parse`), and process the final content from the model. The helper automatically loops, calling functions and sending results back to the API until the model no longer requests tools, and includes an event listener for messages.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_14

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI();

async function main() {
  const runner = client.chat.completions
    .runTools({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'How is the weather this week?' }],
      tools: [
        {
          type: 'function',
          function: {
            function: getCurrentLocation,
            parameters: { type: 'object', properties: {} },
          },
        },
        {
          type: 'function',
          function: {
            function: getWeather,
            parse: JSON.parse, // or use a validation library like zod for typesafe parsing.
            parameters: {
              type: 'object',
              properties: {
                location: { type: 'string' },
              },
            },
          },
        },
      ],
    })
    .on('message', (message) => console.log(message));

  const finalContent = await runner.finalContent();
  console.log();
  console.log('Final content:', finalContent);
}

async function getCurrentLocation() {
  return 'Boston'; // Simulate lookup
}

async function getWeather(args: { location: string }) {
  const { location } = args;
  // … do lookup …
  return { temperature, precipitation };
}

main();
```

--------------------------------

TITLE: List Run Steps (OpenAI Node.js Client)
DESCRIPTION: Lists all steps associated with a specific run, identified by its `runID`. This method performs a GET request and supports pagination and filtering through optional parameters. It returns a `RunStepsPage` containing a list of `RunStep` objects.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_110

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.steps.list(runID, { ...params })
```

--------------------------------

TITLE: GET /fine_tuning/jobs/{fine_tuning_job_id}/events
DESCRIPTION: Lists events for a specific fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_43

LANGUAGE: APIDOC
CODE:
```
## GET /fine_tuning/jobs/{fine_tuning_job_id}/events

### Description
Lists events for a specific fine-tuning job.

### Method
GET

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}/events

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job.

#### Query Parameters
- **params** (object) - Optional - Filtering and pagination parameters for events.

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **events** (FineTuningJobEventsPage) - A list of fine-tuning job event objects.

#### Response Example
{}
```

--------------------------------

TITLE: GET /models/{model}
DESCRIPTION: Retrieves details about a specific model by its ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_36

LANGUAGE: APIDOC
CODE:
```
## GET /models/{model}

### Description
Retrieves details about a specific model by its ID.

### Method
GET

### Endpoint
/models/{model}

### Parameters
#### Path Parameters
- **model** (string) - Required - The ID of the model to retrieve.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **model** (Model) - The requested model object.

#### Response Example
{}
```

--------------------------------

TITLE: Iterate Over OpenAI List Results with Async Iterator
DESCRIPTION: This code demonstrates the use of the `for await...of` syntax for iterating through paginated list results from the OpenAI API. This method automatically handles fetching additional pages as needed, providing a streamlined and efficient way to process large collections of data.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_13

LANGUAGE: typescript
CODE:
```
// Automatically fetches more pages as needed.
for await (const fineTuningJob of client.fineTuning.jobs.list()) {
  console.log(fineTuningJob);
}
```

--------------------------------

TITLE: Migrate OpenAI Beta Chat Completions and Types to Main Namespace
DESCRIPTION: The `beta.chat` namespace has been removed, with all previously beta chat completion methods now residing directly under the main `chat.completions` namespace. This snippet shows the updated method calls and import paths for related types like `ParsedChatCompletion`.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_16

LANGUAGE: typescript
CODE:
```
// Before
client.beta.chat.completions.parse()
client.beta.chat.completions.stream()
client.beta.chat.completions.runTools()
```

LANGUAGE: typescript
CODE:
```
// After
client.chat.completions.parse()
client.chat.completions.stream()
client.chat.completions.runTools()
```

LANGUAGE: typescript
CODE:
```
// Before
import { ParsedChatCompletion, ParsedChoice, ParsedFunction } from 'openai/resources/beta/chat/completions';
```

LANGUAGE: typescript
CODE:
```
// After
import { ParsedChatCompletion, ParsedChoice, ParsedFunction } from 'openai/resources/chat/completions';
```

--------------------------------

TITLE: Lint OpenAI Node.js library code
DESCRIPTION: Command to run linting checks on the OpenAI Node.js library codebase using `yarn lint`, which integrates Prettier and ESLint for code quality analysis.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_6

LANGUAGE: sh
CODE:
```
$ yarn lint
```

--------------------------------

TITLE: Migrate from APIClient to Main OpenAI Client Import
DESCRIPTION: The `APIClient` base class has been removed as part of the SDK's simplification. This snippet shows how to update your imports, switching from the `APIClient` in `openai/core` to importing the primary `OpenAI` client class directly from the 'openai' package.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_10

LANGUAGE: typescript
CODE:
```
// Before
import { APIClient } from 'openai/core';
```

LANGUAGE: typescript
CODE:
```
// After
import { OpenAI } from 'openai';
```

--------------------------------

TITLE: GET /assistants/{assistant_id}
DESCRIPTION: Retrieves the details of a specific assistant by its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_88

LANGUAGE: APIDOC
CODE:
```
## GET /assistants/{assistant_id}

### Description
Retrieves an assistant by its ID.

### Method
GET

### Endpoint
/assistants/{assistant_id}

### Parameters
#### Path Parameters
- **assistant_id** (string) - Required - The ID of the assistant to retrieve.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **Assistant** (object) - The retrieved assistant object.

#### Response Example
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1677651200,
  "name": "My Assistant",
  "model": "gpt-4o"
}
```

--------------------------------

TITLE: Integrate OpenAI Node.js Library with Azure OpenAI
DESCRIPTION: Illustrates how to use the `AzureOpenAI` class for seamless integration with Microsoft Azure OpenAI services. The example includes setting up Azure AD token authentication using `@azure/identity` and making a chat completion request.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_12

LANGUAGE: ts
CODE:
```
import { AzureOpenAI } from 'openai';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const openai = new AzureOpenAI({ azureADTokenProvider });

const result = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Say hello!' }],
});

console.log(result.choices[0]!.message?.content);
```

--------------------------------

TITLE: GET /threads/{thread_id}/runs/{run_id}/steps/{step_id}
DESCRIPTION: Retrieves the details of a specific step within a run.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_117

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/runs/{run_id}/steps/{step_id}

### Description
Retrieves the details of a specific step within a run.

### Method
GET

### Endpoint
/threads/{thread_id}/runs/{run_id}/steps/{step_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run the step belongs to.
- **step_id** (string) - Required - The ID of the step to retrieve.

#### Query Parameters
- (Not specified in source)

#### Request Body
- (Not applicable)

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The ID of the run step.
- **status** (string) - The status of the run step (e.g., 'completed').
- **type** (string) - The type of run step (e.g., 'message_creation', 'tool_calls').
- **step_details** (object) - Details specific to the step type.

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: GET /threads/{thread_id}
DESCRIPTION: Retrieves the details of a specific thread by its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_93

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}

### Description
Retrieves a thread by its ID.

### Method
GET

### Endpoint
/threads/{thread_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to retrieve.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **Thread** (object) - The retrieved thread object.

#### Response Example
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1677651200,
  "metadata": {}
}
```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}/file_batches/{batch_id}/files
DESCRIPTION: Lists the files within a specific file batch for a given vector store, with options for pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_70

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}/file_batches/{batch_id}/files

### Description
Lists the files within a specific file batch for a given vector store, with options for pagination and filtering.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}/file_batches/{batch_id}/files

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **batch_id** (string) - Required - The ID of the file batch.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
- **order** (string) - Optional - Sort order by the 'created_at' timestamp of the objects. 'asc' for ascending order and 'desc' for descending order. Default is 'desc'.
- **after** (string) - Optional - A cursor for use in pagination.
- **before** (string) - Optional - A cursor for use in pagination.
- **status** (string) - Optional - Filter by the `status` of the files within the batch. Can be one of `in_progress`, `completed`, `failed`, `cancelled`.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **object** (string) - The type of object, typically "list".
- **data** (array<VectorStoreFile>) - A list of vector store files belonging to the batch.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next_page** (boolean) - True if there are more items to retrieve.

#### Response Example
```json
{
  "object": "list",
  "data": [
    {
      "id": "file_batch_file_1",
      "object": "vector_store.file",
      "created_at": 1678886401,
      "vector_store_id": "vs_xyz789",
      "status": "completed",
      "last_error": null,
      "usage_bytes": 5120
    }
  ],
  "first_id": "file_batch_file_1",
  "last_id": "file_batch_file_2",
  "has_next_page": false
}
```
```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}
DESCRIPTION: Retrieves the details of a specific vector store by its unique identifier.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_56

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}

### Description
Retrieves the details of a specific vector store by its unique identifier.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to retrieve.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **data** (object) - The retrieved vector store object.

#### Response Example
{
  "id": "vs_abc123",
  "name": "My Documents Store",
  "status": "active",
  "created_at": 1678886400,
  "chunking_strategy": {
    "type": "auto"
  }
}
```

--------------------------------

TITLE: Generate Text with OpenAI Responses API (TypeScript)
DESCRIPTION: This example demonstrates how to use the OpenAI Responses API to generate text from a specified model (e.g., gpt-4o). It initializes the client with an API key and logs the generated output.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_2

LANGUAGE: ts
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.responses.create({
  model: 'gpt-4o',
  instructions: 'You are a coding assistant that talks like a pirate',
  input: 'Are semicolons optional in JavaScript?',
});

console.log(response.output_text);
```

--------------------------------

TITLE: Paginate List Methods in OpenAI Node.js API
DESCRIPTION: Demonstrates how to handle paginated list methods in the OpenAI API. It covers using `for await...of` for automatic iteration across all pages and provides an example of manual pagination using `hasNextPage()` and `getNextPage()` methods.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_16

LANGUAGE: ts
CODE:
```
async function fetchAllFineTuningJobs(params) {
  const allFineTuningJobs = [];
  // Automatically fetches more pages as needed.
  for await (const fineTuningJob of client.fineTuning.jobs.list({ limit: 20 })) {
    allFineTuningJobs.push(fineTuningJob);
  }
  return allFineTuningJobs;
}
```

LANGUAGE: ts
CODE:
```
let page = await client.fineTuning.jobs.list({ limit: 20 });
for (const fineTuningJob of page.data) {
  console.log(fineTuningJob);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = await page.getNextPage();
  // ...
}
```

--------------------------------

TITLE: GET /threads/{thread_id}/runs/{run_id}
DESCRIPTION: Retrieves the details of a specific run associated with a thread.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_112

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/runs/{run_id}

### Description
Retrieves the details of a specific run associated with a thread.

### Method
GET

### Endpoint
/threads/{thread_id}/runs/{run_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run to retrieve.

#### Query Parameters
- (Not specified in source)

#### Request Body
- (Not applicable)

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The ID of the run.
- **status** (string) - The current status of the run.
- **thread_id** (string) - The ID of the thread this run belongs to.
- (Other fields for Run object)

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}/file_batches/{batch_id}
DESCRIPTION: Retrieves the details of a specific file batch within a vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_68

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}/file_batches/{batch_id}

### Description
Retrieves the details of a specific file batch within a vector store.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}/file_batches/{batch_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **batch_id** (string) - Required - The ID of the file batch to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the file batch.
- **object** (string) - The type of object, typically "vector_store.file_batch".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file batch was created.
- **vector_store_id** (string) - The ID of the vector store that this batch belongs to.
- **status** (string) - The status of the file batch, e.g., "in_progress", "completed", "failed", "cancelled".
- **file_counts** (object) - Counts of files in the batch by their status.

#### Response Example
```json
{
  "id": "vsfb_abc123",
  "object": "vector_store.file_batch",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "completed",
  "file_counts": {
    "in_progress": 0,
    "completed": 2,
    "failed": 0,
    "cancelled": 0,
    "total": 2
  }
}
```
```

--------------------------------

TITLE: GET /threads/{thread_id}/runs
DESCRIPTION: Lists all runs associated with a specific thread, allowing for pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_114

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/runs

### Description
Lists all runs associated with a specific thread, allowing for pagination and filtering.

### Method
GET

### Endpoint
/threads/{thread_id}/runs

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to list runs for.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Default is 20.
- **order** (string) - Optional - Sort order by created_at. 'asc' or 'desc'. Default is 'desc'.
- **after** (string) - Optional - A cursor for use in pagination. Returns objects after this ID.
- **before** (string) - Optional - A cursor for use in pagination. Returns objects before this ID.

#### Request Body
- (Not applicable)

### Request Example
{}

### Response
#### Success Response (200)
- **data** (array of Run) - A list of run objects.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next** (boolean) - True if there are more items to retrieve.

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: POST /assistants
DESCRIPTION: Creates a new assistant with specified configurations and tools.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_87

LANGUAGE: APIDOC
CODE:
```
## POST /assistants

### Description
Creates a new assistant.

### Method
POST

### Endpoint
/assistants

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for creating the assistant.

### Request Example
{
  "model": "gpt-4o",
  "name": "My Assistant",
  "description": "An assistant for general tasks.",
  "instructions": "You are a helpful AI assistant."
}

### Response
#### Success Response (200)
- **Assistant** (object) - The created assistant object.

#### Response Example
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1677651200,
  "name": "My Assistant",
  "model": "gpt-4o"
}
```

--------------------------------

TITLE: GET /containers/{container_id}
DESCRIPTION: Retrieves the details of a specific container by its unique identifier. This allows you to inspect its properties and contents.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_180

LANGUAGE: APIDOC
CODE:
```
## GET /containers/{container_id}

### Description
Retrieves the details of a specific container by its unique identifier. This allows you to inspect its properties and contents.

### Method
GET

### Endpoint
/containers/{container_id}

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the container.
- **name** (string) - The name of the container.
- **description** (string) - The description of the container.
- **created_at** (integer) - The Unix timestamp (in seconds) when the container was created.

#### Response Example
```json
{
  "id": "container_abc123",
  "name": "MyNew
```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}/files/{file_id}
DESCRIPTION: Retrieves the details of a specific file associated with a given vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_62

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}/files/{file_id}

### Description
Retrieves the details of a specific file associated with a given vector store.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}/files/{file_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **file_id** (string) - Required - The ID of the file to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the vector store file.
- **object** (string) - The type of object, typically "vector_store.file".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the vector store file was created.
- **vector_store_id** (string) - The ID of the vector store that this file belongs to.
- **status** (string) - The status of the vector store file, e.g., "completed", "in_progress", "failed".
- **last_error** (object) - Details about the last error if the file processing failed.
- **usage_bytes** (integer) - The number of bytes used by this file in the vector store.

#### Response Example
```json
{
  "id": "file_abc123",
  "object": "vector_store.file",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "completed",
  "last_error": null,
  "usage_bytes": 10240
}
```
```

--------------------------------

TITLE: GET /evals/{eval_id}/runs/{run_id}/output_items
DESCRIPTION: Lists all output items for a specific evaluation run. This endpoint supports pagination and filtering to browse the results.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_178

LANGUAGE: APIDOC
CODE:
```
## GET /evals/{eval_id}/runs/{run_id}/output_items

### Description
Lists all output items for a specific evaluation run. This endpoint supports pagination and filtering to browse the results.

### Method
GET

### Endpoint
/evals/{eval_id}/runs/{run_id}/output_items

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.
- **run_id** (string) - Required - The ID of the run.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **data** (array) - A list of output item objects.
- **object** (string) - The type of object, typically 'list'.

#### Response Example
```json
{
  "data": [
    {
      "id": "output_item_xyz",
      "object": "output_item",
      "data": { "prompt": "...", "completion": "..." }
    },
    {
      "id": "output_item_uvw",
      "object": "output_item",
      "data": { "prompt": "...", "completion": "..." }
    }
  ],
  "object": "list"
}
```
```

--------------------------------

TITLE: GET /evals/{eval_id}/runs
DESCRIPTION: Lists all runs associated with a specific evaluation. This endpoint supports pagination and filtering.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_174

LANGUAGE: APIDOC
CODE:
```
## GET /evals/{eval_id}/runs

### Description
Lists all runs associated with a specific evaluation. This endpoint supports pagination and filtering.

### Method
GET

### Endpoint
/evals/{eval_id}/runs

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **data** (array) - A list of run objects.
- **object** (string) - The type of object, typically 'list'.

#### Response Example
```json
{
  "data": [
    {
      "id": "run_123def",
      "object": "eval_run",
      "status": "completed"
    },
    {
      "id": "run_456ghi",
      "object": "eval_run",
      "status": "failed"
    }
  ],
  "object": "list"
}
```
```

--------------------------------

TITLE: GET /conversations/{conversation_id}
DESCRIPTION: Retrieves a specific conversation by its unique identifier. This allows access to conversation details.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_144

LANGUAGE: APIDOC
CODE:
```
## GET /conversations/{conversation_id}

### Description
Retrieves a specific conversation by ID.

### Method
GET

### Endpoint
/conversations/{conversation_id}

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation to retrieve.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the conversation.
- **created_at** (string) - Timestamp when the conversation was created.
- **updated_at** (string) - Timestamp when the conversation was last updated.

#### Response Example
{
  "id": "conv_abc123",
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z"
}
```

--------------------------------

TITLE: GET /vector_stores/{vector_store_id}/files/{file_id}/content
DESCRIPTION: Retrieves the content of a specific file associated with a given vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_66

LANGUAGE: APIDOC
CODE:
```
## GET /vector_stores/{vector_store_id}/files/{file_id}/content

### Description
Retrieves the content of a specific file associated with a given vector store.

### Method
GET

### Endpoint
/vector_stores/{vector_store_id}/files/{file_id}/content

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **file_id** (string) - Required - The ID of the file whose content to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **content** (string) - The content of the file.

#### Response Example
```json
{
  "content": "This is the content of the file."
}
```
```

--------------------------------

TITLE: GET /containers/{container_id}/files
DESCRIPTION: Lists all files within a specified container. This endpoint can also support pagination and filtering via query parameters.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_183

LANGUAGE: APIDOC
CODE:
```
## GET /containers/{container_id}/files

### Description
Lists all files within a specified container. This endpoint can also support pagination and filtering.

### Method
GET

### Endpoint
/containers/{container_id}/files

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Defaults to 20.
- **after** (string) - Optional - A cursor for use in pagination. Fetches the next page of results.
- **before** (string) - Optional - A cursor for use in pagination. Fetches the previous page of results.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **data** (array of objects) - A list of file objects.
  - **id** (string) - The ID of the file.
  - **filename** (string) - The name of the file.
  - **size** (integer) - The size of the file in bytes.
  - **created_at** (integer) - The Unix timestamp (in seconds) for when the file was created.
- **object** (string) - The type of list, typically "list".
- **first_id** (string) - The ID of the first object in the current page.
- **last_id** (string) - The ID of the last object in the current page.
- **has_next_page** (boolean) - Indicates if there are more results after the current page.

#### Response Example
```json
{
  "data": [
    {
      "id": "file-abc123def456",
      "filename": "example.txt",
      "size": 1234,
      "created_at": 1678886400,
      "object": "file"
    },
    {
      "id": "file-ghi789jkl012",
      "filename": "another.pdf",
      "size": 5678,
      "created_at": 1678886500,
      "object": "file"
    }
  ],
  "object": "list",
  "first_id": "file-abc123def456",
  "last_id": "file-ghi789jkl012",
  "has_next_page": false
}
```
```

--------------------------------

TITLE: Configure `tsconfig.json` for OpenAI library in Cloudflare Workers (JSONC)
DESCRIPTION: This `tsconfig.json` snippet provides the recommended configuration for Cloudflare Workers environments. It includes specific `lib` and `types` settings required by `@cloudflare/workers-types` to ensure compatibility with the OpenAI library.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_23

LANGUAGE: jsonc
CODE:
```
{
  "target": "ES2018", // note: we recommend ES2020 or higher
  "lib": ["ES2020"], // <- needed by @cloudflare/workers-types
  "types": ["@cloudflare/workers-types"]
}
```

--------------------------------

TITLE: GET /containers/{container_id}/files/{file_id}/content
DESCRIPTION: Retrieves the raw content of a specific file from a container. This typically returns the file's binary data.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_185

LANGUAGE: APIDOC
CODE:
```
## GET /containers/{container_id}/files/{file_id}/content

### Description
Retrieves the raw content of a specific file from a container.

### Method
GET

### Endpoint
/containers/{container_id}/files/{file_id}/content

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container.
- **file_id** (string) - Required - The ID of the file whose content is to be retrieved.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **file_content** (binary) - The raw content of the file. The `Content-Type` header will indicate the file type (e.g., `text/plain`, `application/pdf`).

#### Response Example
(Raw file content, e.g., 'Hello, this is my file content.')

```

--------------------------------

TITLE: Configure `tsconfig.json` for OpenAI library in Node.js (JSONC)
DESCRIPTION: This `tsconfig.json` configuration is suggested for Node.js projects utilizing the OpenAI library. It specifies the ECMAScript target version to prevent type conflicts and ensure proper compilation.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_21

LANGUAGE: jsonc
CODE:
```
{
  "target": "ES2018" // note: we recommend ES2020 or higher
}
```

--------------------------------

TITLE: GET /conversations/{conversation_id}/items
DESCRIPTION: Lists all items within a specific conversation. Supports pagination and filtering through query parameters.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_149

LANGUAGE: APIDOC
CODE:
```
## GET /conversations/{conversation_id}/items

### Description
Lists all items within a specific conversation.

### Method
GET

### Endpoint
/conversations/{conversation_id}/items

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation to list items from.

#### Query Parameters
- **limit** (integer) - Optional - Maximum number of items to return (default: 100).
- **cursor** (string) - Optional - A cursor for pagination, pointing to the next page of results.

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **data** (array) - A list of conversation items.
- **next_cursor** (string) - A cursor for retrieving the next page of items, if available.

#### Response Example
{
  "data": [
    {
      "id": "item_xyz789",
      "conversation_id": "conv_abc123",
      "type": "message",
      "content": {
        "text": "Hello, how are you?"
      }
    }
  ],
  "next_cursor": "next_page_token"
}
```

--------------------------------

TITLE: Configure `tsconfig.json` for OpenAI library in Browsers (JSONC)
DESCRIPTION: This configuration snippet for `tsconfig.json` is recommended for browser environments when using the OpenAI library. It helps resolve TypeScript type errors by setting the target ECMAScript version and including necessary DOM libraries.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_20

LANGUAGE: jsonc
CODE:
```
{
  "target": "ES2018", // note: we recommend ES2020 or higher
  "lib": ["DOM", "DOM.Iterable", "ES2018"]
}
```

--------------------------------

TITLE: Parse Chat Completion with Zod Function Tool Calls (TypeScript)
DESCRIPTION: This example illustrates how `client.chat.completions.parse()` can automatically parse function tool calls using `zodFunction()` and strict tool schemas. It defines a complex Zod schema for a `Query` function, demonstrating how to structure tool parameters for database-like queries and then extract the parsed arguments from the tool call for further processing.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_1

LANGUAGE: typescript
CODE:
```
import { zodFunction } from 'openai/helpers/zod';
import OpenAI from 'openai/index';
import { z } from 'zod';

const Table = z.enum(['orders', 'customers', 'products']);

const Column = z.enum([
  'id',
  'status',
  'expected_delivery_date',
  'delivered_at',
  'shipped_at',
  'ordered_at',
  'canceled_at',
]);

const Operator = z.enum(['=', '>', '<', '<=', '>=', '!=']);

const OrderBy = z.enum(['asc', 'desc']);

const DynamicValue = z.object({
  column_name: z.string(),
});

const Condition = z.object({
  column: z.string(),
  operator: Operator,
  value: z.union([z.string(), z.number(), DynamicValue]),
});

const Query = z.object({
  table_name: Table,
  columns: z.array(Column),
  conditions: z.array(Condition),
  order_by: OrderBy,
});

const client = new OpenAI();
const completion = await client.chat.completions.parse({
  model: 'gpt-4o-2024-08-06',
  messages: [
    {
      role: 'system',
      content:
        'You are a helpful assistant. The current date is August 6, 2024. You help users query for the data they are looking for by calling the query function.',
    },
    {
      role: 'user',
      content: 'look up all my orders in november of last year that were fulfilled but not delivered on time',
    },
  ],
  tools: [zodFunction({ name: 'query', parameters: Query })],
});
console.dir(completion, { depth: 10 });

const toolCall = completion.choices[0]?.message.tool_calls?.[0];
if (toolCall) {
  const args = toolCall.function.parsed_arguments as z.infer<typeof Query>;
  console.log(args);
  console.log(args.table_name);
}

main();
```

--------------------------------

TITLE: POST /fine_tuning/alpha/graders/run
DESCRIPTION: Initiates a run of a grader for fine-tuning alpha, evaluating models or datasets.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_53

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/alpha/graders/run

### Description
Initiates a run of a grader for fine-tuning alpha, evaluating models or datasets.

### Method
POST

### Endpoint
/fine_tuning/alpha/graders/run

### Parameters
#### Request Body
- **params** (object) - Required - Parameters for the grader run, such as model ID and evaluation data.

### Request Example
{
  "grader_id": "grader_xyz789",
  "model_to_evaluate": "ftc-123",
  "evaluation_data": [
    {
      "input": "test input",
      "expected_output": "expected output"
    }
  ]
}

### Response
#### Success Response (200)
- **data** (object) - The result of the grader run.

#### Response Example
{
  "run_id": "run_abc123",
  "status": "completed",
  "score": 0.95
}
```

--------------------------------

TITLE: Update import paths from `openai/src` to `openai` (TypeScript)
DESCRIPTION: This snippet demonstrates the necessary change in import paths following the removal of the `openai/src` directory. Users should update any existing imports from `openai/src/*` to simply `openai/*` to ensure correct module resolution.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_19

LANGUAGE: ts
CODE:
```
// Before
import OpenAI from 'openai/src';
```

LANGUAGE: ts
CODE:
```
// After
import OpenAI from 'openai';
```

--------------------------------

TITLE: POST /uploads
DESCRIPTION: Initiates a new file upload. This step prepares the system to receive file data.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_140

LANGUAGE: APIDOC
CODE:
```
## POST /uploads

### Description
Initiates a new file upload. This step prepares the system to receive file data.

### Method
POST

### Endpoint
/uploads

### Parameters
#### Request Body
- **params** (object) - Required -
```

--------------------------------

TITLE: GET /files/{file_id}
DESCRIPTION: Retrieves information about a specific file uploaded to OpenAI. This includes metadata like file size, purpose, and creation date.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_17

LANGUAGE: APIDOC
CODE:
```
## GET /files/{file_id}

### Description
Retrieves information about a specific file uploaded to OpenAI. This includes metadata like file size, purpose, and creation date.

### Method
GET

### Endpoint
/files/{file_id}

### Parameters
#### Path Parameters
- **file_id** (string) - Required - The ID of the file to retrieve.

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The ID of the file.
- **object** (string) - The object type, always "file".
- **bytes** (integer) - The size of the file in bytes.
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file was created.
- **filename** (string) - The name of the file.
- **purpose** (string) - The purpose of the file.
- **status** (string) - The status of the file, e.g., `uploaded`, `processed`.

#### Response Example
{
  "id": "file-XjGxS3KTG0uWsA3mWp6lAPad",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779121,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune",
  "status": "processed"
}
```

--------------------------------

TITLE: GET /containers/{container_id}/files/{file_id}
DESCRIPTION: Retrieves metadata for a specific file within a container. This does not return the file's content, only its properties.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_182

LANGUAGE: APIDOC
CODE:
```
## GET /containers/{container_id}/files/{file_id}

### Description
Retrieves metadata for a specific file within a container.

### Method
GET

### Endpoint
/containers/{container_id}/files/{file_id}

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container.
- **file_id** (string) - Required - The ID of the file to retrieve metadata for.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the file.
- **filename** (string) - The name of the file.
- **size** (integer) - The size of the file in bytes.
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file was created.
- **object** (string) - The type of object, typically "file".

#### Response Example
```json
{
  "id": "file-abc123def456",
  "filename": "example.txt",
  "size": 1234,
  "created_at": 1678886400,
  "object": "file"
}
```
```

--------------------------------

TITLE: GET /evals/{eval_id}/runs/{run_id}
DESCRIPTION: Retrieves the details of a specific run for an evaluation. This provides insights into the run's progress and results.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_173

LANGUAGE: APIDOC
CODE:
```
## GET /evals/{eval_id}/runs/{run_id}

### Description
Retrieves the details of a specific run for an evaluation. This provides insights into the run's progress and results.

### Method
GET

### Endpoint
/evals/{eval_id}/runs/{run_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.
- **run_id** (string) - Required - The ID of the run to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the run.
- **object** (string) - The type of object, typically 'eval_run'.
- **status** (string) - The current status of the run.
- **metrics** (object) - Performance metrics from the run.

#### Response Example
```json
{
  "id": "run_123def",
  "object": "eval_run",
  "status": "completed",
  "metrics": {
    "accuracy": 0.95,
    "latency": 120.5
  }
}
```
```

--------------------------------

TITLE: Remove Manual URI Encoding for Path Parameters
DESCRIPTION: The SDK now automatically encodes path parameters. Remove any manual `encodeURIComponent()` calls from your path parameters. Pass the raw string value, and the SDK will handle the correct URI encoding.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_3

LANGUAGE: typescript
CODE:
```
client.example.retrieve('string/with/slash') // retrieves /example/string%2Fwith%2Fslash
```

--------------------------------

TITLE: GET /evals/{eval_id}
DESCRIPTION: Retrieves the details of a specific evaluation by its unique identifier. This allows you to check the status and configuration of an existing evaluation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_168

LANGUAGE: APIDOC
CODE:
```
## GET /evals/{eval_id}

### Description
Retrieves the details of a specific evaluation by its unique identifier. This allows you to check the status and configuration of an existing evaluation.

### Method
GET

### Endpoint
/evals/{eval_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the evaluation.
- **object** (string) - The type of object, typically 'eval'.
- **created_at** (integer) - The Unix timestamp (in seconds) when the evaluation was created.
- **status** (string) - The current status of the evaluation.
- **config** (object) - The configuration used for the evaluation.

#### Response Example
```json
{
  "id": "eval_abc123",
  "object": "eval",
  "created_at": 1678886400,
  "status": "completed",
  "config": {
    "type": "custom",
    "dataset_id": "dataset_abc123"
  }
}
```
```

--------------------------------

TITLE: GET /conversations/{conversation_id}/items/{item_id}
DESCRIPTION: Retrieves a specific item from a conversation by its unique identifier. This allows access to item details.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_148

LANGUAGE: APIDOC
CODE:
```
## GET /conversations/{conversation_id}/items/{item_id}

### Description
Retrieves a specific item from a conversation by its ID.

### Method
GET

### Endpoint
/conversations/{conversation_id}/items/{item_id}

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation.
- **item_id** (string) - Required - The ID of the item to retrieve.

#### Query Parameters
(Refer to API client library for 'params' details)

### Request Example
(None)

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the conversation item.
- **conversation_id** (string) - The ID of the conversation this item belongs to.
- **type** (string) - The type of the item (e.g., 'message').
- **content** (object) - The content of the item.

#### Response Example
{
  "id": "item_xyz789",
  "conversation_id": "conv_abc123",
  "type": "message",
  "content": {
    "text": "Hello, how are you?"
  }
}
```

--------------------------------

TITLE: POST /fine_tuning/jobs
DESCRIPTION: Creates a fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_39

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/jobs

### Description
Creates a fine-tuning job.

### Method
POST

### Endpoint
/fine_tuning/jobs

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Fine-tuning job creation parameters.

### Request Example
{}

### Response
#### Success Response (200)
- **job** (FineTuningJob) - The created fine-tuning job object.

#### Response Example
{}
```

--------------------------------

TITLE: GET /chat/completions/{completion_id}/messages
DESCRIPTION: Retrieves a paginated list of messages associated with a specific chat completion. This allows you to inspect the history of a particular conversation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_14

LANGUAGE: APIDOC
CODE:
```
## GET /chat/completions/{completion_id}/messages

### Description
Retrieves a paginated list of messages associated with a specific chat completion. This allows you to inspect the history of a particular conversation.

### Method
GET

### Endpoint
/chat/completions/{completion_id}/messages

### Parameters
#### Path Parameters
- **completion_id** (string) - Required - The ID of the chat completion to retrieve messages for.

#### Query Parameters
- **limit** (integer) - Optional - A limit on the number of objects to be returned. Defaults to 20.
- **order** (string) - Optional - Sort order by `created_at`. Can be `asc` or `desc`. Defaults to `desc`.
- **after** (string) - Optional - A cursor for use in pagination. Fetch results after this cursor.
- **before** (string) - Optional - A cursor for use in pagination. Fetch results before this cursor.

### Request Example
{}

### Response
#### Success Response (200)
- **data** (array<object>) - A list of message objects.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_next** (boolean) - Indicates if there are more objects to retrieve.
- **object** (string) - The object type, always "list".

#### Response Example
{
  "data": [
    {
      "id": "msg_abc123",
      "object": "thread.message",
      "created_at": 1699017600,
      "thread_id": "thread_xyz456",
      "status": "completed",
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "Hello, OpenAI!",
            "annotations": []
          }
        }
      ],
      "assistant_id": null,
      "run_id": null,
      "attachments": [],
      "metadata": {}
    }
  ],
  "first_id": "msg_abc123",
  "last_id": "msg_xyz789",
  "has_next": false,
  "object": "list"
}
```

--------------------------------

TITLE: Stream OpenAI API Responses (TypeScript)
DESCRIPTION: This example illustrates how to stream responses from the OpenAI API using Server Sent Events (SSE). It creates a stream for a given input and iterates over the events, logging each one as it arrives.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_4

LANGUAGE: ts
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI();

const stream = await client.responses.create({
  model: 'gpt-4o',
  input: 'Say "Sheep sleep deep" ten times fast!',
  stream: true,
});

for await (const event of stream) {
  console.log(event);
}
```

--------------------------------

TITLE: Handle OpenAI Node.js Client Request Options for Null Parameters
DESCRIPTION: This change requires explicitly passing `null`, `undefined`, or an empty object `{}` as the parameters argument when making requests that have no required body, query, or header parameters. This ensures custom request options, such as headers, are correctly applied. Previously, request options could be passed directly without a parameter argument.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_4

LANGUAGE: diff
CODE:
```
client.example.list();
client.example.list({}, { headers: { ... } });
client.example.list(null, { headers: { ... } });
client.example.list(undefined, { headers: { ... } });
- client.example.list({ headers: { ... } });
+ client.example.list({}, { headers: { ... } });
```

--------------------------------

TITLE: GET /batches/{batch_id}
DESCRIPTION: Retrieves the details of a specific batch job by its ID. This allows you to check the status and results of a batch operation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_137

LANGUAGE: APIDOC
CODE:
```
## GET /batches/{batch_id}

### Description
Retrieves the details of a specific batch job by its ID. This allows you to check the status and results of a batch operation.

### Method
GET

### Endpoint
/batches/{batch_id}

### Parameters
#### Path Parameters
- **batch_id** (string) - Required - The ID of the batch job to retrieve.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **id** (string) - The ID of the retrieved batch.
- **object** (string) - The object type, usually "batch".
- **endpoint** (string) - The API endpoint for the batch job.
- **completion_window** (string) - The window of time for batch completion.
- **input_file_id** (string) - The ID of the input file used for the batch.
- **output_file_id** (string) - The ID of the output file containing results.
- **error_file_id** (string) - The ID of the file containing errors.
- **status** (string) - The current status of the batch job (e.g., "validating", "in_progress", "completed").
- **created_at** (integer) - The Unix timestamp (in seconds) for when the batch was created.
- **in_progress_at** (integer) - The Unix timestamp (in seconds) for when the batch started processing.
- **expires_at** (integer) - The Unix timestamp (in seconds) for when the batch job expires.
- **cancelled_at** (integer) - The Unix timestamp (in seconds) for when the batch was cancelled.
- **failed_at** (integer) - The Unix timestamp (in seconds) for when the batch failed.
- **completed_at** (integer) - The Unix timestamp (in seconds) for when the batch was completed.
- **request_counts** (object) - Information about the number of requests in the batch.
- **metadata** (object) - Set of 16 key-value pairs that can be attached to an object.

#### Response Example
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h",
  "input_file_id": "file-abc123",
  "output_file_id": "file-def456",
  "error_file_id": null,
  "status": "completed",
  "created_at": 1678901234,
  "in_progress_at": 1678901240,
  "expires_at": 1679765432,
  "cancelled_at": null,
  "failed_at": null,
  "completed_at": 1678901300,
  "request_counts": {
    "total": 100,
    "completed": 98,
    "failed": 2
  },
  "metadata": {}
}
```

--------------------------------

TITLE: GET /threads/{thread_id}/messages
DESCRIPTION: Lists all messages within a specific thread. This endpoint supports pagination and filtering to retrieve a subset of messages.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_134

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/messages

### Description
Lists all messages within a specific thread. This endpoint supports pagination and filtering to retrieve a subset of messages.

### Method
GET

### Endpoint
/threads/{thread_id}/messages

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread for which to list messages.

#### Query Parameters
- **params** (object) - Optional - Pagination and filtering options (e.g., `limit`, `order`, `after`, `before`).

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **object** (string) - The object type, usually "list".
- **data** (array<Message>) - An array of Message objects.
- **first_id** (string) - The ID of the first object in the list.
- **last_id** (string) - The ID of the last object in the list.
- **has_more** (boolean) - True if there are more objects to retrieve.

#### Response Example
{
  "object": "list",
  "data": [
    {
      "id": "msg_abc123",
      "object": "thread.message",
      "created_at": 1678901234,
      "thread_id": "thread_xyz456",
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "Hello",
            "annotations": []
          }
        }
      ],
      "file_ids": [],
      "assistant_id": null,
      "run_id": null,
      "metadata": {}
    },
    {
      "id": "msg_def456",
      "object": "thread.message",
      "created_at": 1678901235,
      "thread_id": "thread_xyz456",
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "Hi there! How can I help you?",
            "annotations": []
          }
        }
      ],
      "file_ids": [],
      "assistant_id": "asst_123",
      "run_id": "run_789",
      "metadata": {}
    }
  ],
  "first_id": "msg_abc123",
  "last_id": "msg_def456",
  "has_more": false
}
```

--------------------------------

TITLE: Format and fix lint issues in OpenAI Node.js library code
DESCRIPTION: Command to automatically format code and fix linting issues in the OpenAI Node.js library using `yarn fix`, leveraging Prettier and ESLint for automated code style enforcement.

SOURCE: https://github.com/openai/openai-node/blob/master/CONTRIBUTING.md#_snippet_7

LANGUAGE: sh
CODE:
```
$ yarn fix
```

--------------------------------

TITLE: Migrate SDK Page Classes to Type Aliases
DESCRIPTION: This change converts page classes for individual methods into type aliases, simplifying their definition. If your application previously imported these classes at runtime, you should now either import the base class directly or ensure that imports are restricted to the type-level.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_15

LANGUAGE: typescript
CODE:
```
// Before
export class FineTuningJobsPage extends CursorPage<FineTuningJob> {}
```

LANGUAGE: typescript
CODE:
```
// After
export type FineTuningJobsPage = CursorPage<FineTuningJob>;
```

--------------------------------

TITLE: GET /threads/{thread_id}/messages/{message_id}
DESCRIPTION: Retrieves the details of a specific message within a thread. This allows you to access message content and metadata.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_132

LANGUAGE: APIDOC
CODE:
```
## GET /threads/{thread_id}/messages/{message_id}

### Description
Retrieves the details of a specific message within a thread. This allows you to access message content and metadata.

### Method
GET

### Endpoint
/threads/{thread_id}/messages/{message_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the message belongs to.
- **message_id** (string) - Required - The ID of the message to retrieve.

#### Query Parameters
- **params** (object) - Optional - Additional options for retrieving the message.

### Request Example
(No request body for GET requests)

### Response
#### Success Response (200)
- **id** (string) - The ID of the retrieved message.
- **object** (string) - The object type, usually "thread.message".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the message was created.
- **thread_id** (string) - The ID of the thread this message belongs to.
- **role** (string) - The role of the entity that created the message (e.g., "user", "assistant").
- **content** (array) - An array of content blocks for the message.
- **file_ids** (array) - An array of file IDs attached to this message.
- **assistant_id** (string) - The ID of the assistant that created the message (if applicable).
- **run_id** (string) - The ID of the run associated with the message (if applicable).
- **metadata** (object) - Set of 16 key-value pairs that can be attached to an object.

#### Response Example
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1678901234,
  "thread_id": "thread_xyz456",
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Hello, what is the weather like today?",
        "annotations": []
      }
    }
  ],
  "file_ids": [],
  "assistant_id": null,
  "run_id": null,
  "metadata": {}
}
```

--------------------------------

TITLE: GET /files/{file_id}/content
DESCRIPTION: Retrieves the raw content of a specific file. The content is returned as a stream or a plain text response, depending on the file type.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_20

LANGUAGE: APIDOC
CODE:
```
## GET /files/{file_id}/content

### Description
Retrieves the raw content of a specific file. The content is returned as a stream or a plain text response, depending on the file type.

### Method
GET

### Endpoint
/files/{file_id}/content

### Parameters
#### Path Parameters
- **file_id** (string) - Required - The ID of the file whose content to retrieve.

### Request Example
{}

### Response
#### Success Response (200)
- **file_content** (string | binary) - The raw content of the file. The format depends on the original file type.

#### Response Example
```text
This is the content of my text file.
It has multiple lines.
```
```

--------------------------------

TITLE: GET /evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}
DESCRIPTION: Retrieves a specific output item generated by an evaluation run. Output items represent individual results or data points from the run.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_177

LANGUAGE: APIDOC
CODE:
```
## GET /evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}

### Description
Retrieves a specific output item generated by an evaluation run. Output items represent individual results or data points from the run.

### Method
GET

### Endpoint
/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.
- **run_id** (string) - Required - The ID of the run.
- **output_item_id** (string) - Required - The ID of the output item to retrieve.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the output item.
- **object** (string) - The type of object, typically 'output_item'.
- **data** (object) - The content or result of the output item.

#### Response Example
```json
{
  "id": "output_item_xyz",
  "object": "output_item",
  "data": {
    "prompt": "What is the capital of France?",
    "completion": "Paris",
    "score": 1.0
  }
}
```
```

--------------------------------

TITLE: Create and Run Thread (TypeScript)
DESCRIPTION: Creates a new thread and immediately initiates a run on it. This method accepts parameters for both thread creation and run configuration, returning a `Run` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_82

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.createAndRun({ ...params })
```

--------------------------------

TITLE: Set Request Timeouts in OpenAI Node.js Client
DESCRIPTION: Explains how to configure the `timeout` option for OpenAI API requests. This example demonstrates setting a default timeout for all client requests and overriding it for individual requests, with an `APIConnectionTimeoutError` thrown on timeout.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_14

LANGUAGE: ts
CODE:
```
// Configure the default for all requests:
const client = new OpenAI({
  timeout: 20 * 1000, // 20 seconds (default is 10 minutes)
});

// Override per-request:
await client.chat.completions.create({ messages: [{ role: 'user', content: 'How can I list all files in a directory using Python?' }], model: 'gpt-4o' }, {
  timeout: 5 * 1000,
});
```

--------------------------------

TITLE: List Runs in a Thread (OpenAI Node.js Client)
DESCRIPTION: Lists all runs associated with a specific thread using the OpenAI Node.js client. This method takes a `threadID` and optional pagination/filtering parameters, performing a GET request. It returns a `RunsPage` object, which is a paginated list of `Run` objects.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_100

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.list(threadID, { ...params })
```

--------------------------------

TITLE: Retrieve a Run Step (OpenAI Node.js Client)
DESCRIPTION: Retrieves the details of a specific step within a run using its ID. This method requires the `stepID` and optionally other parameters, performing a GET request to the API. It returns a `RunStep` object, detailing the action taken during that step.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_109

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.steps.retrieve(stepID, { ...params })
```

--------------------------------

TITLE: Create Fine-tuning Job with OpenAI Node.js Client
DESCRIPTION: This method initiates a new fine-tuning job for a custom model. It requires various parameters, such as the training file and model ID, and returns a `FineTuningJob` object representing the newly created job. This is the first step in training a custom model.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_27

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.create({ ...params })
```

--------------------------------

TITLE: Update `runTools` event and method names in OpenAI ChatCompletionRunner (TypeScript)
DESCRIPTION: This snippet illustrates the renaming of event and method names within the `ChatCompletionRunner`'s `runTools()` functionality to align with the new tool-based API. It shows the 'before' state with `functionCall` events and the 'after' state with `functionToolCall` events.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_18

LANGUAGE: ts
CODE:
```
// Before
openai.chat.completions
  .runTools({
    // ..
  })
  .on('functionCall', (functionCall) => console.log('functionCall', functionCall))
  .on('functionCallResult', (functionCallResult) => console.log('functionCallResult', functionCallResult))
  .on('finalFunctionCall', (functionCall) => console.log('finalFunctionCall', functionCall))
  .on('finalFunctionCallResult', (result) => console.log('finalFunctionCallResult', result));
```

LANGUAGE: ts
CODE:
```
// After
openai.chat.completions
  .runTools({
    // ..
  })
  .on('functionToolCall', (functionCall) => console.log('functionCall', functionCall))
  .on('functionToolCallResult', (functionCallResult) => console.log('functionCallResult', functionCallResult))
  .on('finalFunctionToolCall', (functionCall) => console.log('finalFunctionCall', functionCall))
  .on('finalFunctionToolCallResult', (result) => console.log('finalFunctionCallResult', result));
```

--------------------------------

TITLE: Create a Container using OpenAI Node.js Client
DESCRIPTION: Provisions a new container resource. This method requires parameters to define the container's configuration and returns a ContainerCreateResponse object upon successful creation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_163

LANGUAGE: TypeScript
CODE:
```
client.containers.create({ ...params })
```

--------------------------------

TITLE: Get File Content (TypeScript)
DESCRIPTION: Retrieves the raw content of a specific file stored on the OpenAI platform. This method requires the `fileID` of the desired file. It returns a `Response` object which can be used to access the file's binary or text content.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_6

LANGUAGE: TypeScript
CODE:
```
client.files.content(fileID) -> Response
```

--------------------------------

TITLE: Update OpenAI Node.js Client Module Import Paths
DESCRIPTION: This change refactors the internal and public structure of the OpenAI Node.js client, moving several public-facing files from the top-level directory into a new `core` folder. This improves the file structure's clarity and organization. Users should update their import paths to reflect the new `openai/core/` prefix for modules like `error`, `pagination`, `resource`, `streaming`, and `uploads`.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_7

LANGUAGE: typescript
CODE:
```
// Before
import 'openai/error';
import 'openai/pagination';
import 'openai/resource';
import 'openai/streaming';
import 'openai/uploads';
```

LANGUAGE: typescript
CODE:
```
// After
import 'openai/core/error';
import 'openai/core/pagination';
import 'openai/core/resource';
import 'openai/core/streaming';
import 'openai/core/uploads';
```

--------------------------------

TITLE: List Fine-tuning Jobs with OpenAI Node.js Client
DESCRIPTION: This method retrieves a paginated list of all fine-tuning jobs. It can accept optional parameters for filtering or pagination, returning a `FineTuningJobsPage` object. This allows users to view all their fine-tuning activities.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_29

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.list({ ...params })
```

--------------------------------

TITLE: Update Zod Schema for Optional Properties with .nullable()
DESCRIPTION: This snippet addresses a change in Zod helper optionality. Previously, schemas with optional fields without `.nullable()` would only trigger a warning, but now they will cause an error. To correctly define optional properties for structured outputs, they must be explicitly marked with both `.optional()` and `.nullable()`.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_12

LANGUAGE: typescript
CODE:
```
const completion = await client.chat.completions.parse({
  // ...
  response_format: zodResponseFormat(
    z.object({
      optional_property: z.string().optional(),
    }),
    'schema',
  ),
});
```

LANGUAGE: typescript
CODE:
```
const completion = await client.chat.completions.parse({
  // ...
  response_format: zodResponseFormat(
    z.object({
      optional_property: z.string().optional().nullable(),
    }),
    'schema',
  ),
});
```

--------------------------------

TITLE: Update Named Path Parameters in OpenAI SDK Methods
DESCRIPTION: Adjust method calls for endpoints that take multiple path parameters. Only the last path parameter remains positional; preceding parameters must now be passed as named arguments within an object. This change enhances clarity and prevents argument order errors.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_2

LANGUAGE: typescript
CODE:
```
// Before
client.parents.children.retrieve('p_123', 'c_456');
```

LANGUAGE: typescript
CODE:
```
// After
client.parents.children.retrieve('c_456', { parent_id: 'p_123' });
```

--------------------------------

TITLE: Verify OpenAI Webhook Signature Separately (TypeScript)
DESCRIPTION: This example illustrates how to verify a webhook's signature independently using `client.webhooks.verifySignature()`. This method only checks the signature's validity and throws an error if it's invalid, allowing you to parse the payload separately afterward. The `body` parameter must be the raw JSON string.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_7

LANGUAGE: ts
CODE:
```
import { headers } from 'next/headers';
import OpenAI from 'openai';

const client = new OpenAI({
  webhookSecret: process.env.OPENAI_WEBHOOK_SECRET, // env var used by default; explicit here.
});

export async function webhook(request: Request) {
  const headersList = headers();
  const body = await request.text();

  try {
    client.webhooks.verifySignature(body, headersList);

    // Parse the body after verification
    const event = JSON.parse(body);
    console.log('Verified event:', event);

    return Response.json({ message: 'ok' });
  } catch (error) {
    console.error('Invalid webhook signature:', error);
    return new Response('Invalid signature', { status: 400 });
  }
}
```

--------------------------------

TITLE: Create Realtime Transcription Session (TypeScript)
DESCRIPTION: Initiates a new realtime transcription session via the OpenAI client. It takes configuration parameters as input and returns a `TranscriptionSession` object representing the newly created session.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_72

LANGUAGE: TypeScript
CODE:
```
client.beta.realtime.transcriptionSessions.create({ ...params })
```

--------------------------------

TITLE: Retrieve a Run (OpenAI Node.js Client)
DESCRIPTION: Retrieves the details of a specific run by its ID within a given thread. This method takes a `runID` and optional parameters, performing a GET request to the OpenAI API. It returns a `Run` object containing the run's current status and properties.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_98

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.retrieve(runID, { ...params })
```

--------------------------------

TITLE: Abort OpenAI Chat Completion on Function Call (TypeScript)
DESCRIPTION: This example demonstrates how to prematurely abort an OpenAI chat completion process when a specific function call is triggered. By calling `runner.abort()` within the function tool's implementation, the ongoing chat completion is stopped, allowing for custom control flow based on tool execution.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_15

LANGUAGE: ts
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI();

async function main() {
  const runner = client.chat.completions
    .runTools({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: "How's the weather this week in Los Angeles?" }],
      tools: [
        {
          type: 'function',
          function: {
            function: function updateDatabase(props, runner) {
              runner.abort()
            },
            // …
          }
        },
      ],
    })
    .on('message', (message) => console.log(message));

  const finalFunctionCall = await runner.finalFunctionCall();
  console.log('Final function call:', finalFunctionCall);
}

main();
```

--------------------------------

TITLE: Create and Stream Run (OpenAI Node.js Client)
DESCRIPTION: Creates a new run and streams its updates in real-time. This method provides a more interactive experience for monitoring run progress. It returns an `AssistantStream` object, allowing consumers to process events as they occur.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_104

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.createAndStream(threadId, body, options?) -> AssistantStream
```

--------------------------------

TITLE: Handle OpenAI API Errors (TypeScript)
DESCRIPTION: This snippet demonstrates how to catch and handle errors thrown by the OpenAI Node.js SDK when API calls fail. The SDK throws subclasses of `APIError` for issues like connection failures or non-success HTTP responses (4xx or 5xx). The example shows how to inspect properties like `request_id`, `status`, `name`, and `headers` from the error object.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_8

LANGUAGE: ts
CODE:
```
const job = await client.fineTuning.jobs
  .create({ model: 'gpt-4o', training_file: 'file-abc123' })
  .catch(async (err) => {
    if (err instanceof OpenAI.APIError) {
      console.log(err.request_id);
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant RunStep Events
DESCRIPTION: Shows how to subscribe to lifecycle events related to RunSteps in the OpenAI Assistants API. This includes 'runStepCreated' when a step begins, 'runStepDelta' for incremental updates, and 'runStepDone' when a step completes.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_5

LANGUAGE: ts
CODE:
```
.on('runStepCreated', (runStep: RunStep) => ...)
```

LANGUAGE: ts
CODE:
```
.on('runStepDelta', (delta: RunStepDelta, snapshot: RunStep) => ...)
```

LANGUAGE: ts
CODE:
```
.on('runStepDone', (runStep: RunStep) => ...)
```

--------------------------------

TITLE: Access OpenAI Request ID from Completion Object (TypeScript)
DESCRIPTION: This example illustrates how to retrieve the `_request_id` property directly from an OpenAI SDK response object. This ID is derived from the `x-request-id` response header and is crucial for debugging specific API requests, especially when reporting issues to OpenAI.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_9

LANGUAGE: ts
CODE:
```
const completion = await client.chat.completions.create({
  messages: [{ role: 'user', content: 'Say this is a test' }],
  model: 'gpt-4o',
});
console.log(completion._request_id); // req_123
```

--------------------------------

TITLE: Connect to Realtime API with ws for Text-Based Conversation
DESCRIPTION: This snippet demonstrates how to establish a connection to the OpenAI Realtime API using the `ws` library. It shows how to send session configuration updates, initiate a text-based conversation by sending user input, and handle various events such as connection `open`, `error`, `session.created`, `response.text.delta` for streaming text, `response.text.done` for completion, `response.done` for overall response completion, and connection `close`.

SOURCE: https://github.com/openai/openai-node/blob/master/realtime.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// requires `yarn add ws @types/ws`
import { OpenAIRealtimeWS } from 'openai/realtime/ws';

const rt = new OpenAIRealtimeWS({ model: 'gpt-realtime' });

// access the underlying `ws.WebSocket` instance
rt.socket.on('open', () => {
  console.log('Connection opened!');
  rt.send({
    type: 'session.update',
    session: {
      modalities: ['text'],
      model: 'gpt-4o-realtime-preview',
    },
  });

  rt.send({
    type: 'conversation.item.create',
    item: {
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Say a couple paragraphs!' }],
    },
  });

  rt.send({ type: 'response.create' });
});

rt.on('error', (err) => {
  // in a real world scenario this should be logged somewhere as you
  // likely want to continue processing events regardless of any errors
  throw err;
});

rt.on('session.created', (event) => {
  console.log('session created!', event.session);
  console.log();
});

rt.on('response.text.delta', (event) => process.stdout.write(event.delta));
rt.on('response.text.done', () => console.log());

rt.on('response.done', () => rt.close());

rt.socket.on('close', () => console.log('\nConnection closed!'));
```

--------------------------------

TITLE: Update OpenAI Node.js Client HTTP Method Names
DESCRIPTION: This update renames several `del()` methods to `delete()` across various client modules in the OpenAI Node.js library. This change resolves an internal naming conflict, making the HTTP method names more intuitive and consistent with standard RESTful conventions. Users should update their code to use the new `delete()` method names.

SOURCE: https://github.com/openai/openai-node/blob/master/MIGRATION.md#_snippet_5

LANGUAGE: typescript
CODE:
```
// Before
client.chat.completions.del();
client.files.del();
client.models.del();
client.fineTuning.checkpoints.permissions.del();
client.vectorStores.del();
client.vectorStores.files.del();
client.beta.assistants.del();
client.beta.threads.del();
client.beta.threads.messages.del();
client.responses.del();
client.evals.del();
client.evals.runs.del();
client.containers.del();
client.containers.files.del();
```

LANGUAGE: typescript
CODE:
```
// After
client.chat.completions.delete();
client.files.delete();
client.models.delete();
client.fineTuning.checkpoints.permissions.delete();
client.vectorStores.delete();
client.vectorStores.files.delete();
client.beta.assistants.delete();
client.beta.threads.delete();
client.beta.threads.messages.delete();
client.responses.delete();
client.evals.delete();
client.evals.runs.delete();
client.containers.delete();
client.containers.files.delete();
```

--------------------------------

TITLE: Create Assistant (TypeScript)
DESCRIPTION: Creates a new assistant resource within the OpenAI platform. This function requires an object of parameters defining the assistant's properties and returns the newly created `Assistant` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_73

LANGUAGE: TypeScript
CODE:
```
client.beta.assistants.create({ ...params })
```

--------------------------------

TITLE: Configure Global Fetch Options for OpenAI Node.js Client
DESCRIPTION: Illustrates how to provide custom `fetchOptions` when instantiating the OpenAI client. These options, based on `RequestInit`, apply globally to all requests made by the client unless overridden by request-specific options.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_24

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

--------------------------------

TITLE: POST /realtime/sessions
DESCRIPTION: Creates a new realtime session, allowing for real-time interaction capabilities.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_85

LANGUAGE: APIDOC
CODE:
```
## POST /realtime/sessions

### Description
Creates a new realtime session.

### Method
POST

### Endpoint
/realtime/sessions

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for creating the session.

### Request Example
{
  "//": "Refer to the SDK documentation for specific request body parameters"
}

### Response
#### Success Response (200)
- **SessionCreateResponse** (object) - The created session response object.

#### Response Example
{
  "id": "sess_abc123",
  "object": "session",
  "status": "active"
}
```

--------------------------------

TITLE: Initiating Chat Completions Streaming
DESCRIPTION: This method initiates a chat completion stream, returning a `ChatCompletionStreamingRunner` object. This runner emits events, is asynchronously iterable, and provides helper methods for accumulating chunks and managing the conversation. It offers more control compared to `create({ stream: true })` and allows for stream cancellation.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_13

LANGUAGE: TypeScript
CODE:
```
openai.chat.completions.stream({ stream?: false, … }, options?): ChatCompletionStreamingRunner
```

--------------------------------

TITLE: Create a Run (OpenAI Node.js Client)
DESCRIPTION: Creates a new run for a specified thread using the OpenAI Node.js client. This method requires a `threadID` and optional parameters, sending a POST request to the API. It returns the newly created `Run` object, which represents an execution of an assistant on a thread.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_97

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.create(threadID, { ...params })
```

--------------------------------

TITLE: POST /threads/runs
DESCRIPTION: Creates a new thread and immediately runs it, processing its messages with an assistant.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_96

LANGUAGE: APIDOC
CODE:
```
## POST /threads/runs

### Description
Creates and runs a new thread.

### Method
POST

### Endpoint
/threads/runs

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for creating and running the thread, including assistant ID and initial messages.

### Request Example
{
  "assistant_id": "asst_abc123",
  "thread": {
    "messages": [
      {
        "role": "user",
        "content": "What is the capital of France?"
      }
    ]
  }
}

### Response
#### Success Response (200)
- **Run** (object) - The created run object, representing the execution of the thread.

#### Response Example
{
  "id": "run_xyz789",
  "object": "thread.run",
  "created_at": 1677651200,
  "thread_id": "thread_abc123",
  "assistant_id": "asst_abc123",
  "status": "queued"
}
```

--------------------------------

TITLE: List Assistants (TypeScript)
DESCRIPTION: Fetches a paginated list of assistants. Optional parameters can be provided to filter or control the pagination, and the method returns an `AssistantsPage` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_76

LANGUAGE: TypeScript
CODE:
```
client.beta.assistants.list({ ...params })
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant Image File Events
DESCRIPTION: Shows how to subscribe to the 'imageFileDone' event, which is triggered when an 'ImageFile' content type is fully available from the OpenAI Assistants API. Image files are not sent incrementally, so this event signals their completion.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_8

LANGUAGE: ts
CODE:
```
.on('imageFileDone', (content: ImageFile, snapshot: Message) => ...)
```

--------------------------------

TITLE: List Fine-tuning Job Checkpoints with OpenAI Node.js Client
DESCRIPTION: This method retrieves a paginated list of checkpoints for a specific fine-tuning job. It requires the `fineTuningJobID` and can accept optional parameters, returning a `FineTuningJobCheckpointsPage`. Checkpoints represent saved states of the fine-tuned model during training.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_34

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.checkpoints.list(fineTuningJobID, { ...params })
```

--------------------------------

TITLE: Upload and Poll Files to Vector Store (TypeScript)
DESCRIPTION: This snippet demonstrates how to bulk upload multiple files to a specified vector store and poll for the completion of the upload operation. It uses `createReadStream` to prepare files and `openai.vectorStores.fileBatches.uploadAndPoll` for the actual upload and polling.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_18

LANGUAGE: TypeScript
CODE:
```
const fileList = [
  createReadStream('/home/data/example.pdf'),
  ...
];

const batch = await openai.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {files: fileList});
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant Tool Call Events
DESCRIPTION: Details how to subscribe to events related to 'ToolCall' objects in the OpenAI Assistants API. This includes 'toolCallCreated' when a tool call is initiated, 'toolCallDelta' for incremental updates, and 'toolCallDone' upon tool call completion.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_9

LANGUAGE: ts
CODE:
```
.on('toolCallCreated', (toolCall: ToolCall) => ...)
```

LANGUAGE: ts
CODE:
```
.on('toolCallDelta', (delta: RunStepDelta, snapshot: ToolCall) => ...)
```

LANGUAGE: ts
CODE:
```
.on('toolCallDone', (toolCall: ToolCall) => ...)
```

--------------------------------

TITLE: Subscribe to All OpenAI Assistant Stream Events
DESCRIPTION: Illustrates how to subscribe to the generic 'event' handler, which allows you to receive all possible raw events sent by the OpenAI streaming API. This is useful for comprehensive logging or custom event processing.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_4

LANGUAGE: ts
CODE:
```
.on('event', (event: AssistantStreamEvent) => ...)
```

--------------------------------

TITLE: POST /fine_tuning/alpha/graders/validate
DESCRIPTION: Validates the configuration or readiness of a grader for fine-tuning alpha.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_54

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/alpha/graders/validate

### Description
Validates the configuration or readiness of a grader for fine-tuning alpha.

### Method
POST

### Endpoint
/fine_tuning/alpha/graders/validate

### Parameters
#### Request Body
- **params** (object) - Required - Parameters for validating the grader, such as its configuration.

### Request Example
{
  "grader_config": {
    "type": "TextSimilarityGrader",
    "threshold": 0.8
  }
}

### Response
#### Success Response (200)
- **data** (object) - The validation result.

#### Response Example
{
  "validation_status": "success",
  "message": "Grader configuration is valid."
}
```

--------------------------------

TITLE: List Fine-tuning Job Events with OpenAI Node.js Client
DESCRIPTION: This method retrieves a paginated list of events associated with a specific fine-tuning job. It requires the `fineTuningJobID` and can take optional parameters for filtering, returning a `FineTuningJobEventsPage`. These events provide insights into the job's lifecycle.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_31

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.listEvents(fineTuningJobID, { ...params })
```

--------------------------------

TITLE: Submit Tool Outputs and Stream (OpenAI Node.js Client)
DESCRIPTION: Submits tool outputs for a run and streams the subsequent updates in real-time. This method is ideal for interactive applications needing immediate feedback on run progression. It returns an `AssistantStream` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_108

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.submitToolOutputsStream(threadId, runId, body, options?) -> AssistantStream
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant Message Events
DESCRIPTION: Demonstrates how to subscribe to events tracking the lifecycle of messages within the OpenAI Assistants API. This includes 'messageCreated' for new messages, 'messageDelta' for incremental updates with a snapshot, and 'messageDone' upon message completion.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_6

LANGUAGE: ts
CODE:
```
.on('messageCreated', (message: Message) => ...)
```

LANGUAGE: ts
CODE:
```
.on('messageDelta', (delta: MessageDelta, snapshot: Message) => ...)
```

LANGUAGE: ts
CODE:
```
.on('messageDone', (message: Message) => ...)
```

--------------------------------

TITLE: POST /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions
DESCRIPTION: Creates a new permission for a fine-tuning checkpoint, allowing specified entities to access or modify it.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_50

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

### Description
Creates a new permission for a fine-tuning checkpoint, allowing specified entities to access or modify it.

### Method
POST

### Endpoint
/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions

### Parameters
#### Path Parameters
- **fine_tuned_model_checkpoint** (string) - Required - The ID of the fine-tuned model checkpoint.

#### Request Body
- **params** (object) - Required - Additional parameters for creating the permission.

### Request Example
{
  "permission_type": "read",
  "user_id": "user_abc123"
}

### Response
#### Success Response (200)
- **data** (object) - The created permission object.

#### Response Example
{
  "id": "perm_abc123",
  "fine_tuned_model_checkpoint": "ftc-xyz789",
  "permission_type": "read",
  "user_id": "user_abc123"
}
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}/file_batches
DESCRIPTION: Creates a new batch of files to be processed and added to a vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_67

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}/file_batches

### Description
Creates a new batch of files to be processed and added to a vector store.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}/file_batches

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to which the file batch will be added.

#### Request Body
- **file_ids** (array<string>) - Required - A list of file IDs to add to the batch.
- **chunking_strategy** (object) - Optional - The chunking strategy to use for the files in the batch.

### Request Example
```json
{
  "file_ids": [
    "file_123",
    "file_456"
  ],
  "chunking_strategy": {
    "type": "static",
    "static": {
      "max_chunk_size_tokens": 500,
      "chunk_overlap_tokens": 100
    }
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the file batch.
- **object** (string) - The type of object, typically "vector_store.file_batch".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file batch was created.
- **vector_store_id** (string) - The ID of the vector store that this batch belongs to.
- **status** (string) - The status of the file batch, e.g., "in_progress", "completed", "failed", "cancelled".
- **file_counts** (object) - Counts of files in the batch by their status.

#### Response Example
```json
{
  "id": "vsfb_abc123",
  "object": "vector_store.file_batch",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "in_progress",
  "file_counts": {
    "in_progress": 2,
    "completed": 0,
    "failed": 0,
    "cancelled": 0,
    "total": 2
  }
}
```
```

--------------------------------

TITLE: List all Containers using OpenAI Node.js Client
DESCRIPTION: Retrieves a paginated list of all available containers. This method can accept optional parameters for filtering or pagination and returns a ContainerListResponsesPage.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_165

LANGUAGE: TypeScript
CODE:
```
client.containers.list({ ...params })
```

--------------------------------

TITLE: Resume Fine-tuning Job with OpenAI Node.js Client
DESCRIPTION: This method resumes a previously paused fine-tuning job. It takes the `fineTuningJobID` as an argument and returns the updated `FineTuningJob` object. This allows for continuing fine-tuning processes after a pause.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_33

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.resume(fineTuningJobID)
```

--------------------------------

TITLE: Create Batch with OpenAI Node.js Client
DESCRIPTION: Initiates a new batch processing job with the OpenAI Node.js client. This method requires a set of parameters defining the batch. It returns a 'Batch' object detailing the job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_124

LANGUAGE: typescript
CODE:
```
client.batches.create({ ...params })
```

--------------------------------

TITLE: Create an Eval using OpenAI Node.js Client
DESCRIPTION: Initiates the creation of a new evaluation resource. This method requires a set of parameters to define the evaluation's configuration and returns an EvalCreateResponse object upon successful creation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_151

LANGUAGE: TypeScript
CODE:
```
client.evals.create({ ...params })
```

--------------------------------

TITLE: Create Realtime Session (TypeScript)
DESCRIPTION: Creates a new realtime session using the OpenAI client. This method accepts parameters as an object and returns a `SessionCreateResponse` object upon successful creation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_71

LANGUAGE: TypeScript
CODE:
```
client.beta.realtime.sessions.create({ ...params })
```

--------------------------------

TITLE: POST /containers
DESCRIPTION: Creates a new container. Containers are used to store and manage specific data or resources within the system.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_179

LANGUAGE: APIDOC
CODE:
```
## POST /containers

### Description
Creates a new container. Containers are used to store and manage specific data or resources within the system.

### Method
POST

### Endpoint
/containers

### Parameters
#### Request Body
- **name** (string) - Required - The name of the container.
- **description** (string) - Optional - A description for the container.

### Request Example
```json
{
  "name": "MyNewContainer",
  "description": "Container for experimental data"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the created container.
- **name** (string) - The name of the container.
- **created_at** (integer) - The Unix timestamp (in seconds) when the container was created.

#### Response Example
```json
{
  "id": "container_abc123",
  "name": "MyNewContainer",
  "created_at": 1678886600
}
```
```

--------------------------------

TITLE: Generate Image (TypeScript)
DESCRIPTION: Creates a new image from a text-based prompt using DALL-E. This method accepts parameters for the prompt, desired image size, and the number of images to generate. It returns an `ImagesResponse` containing the generated image(s).

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_10

LANGUAGE: TypeScript
CODE:
```
client.images.generate({ ...params }) -> ImagesResponse
```

--------------------------------

TITLE: POST /threads/{thread_id}/runs/{run_id}/submit_tool_outputs
DESCRIPTION: Submits tool outputs for a run that is awaiting tool calls, allowing the run to continue.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_116

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/runs/{run_id}/submit_tool_outputs

### Description
Submits tool outputs for a run that is awaiting tool calls, allowing the run to continue.

### Method
POST

### Endpoint
/threads/{thread_id}/runs/{run_id}/submit_tool_outputs

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run to submit tool outputs for.

#### Query Parameters
- (Not specified in source)

#### Request Body
- **tool_outputs** (array of object) - Required - A list of tool outputs to submit.
  - **tool_call_id** (string) - Required - The ID of the tool call in the `required_action` array.
  - **output** (string) - Required - The output of the tool call to be submitted.

### Request Example
{
  "tool_outputs": [
    {
      "tool_call_id": "call_abc123",
      "output": "{\"status\":\"success\"}"
    }
  ]
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the run.
- **status** (string) - The updated status of the run (e.g., 'in_progress').
- (Other fields for Run object)

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: List All Models with OpenAI Node.js Client
DESCRIPTION: This method retrieves a list of all available OpenAI models. It takes no arguments and returns a `ModelsPage` object, which typically contains an array of `Model` objects. This is useful for discovering models that can be used with the API.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_25

LANGUAGE: TypeScript
CODE:
```
client.models.list()
```

--------------------------------

TITLE: Submit Tool Outputs for Run (OpenAI Node.js Client)
DESCRIPTION: Submits outputs from tool calls back to a run that is in a `requires_action` state. This method takes a `runID` and the tool outputs, sending a POST request to the API. It returns the `Run` object, which will then proceed with its execution.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_102

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.submitToolOutputs(runID, { ...params })
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant Text Content Events
DESCRIPTION: Explains how to subscribe to events specifically for 'Text' content within messages from the OpenAI Assistants API. This covers 'textCreated' for new text content, 'textDelta' for incremental updates, and 'textDone' when text content is fully generated.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_7

LANGUAGE: ts
CODE:
```
.on('textCreated', (content: Text) => ...)
```

LANGUAGE: ts
CODE:
```
.on('textDelta', (delta: TextDelta, snapshot: Text) => ...)
```

LANGUAGE: ts
CODE:
```
.on('textDone', (content: Text, snapshot: Message) => ...)
```

--------------------------------

TITLE: Stream Run Updates (OpenAI Node.js Client)
DESCRIPTION: Initiates an existing run and streams its updates in real-time. This method allows for live monitoring of run execution and progress. It returns an `AssistantStream` object for processing events.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_106

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.stream(threadId, body, options?) -> AssistantStream
```

--------------------------------

TITLE: Initialize Azure OpenAI Client and Make Chat Completion Request (TypeScript)
DESCRIPTION: This snippet demonstrates how to initialize the `AzureOpenAI` client using Azure AD credentials for authentication. It shows how to obtain a bearer token provider using `@azure/identity` and then use the client to create a chat completion request, logging the response.

SOURCE: https://github.com/openai/openai-node/blob/master/azure.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import { AzureOpenAI } from 'openai';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const openai = new AzureOpenAI({
  azureADTokenProvider,
  apiVersion: '<The API version, e.g. 2024-10-01-preview>',
});

const result = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Say hello!' }],
});

console.log(result.choices[0]!.message?.content);
```

--------------------------------

TITLE: POST /realtime/transcription_sessions
DESCRIPTION: Initiates a new realtime transcription session for processing audio streams.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_86

LANGUAGE: APIDOC
CODE:
```
## POST /realtime/transcription_sessions

### Description
Creates a new realtime transcription session.

### Method
POST

### Endpoint
/realtime/transcription_sessions

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for creating the transcription session.

### Request Example
{
  "//": "Refer to the SDK documentation for specific request body parameters"
}

### Response
#### Success Response (200)
- **TranscriptionSession** (object) - The created transcription session object.

#### Response Example
{
  "id": "tsess_def456",
  "object": "transcription_session",
  "status": "pending"
}
```

--------------------------------

TITLE: Create and Run Thread with Streaming (TypeScript)
DESCRIPTION: Creates and runs a new thread, providing real-time updates via a streaming interface. This method accepts body parameters and optional request options, returning an `AssistantStream` object for event consumption.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_84

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.createAndRunStream(body, options?)
```

--------------------------------

TITLE: POST /evals
DESCRIPTION: Creates a new evaluation. This endpoint allows you to define and initiate an evaluation process with specified configurations.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_167

LANGUAGE: APIDOC
CODE:
```
## POST /evals

### Description
Creates a new evaluation. This endpoint allows you to define and initiate an evaluation process with specified configurations.

### Method
POST

### Endpoint
/evals

### Parameters
#### Request Body
- **config** (object) - Required - Configuration for the evaluation.

### Request Example
```json
{
  "config": {
    "type": "custom",
    "dataset_id": "dataset_abc123"
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the created evaluation.
- **object** (string) - The type of object, typically 'eval'.
- **created_at** (integer) - The Unix timestamp (in seconds) when the evaluation was created.
- **status** (string) - The current status of the evaluation.

#### Response Example
```json
{
  "id": "eval_abc123",
  "object": "eval",
  "created_at": 1678886400,
  "status": "pending"
}
```
```

--------------------------------

TITLE: List All Files (TypeScript)
DESCRIPTION: Retrieves a paginated list of all files uploaded to the OpenAI platform under the current account. This method accepts optional parameters for filtering or pagination. It returns a `FileObjectsPage` containing a collection of `FileObject` instances.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_4

LANGUAGE: TypeScript
CODE:
```
client.files.list({ ...params }) -> FileObjectsPage
```

--------------------------------

TITLE: Create Upload with OpenAI Node.js Client
DESCRIPTION: Initiates a new file upload operation to OpenAI. This method requires parameters defining the upload content. It returns an 'Upload' object with details about the new upload.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_128

LANGUAGE: typescript
CODE:
```
client.uploads.create({ ...params })
```

--------------------------------

TITLE: POST /files
DESCRIPTION: Uploads a file that can be used across various OpenAI APIs. Files can contain data for fine-tuning models, assistants, or other purposes.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_16

LANGUAGE: APIDOC
CODE:
```
## POST /files

### Description
Uploads a file that can be used across various OpenAI APIs. Files can contain data for fine-tuning models, assistants, or other purposes.

### Method
POST

### Endpoint
/files

### Parameters
#### Request Body
- **file** (file) - Required - The file object to be uploaded. This should be a multipart/form-data field.
- **purpose** (string) - Required - The intended purpose of the uploaded file. For example, `fine-tune`, `assistants`, `vision`.

### Request Example
```bash
curl -X POST \
  https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the file.
- **object** (string) - The object type, always "file".
- **bytes** (integer) - The size of the file in bytes.
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file was created.
- **filename** (string) - The name of the file.
- **purpose** (string) - The purpose of the file.
- **status** (string) - The status of the file, e.g., `uploaded`, `processed`.

#### Response Example
{
  "id": "file-XjGxS3KTG0uWsA3mWp6lAPad",
  "object": "file",
  "bytes": 140,
  "created_at": 1613779121,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune",
  "status": "uploaded"
}
```

--------------------------------

TITLE: POST /threads/{thread_id}/runs
DESCRIPTION: Creates a new run for a specified thread, initiating a sequence of actions by the assistant.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_111

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/runs

### Description
Creates a new run for a specified thread, initiating a sequence of actions by the assistant.

### Method
POST

### Endpoint
/threads/{thread_id}/runs

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to create a run for.

#### Query Parameters
- (Not specified in source)

#### Request Body
- (Not specified in source, typically includes assistant_id, model, instructions, tools, etc.)

### Request Example
{
  "example": "Not specified in source"
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the run.
- **status** (string) - The status of the run (e.g., 'queued', 'in_progress', 'completed').
- **thread_id** (string) - The ID of the thread this run belongs to.
- **assistant_id** (string) - The ID of the assistant used for this run.
- (Other fields for Run object)

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: POST /batches
DESCRIPTION: Creates a new batch job. Batch jobs allow you to process multiple requests asynchronously.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_136

LANGUAGE: APIDOC
CODE:
```
## POST /batches

### Description
Creates a new batch job. Batch jobs allow you to process multiple requests asynchronously.

### Method
POST

### Endpoint
/batches

### Parameters
#### Request Body
- **params** (object) - Required - Parameters for creating the batch job, including input file ID and endpoint.

### Request Example
{
  "input_file_id": "file-abc123",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h"
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the created batch.
- **object** (string) - The object type, usually "batch".
- **endpoint** (string) - The API endpoint for the batch job.
- **completion_window** (string) - The window of time for batch completion.
- **input_file_id** (string) - The ID of the input file used for the batch.
- **output_file_id** (string) - The ID of the output file containing results.
- **error_file_id** (string) - The ID of the file containing errors.
- **status** (string) - The current status of the batch job (e.g., "validating", "in_progress", "completed").
- **created_at** (integer) - The Unix timestamp (in seconds) for when the batch was created.
- **in_progress_at** (integer) - The Unix timestamp (in seconds) for when the batch started processing.
- **expires_at** (integer) - The Unix timestamp (in seconds) for when the batch job expires.
- **cancelled_at** (integer) - The Unix timestamp (in seconds) for when the batch was cancelled.
- **failed_at** (integer) - The Unix timestamp (in seconds) for when the batch failed.
- **completed_at** (integer) - The Unix timestamp (in seconds) for when the batch was completed.
- **request_counts** (object) - Information about the number of requests in the batch.
- **metadata** (object) - Set of 16 key-value pairs that can be attached to an object.

#### Response Example
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h",
  "input_file_id": "file-abc123",
  "output_file_id": null,
  "error_file_id": null,
  "status": "validating",
  "created_at": 1678901234,
  "in_progress_at": null,
  "expires_at": 1679765432,
  "cancelled_at": null,
  "failed_at": null,
  "completed_at": null,
  "request_counts": {
    "total": 100,
    "completed": 0,
    "failed": 0
  },
  "metadata": {}
}
```

--------------------------------

TITLE: Create and Run Thread with Polling (TypeScript)
DESCRIPTION: Creates and runs a new thread, then polls the API until the run is complete. It takes a body of parameters and optional request options, returning a `Promise` that resolves to a `Threads.Run` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_83

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.createAndRunPoll(body, options?)
```

--------------------------------

TITLE: List OutputItems for an Eval Run using OpenAI Node.js Client
DESCRIPTION: Retrieves a paginated list of all output items generated by a specific evaluation run. This method takes the run ID and optional parameters, returning an OutputItemListResponsesPage.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_162

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.outputItems.list(runID, { ...params })
```

--------------------------------

TITLE: POST /evals/{eval_id}/runs
DESCRIPTION: Creates a new run for a specific evaluation. This initiates the execution of the evaluation criteria.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_172

LANGUAGE: APIDOC
CODE:
```
## POST /evals/{eval_id}/runs

### Description
Creates a new run for a specific evaluation. This initiates the execution of the evaluation criteria.

### Method
POST

### Endpoint
/evals/{eval_id}/runs

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation for which to create a run.

#### Request Body
- **datasource** (object) - Required - Configuration for the run's data source.
- **model** (string) - Required - The model to use for the run.

### Request Example
```json
{
  "datasource": {
    "type": "completions",
    "dataset_id": "dataset_xyz"
  },
  "model": "gpt-4"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the created run.
- **object** (string) - The type of object, typically 'eval_run'.
- **created_at** (integer) - The Unix timestamp (in seconds) when the run was created.
- **status** (string) - The current status of the run.

#### Response Example
```json
{
  "id": "run_123def",
  "object": "eval_run",
  "created_at": 1678886500,
  "status": "running"
}
```
```

--------------------------------

TITLE: Connect to Realtime API with Web API WebSocket
DESCRIPTION: This snippet illustrates how to adapt the Realtime API connection to use the browser's native `WebSocket` implementation (`OpenAIRealtimeWebSocket`) instead of the `ws` library. It highlights the change in the import statement and the use of `addEventListener` for handling socket events, aligning with standard Web API practices.

SOURCE: https://github.com/openai/openai-node/blob/master/realtime.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { OpenAIRealtimeWebSocket } from 'openai/realtime/websocket';

const rt = new OpenAIRealtimeWebSocket({ model: 'gpt-realtime' });
// ...
rt.socket.addEventListener('open', () => {
  // ...
});
```

--------------------------------

TITLE: Create an Eval Run using OpenAI Node.js Client
DESCRIPTION: Initiates a new run for a specified evaluation. This method requires the evaluation ID and run-specific parameters, returning a RunCreateResponse object upon successful creation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_156

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.create(evalID, { ...params })
```

--------------------------------

TITLE: Create Audio Transcription (TypeScript)
DESCRIPTION: Transcribes an audio file into text using OpenAI's speech-to-text models. This method takes parameters including the audio file and the model to use for transcription. It returns a `TranscriptionCreateResponse` containing the transcribed text.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_11

LANGUAGE: TypeScript
CODE:
```
client.audio.transcriptions.create({ ...params }) -> TranscriptionCreateResponse
```

--------------------------------

TITLE: Integrate OpenAI Chat Completions with Zod for Schema Validation (TypeScript)
DESCRIPTION: This snippet illustrates how to integrate the `zod` library for schema validation with OpenAI chat completions. It uses `zod-to-json-schema` to convert a Zod schema into the JSON Schema format required for tool parameters, ensuring that the assistant's responses conform to a predefined structure.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_16

LANGUAGE: ts
CODE:
```
import OpenAI from 'openai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const client = new OpenAI();

async function main() {
  const runner = client.chat.completions
    .runTools({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: "How's the weather this week in Los Angeles?" }],
      tools: [
        {
          type: 'function',
          function: {
            function: getWeather,
            parse: GetWeatherParameters.parse,
            parameters: zodToJsonSchema(GetWeatherParameters),
          },
        },
      ],
    })
    .on('message', (message) => console.log(message));

  const finalContent = await runner.finalContent();
  console.log('Final content:', finalContent);
}

const GetWeatherParameters = z.object({
  location: z.enum(['Boston', 'New York City', 'Los Angeles', 'San Francisco']),
});

async function getWeather(args: z.infer<typeof GetWeatherParameters>) {
  const { location } = args;
  // … do lookup …
  return { temperature, precipitation };
}

main();
```

--------------------------------

TITLE: POST /vector_stores
DESCRIPTION: Creates a new vector store, a container for embeddings and associated metadata.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_55

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores

### Description
Creates a new vector store, a container for embeddings and associated metadata.

### Method
POST

### Endpoint
/vector_stores

### Parameters
#### Request Body
- **params** (object) - Required - Parameters for creating the vector store, such as its name and chunking strategy.

### Request Example
{
  "name": "My Documents Store",
  "chunking_strategy": {
    "type": "auto"
  }
}

### Response
#### Success Response (200)
- **data** (object) - The newly created vector store object.

#### Response Example
{
  "id": "vs_abc123",
  "name": "My Documents Store",
  "status": "active",
  "created_at": 1678886400,
  "chunking_strategy": {
    "type": "auto"
  }
}
```

--------------------------------

TITLE: Retrieve Fine-tuning Job with OpenAI Node.js Client
DESCRIPTION: This method fetches the details of a specific fine-tuning job using its ID. It takes the `fineTuningJobID` as input and returns a `FineTuningJob` object with its current status and configuration. This is useful for monitoring the progress of a fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_28

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.retrieve(fineTuningJobID)
```

--------------------------------

TITLE: List Batches with OpenAI Node.js Client
DESCRIPTION: Lists all batch processing jobs. This method accepts optional parameters for filtering or pagination. It returns a 'BatchesPage' object containing a list of batches.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_126

LANGUAGE: typescript
CODE:
```
client.batches.list({ ...params })
```

--------------------------------

TITLE: Create and Poll Run (OpenAI Node.js Client)
DESCRIPTION: Creates a new run and continuously polls its status until it completes, using the OpenAI Node.js client. This utility method simplifies run management by abstracting the polling logic. It returns a promise that resolves to the final `Run` object upon completion.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_103

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.createAndPoll(threadId, body, options?) -> Promise<Run>
```

--------------------------------

TITLE: Customize Fetch Client for OpenAI Node.js Library
DESCRIPTION: Explains how to replace the default `fetch` function used by the OpenAI Node.js client. This can be done either by polyfilling the global `fetch` object or by passing a custom `fetch` function directly to the client constructor.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_23

LANGUAGE: TypeScript
CODE:
```
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

LANGUAGE: TypeScript
CODE:
```
import OpenAI from 'openai';
import fetch from 'my-fetch';

const client = new OpenAI({ fetch });
```

--------------------------------

TITLE: Generate Speech from Text (TypeScript)
DESCRIPTION: Converts text into natural-sounding spoken audio using text-to-speech models. This method takes parameters like the text to speak and the desired voice model. It returns a `Response` object which can be used to access the generated audio content.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_13

LANGUAGE: TypeScript
CODE:
```
client.audio.speech.create({ ...params }) -> Response
```

--------------------------------

TITLE: Manage Vector Stores in TypeScript
DESCRIPTION: This set of methods provides comprehensive control over vector stores, enabling creation, retrieval, updates, listing, and deletion. Additionally, a dedicated method is available for performing search operations within a specified vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_49

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.create({ ...params }) -> VectorStore
```

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.retrieve(vectorStoreID) -> VectorStore
```

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.update(vectorStoreID, { ...params }) -> VectorStore
```

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.list({ ...params }) -> VectorStoresPage
```

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.delete(vectorStoreID) -> VectorStoreDeleted
```

LANGUAGE: TypeScript
CODE:
```
client.vectorStores.search(vectorStoreID, { ...params }) -> VectorStoreSearchResponsesPage
```

--------------------------------

TITLE: POST /threads
DESCRIPTION: Creates a new thread, which represents a conversation session with an assistant.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_92

LANGUAGE: APIDOC
CODE:
```
## POST /threads

### Description
Creates a new thread.

### Method
POST

### Endpoint
/threads

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for creating the thread.

### Request Example
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, who are you?"
    }
  ]
}

### Response
#### Success Response (200)
- **Thread** (object) - The created thread object.

#### Response Example
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1677651200,
  "metadata": {}
}
```

--------------------------------

TITLE: Submit Tool Outputs and Poll (OpenAI Node.js Client)
DESCRIPTION: Submits tool outputs for a run that requires action and then polls its status until completion. This method combines two common operations into one convenient call. It returns a promise that resolves to the final `Run` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_107

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.submitToolOutputsAndPoll(threadId, runId, body, options?) -> Promise<Run>
```

--------------------------------

TITLE: Manage Fine-tuning Checkpoint Permissions in TypeScript
DESCRIPTION: These methods allow for programmatic management of permissions on a specific fine-tuned model checkpoint. You can create new permissions, retrieve existing ones, or delete permissions using the checkpoint ID and an optional permission ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_47

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.checkpoints.permissions.create(fineTunedModelCheckpoint, { ...params }) -> PermissionCreateResponsesPage
```

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.checkpoints.permissions.retrieve(fineTunedModelCheckpoint, { ...params }) -> PermissionRetrieveResponse
```

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.checkpoints.permissions.delete(permissionID, { ...params }) -> PermissionDeleteResponse
```

--------------------------------

TITLE: POST /fine_tuning/jobs/{fine_tuning_job_id}/resume
DESCRIPTION: Resumes a paused fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_45

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/jobs/{fine_tuning_job_id}/resume

### Description
Resumes a paused fine-tuning job.

### Method
POST

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}/resume

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job to resume.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **job** (FineTuningJob) - The resumed fine-tuning job object.

#### Response Example
{}
```

--------------------------------

TITLE: List all Evals using OpenAI Node.js Client
DESCRIPTION: Retrieves a paginated list of all available evaluations. This method can accept optional parameters for filtering or pagination and returns an EvalListResponsesPage.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_154

LANGUAGE: TypeScript
CODE:
```
client.evals.list({ ...params })
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}/files
DESCRIPTION: Uploads a new file to a specific vector store. The file will be processed and associated with the vector store for retrieval.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_61

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}/files

### Description
Uploads a new file to a specific vector store. The file will be processed and associated with the vector store for retrieval.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}/files

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to which the file will be uploaded.

#### Request Body
- **file** (object) - Required - The file object or file content to upload.
- **purpose** (string) - Optional - The purpose of the file, e.g., "assistants".

### Request Example
```json
{
  "file": "<base64_encoded_file_content>",
  "purpose": "assistants"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the vector store file.
- **object** (string) - The type of object, typically "vector_store.file".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the vector store file was created.
- **vector_store_id** (string) - The ID of the vector store that this file belongs to.
- **status** (string) - The status of the vector store file, e.g., "completed", "in_progress", "failed".
- **last_error** (object) - Details about the last error if the file processing failed.
- **usage_bytes** (integer) - The number of bytes used by this file in the vector store.

#### Response Example
```json
{
  "id": "file_abc123",
  "object": "vector_store.file",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "completed",
  "last_error": null,
  "usage_bytes": 10240
}
```
```

--------------------------------

TITLE: Parse Chat Completion with Zod Schema for Structured JSON Output (TypeScript)
DESCRIPTION: This snippet demonstrates how to use `client.chat.completions.parse()` with `zodResponseFormat()` to automatically convert a Zod schema into a JSON schema for the OpenAI API. It then parses the model's response, extracting structured data like mathematical steps and a final answer, showcasing type-safe structured outputs.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import { zodResponseFormat } from 'openai/helpers/zod';
import OpenAI from 'openai/index';
import { z } from 'zod';

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathResponse = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const client = new OpenAI();

const completion = await client.chat.completions.parse({
  model: 'gpt-4o-2024-08-06',
  messages: [
    { role: 'system', content: 'You are a helpful math tutor.' },
    { role: 'user', content: 'solve 8x + 31 = 2' },
  ],
  response_format: zodResponseFormat(MathResponse, 'math_response'),
});

console.dir(completion, { depth: 5 });

const message = completion.choices[0]?.message;
if (message?.parsed) {
  console.log(message.parsed.steps);
  console.log(`answer: ${message.parsed.final_answer}`);
}
```

--------------------------------

TITLE: Integrate OpenAI Node.js Library with Azure OpenAI
DESCRIPTION: Demonstrates how to use the `AzureOpenAI` class for integration with Azure OpenAI, including authentication via Azure AD and making chat completion requests. Note that the Azure API shape may slightly differ from the core API.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_17

LANGUAGE: typescript
CODE:
```
import { AzureOpenAI } from 'openai';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const openai = new AzureOpenAI({
  azureADTokenProvider,
  apiVersion: '<The API version, e.g. 2024-10-01-preview>',
});

const result = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Say hello!' }],
});

console.log(result.choices[0]!.message?.content);
```

--------------------------------

TITLE: Integrate Custom Logger with OpenAI Node.js Library
DESCRIPTION: Shows how to provide a custom logger instance (e.g., Pino) to the OpenAI client. The `logLevel` option still controls which messages are emitted to the custom logger.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_20

LANGUAGE: typescript
CODE:
```
import OpenAI from 'openai';
import pino from 'pino';

const logger = pino();

const client = new OpenAI({
  logger: logger.child({ name: 'OpenAI' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

--------------------------------

TITLE: Subscribe to OpenAI Assistant Stream End Event
DESCRIPTION: Illustrates how to subscribe to the 'end' event, which is the final event sent by the OpenAI Assistants API stream, signaling its complete termination.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_10

LANGUAGE: ts
CODE:
```
.on('end', () => ...)
```

--------------------------------

TITLE: Create Audio Translation (TypeScript)
DESCRIPTION: Translates an audio file from one language into English text. This method accepts parameters such as the audio file and the target language (though output is always English). It returns a `TranslationCreateResponse` with the translated text.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_12

LANGUAGE: TypeScript
CODE:
```
client.audio.translations.create({ ...params }) -> TranslationCreateResponse
```

--------------------------------

TITLE: Configure Logging Levels in OpenAI Node.js Library
DESCRIPTION: Illustrates how to set the logging level for the OpenAI client using the `logLevel` option. It lists available log levels from most to least verbose, noting that 'warn' is the default and 'debug' logs HTTP requests/responses.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_19

LANGUAGE: typescript
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI({
  logLevel: 'debug', // Show all log messages
});
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}
DESCRIPTION: Updates the properties of an existing vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_57

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}

### Description
Updates the properties of an existing vector store, such as its name or metadata.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to update.

#### Request Body
- **params** (object) - Required - Parameters for updating the vector store, e.g., new name or metadata.

### Request Example
{
  "name": "Updated Documents Store",
  "metadata": {
    "project": "alpha"
  }
}

### Response
#### Success Response (200)
- **data** (object) - The updated vector store object.

#### Response Example
{
  "id": "vs_abc123",
  "name": "Updated Documents Store",
  "status": "active",
  "created_at": 1678886400,
  "metadata": {
    "project": "alpha"
  }
}
```

--------------------------------

TITLE: Accessing Current State from Assistant Stream Object
DESCRIPTION: These methods on the assistant streaming object provide convenient access to the current event, run, message snapshot, and run step snapshot. They are useful for retrieving additional context within event handlers when the default handler information is insufficient, though context may not always be available.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_11

LANGUAGE: TypeScript
CODE:
```
.currentEvent(): AssistantStreamEvent | undefined

.currentRun(): Run | undefined

.currentMessageSnapshot(): Message

.currentRunStepSnapshot(): Runs.RunStep
```

--------------------------------

TITLE: POST /moderations
DESCRIPTION: Creates a moderation job to check if content violates OpenAI's usage policies.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_35

LANGUAGE: APIDOC
CODE:
```
## POST /moderations

### Description
Creates a moderation job to check if content violates OpenAI's usage policies.

### Method
POST

### Endpoint
/moderations

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Moderation input parameters.

### Request Example
{}

### Response
#### Success Response (200)
- **response** (ModerationCreateResponse) - The moderation result.

#### Response Example
{}
```

--------------------------------

TITLE: Collecting Final Data from Assistant Stream
DESCRIPTION: These asynchronous methods allow for collecting all accumulated messages or run steps at the completion of an assistant stream. Calling them will trigger consumption of the entire stream until completion and then return the relevant aggregated objects.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_12

LANGUAGE: TypeScript
CODE:
```
await .finalMessages() : Promise<Message[]>

await .finalRunSteps(): Promise<RunStep[]>
```

--------------------------------

TITLE: Generate Chat Completions with OpenAI API (TypeScript)
DESCRIPTION: This code snippet shows how to use the Chat Completions API to generate text based on a series of messages. It configures the model and roles, then logs the content of the first message choice.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_3

LANGUAGE: ts
CODE:
```
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const completion = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'developer', content: 'Talk like a pirate.' },
    { role: 'user', content: 'Are semicolons optional in JavaScript?' },
  ],
});

console.log(completion.choices[0].message.content);
```

--------------------------------

TITLE: POST /assistants/{assistant_id}
DESCRIPTION: Updates an existing assistant's properties using its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_89

LANGUAGE: APIDOC
CODE:
```
## POST /assistants/{assistant_id}

### Description
Updates an existing assistant by its ID.

### Method
POST

### Endpoint
/assistants/{assistant_id}

### Parameters
#### Path Parameters
- **assistant_id** (string) - Required - The ID of the assistant to update.

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for updating the assistant.

### Request Example
{
  "name": "Updated Assistant Name",
  "instructions": "You are a helpful and polite AI assistant."
}

### Response
#### Success Response (200)
- **Assistant** (object) - The updated assistant object.

#### Response Example
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1677651200,
  "name": "Updated Assistant Name",
  "model": "gpt-4o"
}
```

--------------------------------

TITLE: Upload Files to OpenAI API (TypeScript)
DESCRIPTION: This snippet demonstrates various methods for uploading files to the OpenAI API, including using Node.js `fs.createReadStream`, Web `File` API, `fetch` Response, and the `toFile` helper for different data types. Files are uploaded for purposes like fine-tuning.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_5

LANGUAGE: ts
CODE:
```
import fs from 'fs';
import OpenAI, { toFile } from 'openai';

const client = new OpenAI();

// If you have access to Node `fs` we recommend using `fs.createReadStream()`:
await client.files.create({ file: fs.createReadStream('input.jsonl'), purpose: 'fine-tune' });

// Or if you have the web `File` API you can pass a `File` instance:
await client.files.create({ file: new File(['my bytes'], 'input.jsonl'), purpose: 'fine-tune' });

// You can also pass a `fetch` `Response`:
await client.files.create({ file: await fetch('https://somesite/input.jsonl'), purpose: 'fine-tune' });

// Finally, if none of the above are convenient, you can use our `toFile` helper:
await client.files.create({
  file: await toFile(Buffer.from('my bytes'), 'input.jsonl'),
  purpose: 'fine-tune',
});
await client.files.create({
  file: await toFile(new Uint8Array([0, 1, 2]), 'input.jsonl'),
  purpose: 'fine-tune',
});
```

--------------------------------

TITLE: Upload File (TypeScript)
DESCRIPTION: Uploads a file to the OpenAI platform for various purposes, such as fine-tuning or assistant tools. This method accepts an object of parameters, including the file content and its intended purpose. It returns a `FileObject` representing the uploaded file.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_2

LANGUAGE: TypeScript
CODE:
```
client.files.create({ ...params }) -> FileObject
```

--------------------------------

TITLE: OpenAI Node.js Client Polling Helper Methods (TypeScript)
DESCRIPTION: This section lists helper functions in the OpenAI Node.js SDK designed to poll the status of asynchronous API operations until they reach a terminal state. These methods, identifiable by the `_AndPoll` suffix, simplify handling long-running tasks like creating runs or uploading files, and allow setting a custom polling frequency via `pollIntervalMs`.

SOURCE: https://github.com/openai/openai-node/blob/master/helpers.md#_snippet_17

LANGUAGE: ts
CODE:
```
client.beta.threads.createAndRunPoll(...)
client.beta.threads.runs.createAndPoll((...)
client.beta.threads.runs.submitToolOutputsAndPoll((...)
client.beta.vectorStores.files.uploadAndPoll((...)
client.beta.vectorStores.files.createAndPoll((...)
client.beta.vectorStores.fileBatches.createAndPoll((...)
client.beta.vectorStores.fileBatches.uploadAndPoll((...)
```

--------------------------------

TITLE: Complete Upload with OpenAI Node.js Client
DESCRIPTION: Completes a previously initiated file upload. This method requires an 'uploadID' and additional parameters for completion. It returns the finalized 'Upload' object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_130

LANGUAGE: typescript
CODE:
```
client.uploads.complete(uploadID, { ...params })
```

--------------------------------

TITLE: Perform Alpha Grader Operations in TypeScript
DESCRIPTION: These methods facilitate interaction with alpha grader functionalities. The `run` method executes a grader, while `validate` checks the validity of grader configurations or results. Both methods require parameters specific to the grader operation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_48

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.alpha.graders.run({ ...params }) -> GraderRunResponse
```

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.alpha.graders.validate({ ...params }) -> GraderValidateResponse
```

--------------------------------

TITLE: POST /fine_tuning/jobs/{fine_tuning_job_id}/pause
DESCRIPTION: Pauses a fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_44

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/jobs/{fine_tuning_job_id}/pause

### Description
Pauses a fine-tuning job.

### Method
POST

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}/pause

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job to pause.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **job** (FineTuningJob) - The paused fine-tuning job object.

#### Response Example
{}
```

--------------------------------

TITLE: Create Image Variation (TypeScript)
DESCRIPTION: Generates a new image that is a variation of an existing image. This method accepts parameters including the original image and desired characteristics for the variations. It returns an `ImagesResponse` containing the newly generated image variations.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_8

LANGUAGE: TypeScript
CODE:
```
client.images.createVariation({ ...params }) -> ImagesResponse
```

--------------------------------

TITLE: POST /realtime/client_secrets
DESCRIPTION: Creates a new client secret for real-time sessions. This secret is used to authenticate real-time connections.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_142

LANGUAGE: APIDOC
CODE:
```
## POST /realtime/client_secrets

### Description
Creates a new client secret for real-time sessions.

### Method
POST

### Endpoint
/realtime/client_secrets

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(Refer to API client library for 'params' details)

### Request Example
{
  "//": "Example request body for creating a client secret"
}

### Response
#### Success Response (200)
- **client_secret** (string) - The newly created client secret.

#### Response Example
{
  "client_secret": "sk_example_secret"
}
```

--------------------------------

TITLE: Handle Realtime API Errors
DESCRIPTION: This snippet demonstrates the critical importance of registering an `error` event listener for the Realtime API connection. It shows how to catch and handle errors, preventing unhandled promise rejections and ensuring that the underlying WebSocket connection remains usable even when errors occur, which is crucial for robust real-time applications.

SOURCE: https://github.com/openai/openai-node/blob/master/realtime.md#_snippet_2

LANGUAGE: TypeScript
CODE:
```
const rt = new OpenAIRealtimeWS({ model: 'gpt-realtime' });
rt.on('error', (err) => {
  // in a real world scenario this should be logged somewhere as you
  // likely want to continue processing events regardless of any errors
  throw err;
});
```

--------------------------------

TITLE: List all Runs for an Eval using OpenAI Node.js Client
DESCRIPTION: Retrieves a paginated list of all runs associated with a given evaluation ID. This method can take filtering or pagination parameters and returns a RunListResponsesPage.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_158

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.list(evalID, { ...params })
```

--------------------------------

TITLE: POST /images/variations
DESCRIPTION: Creates a variation of a given image. This endpoint is useful for generating multiple versions of an image based on an initial input.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_21

LANGUAGE: APIDOC
CODE:
```
## POST /images/variations

### Description
Creates a variation of a given image. This endpoint is useful for generating multiple versions of an image based on an initial input.

### Method
POST

### Endpoint
/images/variations

### Parameters
#### Request Body
- **image** (file) - Required - The image to use as the basis for the variation. Must be a PNG file.
- **model** (string) - Optional - The model to use for image generation. Defaults to `dall-e-2`.
- **n** (integer) - Optional - The number of images to generate. Must be between 1 and 10. Defaults to 1.
- **response_format** (string) - Optional - The format in which the generated images are returned. Can be `url` or `b64_json`. Defaults to `url`.
- **size** (string) - Optional - The size of the generated images. Can be `256x256`, `512x512`, or `1024x1024`. Defaults to `1024x1024`.
- **user** (string) - Optional - A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.

### Request Example
```bash
curl -X POST \
  https://api.openai.com/v1/images/variations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image="@image.png" \
  -F n=2 \
  -F size="1024x1024"
```

### Response
#### Success Response (200)
- **created** (integer) - The Unix timestamp (in seconds) when the images were created.
- **data** (array<object>) - A list of image objects, each containing a `url` or `b64_json` of the generated image.

#### Response Example
{
  "created": 1586583424,
  "data": [
    {
      "url": "https://oaidalleapialpha.blob.core.windows.net/...
    },
    {
      "url": "https://oaidalleapialpha.blob.core.windows.net/...
    }
  ]
}
```

--------------------------------

TITLE: Pause Fine-tuning Job with OpenAI Node.js Client
DESCRIPTION: This method pauses a fine-tuning job, temporarily halting its execution. It takes the `fineTuningJobID` as an argument and returns the updated `FineTuningJob` object. This allows for temporary suspension of long-running fine-tuning processes.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_32

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.pause(fineTuningJobID)
```

--------------------------------

TITLE: Create Thread (TypeScript)
DESCRIPTION: Creates a new conversation thread. This method accepts optional parameters to initialize the thread and returns a `Thread` object representing the newly created thread.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_78

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.create({ ...params })
```

--------------------------------

TITLE: List Chat Completion Messages (TypeScript)
DESCRIPTION: Retrieves a paginated list of messages for a specific chat completion. This method requires a `completionID` and accepts optional parameters for filtering or pagination. It returns a `ChatCompletionStoreMessagesPage` object containing the messages.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_0

LANGUAGE: TypeScript
CODE:
```
client.chat.completions.messages.list(completionID, { ...params }) -> ChatCompletionStoreMessagesPage
```

--------------------------------

TITLE: Create Moderation with OpenAI Node.js Client
DESCRIPTION: This method sends a request to the OpenAI API to create a moderation, analyzing text for harmful content. It accepts parameters like input text and model, returning a `ModerationCreateResponse` object upon successful execution. This is a common operation for content safety checks.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_23

LANGUAGE: TypeScript
CODE:
```
client.moderations.create({ ...params })
```

--------------------------------

TITLE: POST /images/edits
DESCRIPTION: Edits an image by applying a mask and a text prompt. This allows for precise modifications or content generation within specific areas of an image.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_22

LANGUAGE: APIDOC
CODE:
```
## POST /images/edits

### Description
Edits
```

--------------------------------

TITLE: Retrieve File Details (TypeScript)
DESCRIPTION: Fetches detailed metadata for a specific file stored on the OpenAI platform. This method requires the unique `fileID` as an argument. It returns a `FileObject` containing comprehensive information about the file.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
client.files.retrieve(fileID) -> FileObject
```

--------------------------------

TITLE: Retrieve a specific Container using OpenAI Node.js Client
DESCRIPTION: Fetches the details of an existing container identified by its unique ID. This method is used to inspect the current state and properties of a container and returns a ContainerRetrieveResponse object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_164

LANGUAGE: TypeScript
CODE:
```
client.containers.retrieve(containerID)
```

--------------------------------

TITLE: Parse and Verify OpenAI Webhook Payloads (TypeScript)
DESCRIPTION: This snippet demonstrates how to use the `client.webhooks.unwrap()` method to simultaneously parse and verify webhook payloads received from OpenAI. It ensures the payload's authenticity by checking the signature and throws an error if the signature is invalid. The `body` parameter must be the raw JSON string from the server.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_6

LANGUAGE: ts
CODE:
```
import { headers } from 'next/headers';
import OpenAI from 'openai';

const client = new OpenAI({
  webhookSecret: process.env.OPENAI_WEBHOOK_SECRET, // env var used by default; explicit here.
});

export async function webhook(request: Request) {
  const headersList = headers();
  const body = await request.text();

  try {
    const event = client.webhooks.unwrap(body, headersList);

    switch (event.type) {
      case 'response.completed':
        console.log('Response completed:', event.data);
        break;
      case 'response.failed':
        console.log('Response failed:', event.data);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    return Response.json({ message: 'ok' });
  } catch (error) {
    console.error('Invalid webhook signature:', error);
    return new Response('Invalid signature', { status: 400 });
  }
}
```

--------------------------------

TITLE: Edit Image (TypeScript)
DESCRIPTION: Edits an existing image based on provided text instructions and an optional mask. This method takes parameters such as the image, an optional mask, and a prompt describing the desired edits. It returns an `ImagesResponse` with the edited images.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_9

LANGUAGE: TypeScript
CODE:
```
client.images.edit({ ...params }) -> ImagesResponse
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel
DESCRIPTION: Cancels a specific file batch that is currently in progress for a given vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_69

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel

### Description
Cancels a specific file batch that is currently in progress for a given vector store.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **batch_id** (string) - Required - The ID of the file batch to cancel.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the file batch.
- **object** (string) - The type of object, typically "vector_store.file_batch".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file batch was created.
- **vector_store_id** (string) - The ID of the vector store that this batch belongs to.
- **status** (string) - The status of the file batch, e.g., "cancelled".
- **file_counts** (object) - Counts of files in the batch by their status.

#### Response Example
```json
{
  "id": "vsfb_abc123",
  "object": "vector_store.file_batch",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "cancelled",
  "file_counts": {
    "in_progress": 0,
    "completed": 0,
    "failed": 0,
    "cancelled": 2,
    "total": 2
  }
}
```
```

--------------------------------

TITLE: Make Custom HTTP Requests to Undocumented Endpoints with OpenAI Node.js Library
DESCRIPTION: Explains how to use generic HTTP verb methods like `client.post` to interact with undocumented API endpoints. Client-level options such as retries are automatically applied to these custom requests.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_21

LANGUAGE: typescript
CODE:
```
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}/search
DESCRIPTION: Performs a search operation within a specified vector store.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_60

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}/search

### Description
Performs a search operation within a specified vector store, typically using a query embedding.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}/search

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to search within.

#### Request Body
- **params** (object) - Required - Parameters for the search query, including the query embedding and search options.

### Request Example
{
  "query": "embedding_vector_data",
  "top_k": 10
}

### Response
#### Success Response (200)
- **data** (array) - An array of search results, usually containing matched vectors and their metadata.

#### Response Example
{
  "data": [
    {
      "vector_id": "vec_1",
      "score": 0.98,
      "metadata": {
        "title": "Document A"
      }
    },
    {
      "vector_id": "vec_2",
      "score": 0.95,
      "metadata": {
        "title": "Document B"
      }
    }
  ],
  "has_next_page": false
}
```

--------------------------------

TITLE: List Messages with OpenAI Node.js Client
DESCRIPTION: Lists messages associated with a specific thread. This method requires a 'threadID' and can be filtered or paginated using optional parameters. It returns a 'MessagesPage' object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_122

LANGUAGE: typescript
CODE:
```
client.beta.threads.messages.list(threadID, { ...params })
```

--------------------------------

TITLE: Retrieve Specific Model with OpenAI Node.js Client
DESCRIPTION: This method retrieves details about a specific OpenAI model given its ID. It takes the `model` identifier as an argument and returns a `Model` object containing information about that model. This is useful for inspecting available model configurations.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_24

LANGUAGE: TypeScript
CODE:
```
client.models.retrieve(model)
```

--------------------------------

TITLE: Retrieve Assistant (TypeScript)
DESCRIPTION: Retrieves the details of a specific assistant. This method takes the unique `assistantID` as input and returns an `Assistant` object if found.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_74

LANGUAGE: TypeScript
CODE:
```
client.beta.assistants.retrieve(assistantID)
```

--------------------------------

TITLE: Create Embeddings (TypeScript)
DESCRIPTION: Generates vector embeddings from input text or data using a specified model. This method takes an object of parameters, typically including the input text and the model to use. It returns a `CreateEmbeddingResponse` object containing the generated embeddings.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
client.embeddings.create({ ...params }) -> CreateEmbeddingResponse
```

--------------------------------

TITLE: Create Message with OpenAI Node.js Client
DESCRIPTION: Creates a new message within a specified thread using the OpenAI Node.js client. This method requires a 'threadID' and an object of message parameters. It returns a 'Message' object upon successful creation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_119

LANGUAGE: typescript
CODE:
```
client.beta.threads.messages.create(threadID, { ...params })
```

--------------------------------

TITLE: POST /uploads/{upload_id}/parts
DESCRIPTION: This endpoint allows you to create a new part for a specific upload operation identified by its unique ID. Each part typically represents a chunk of the larger file being uploaded.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_141

LANGUAGE: APIDOC
CODE:
```
## POST /uploads/{upload_id}/parts

### Description
Creates a new part for an existing upload. This is typically used in multi-part upload scenarios where a large file is split into smaller chunks.

### Method
POST

### Endpoint
/uploads/{upload_id}/parts

### Parameters
#### Path Parameters
- **upload_id** (string) - Required - The unique identifier of the parent upload operation.

#### Request Body
- **part_number** (integer) - Required - The sequential number of this part within the overall upload. Must be unique for the given upload.
- **content** (string) - Required - The content of the upload part, typically base64-encoded or a direct binary stream representation.
- **checksum** (string) - Optional - A checksum (e.g., MD5, SHA256) of the part's content for integrity verification.

### Request Example
```json
{
  "part_number": 1,
  "content": "SGVsbG8sIHRoaXMgaXMgcGFydCAxIG9mIHRoZSB1cGxvYWQu",
  "checksum": "a1b2c3d4e5f67890abcdef1234567890"
}
```

### Response
#### Success Response (200 OK)
- **id** (string) - The unique identifier for the newly created upload part.
- **upload_id** (string) - The ID of the parent upload this part belongs to.
- **part_number** (integer) - The sequential number of this part.
- **status** (string) - The current status of the part (e.g., "uploaded", "processing", "pending").
- **size** (integer) - The size of the part's content in bytes.

#### Response Example
```json
{
  "id": "part_abc123def456",
  "upload_id": "upload_xyz789uvw012",
  "part_number": 1,
  "status": "uploaded",
  "size": 32
}
```
```

--------------------------------

TITLE: Retrieve Batch with OpenAI Node.js Client
DESCRIPTION: Retrieves the details of a specific batch processing job. This method requires a 'batchID' and returns a 'Batch' object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_125

LANGUAGE: typescript
CODE:
```
client.batches.retrieve(batchID)
```

--------------------------------

TITLE: Update a Run (OpenAI Node.js Client)
DESCRIPTION: Updates an existing run's properties for a specific thread. This method requires a `runID` and parameters for the update, sending a POST request to the API. It returns the updated `Run` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_99

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.update(runID, { ...params })
```

--------------------------------

TITLE: POST /embeddings
DESCRIPTION: Creates an embedding vector representing the input text. Embeddings are numerical representations of text that can be used for tasks like search, clustering, and recommendations.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_15

LANGUAGE: APIDOC
CODE:
```
## POST /embeddings

### Description
Creates an embedding vector representing the input text. Embeddings are numerical representations of text that can be used for tasks like search, clustering, and recommendations.

### Method
POST

### Endpoint
/embeddings

### Parameters
#### Request Body
- **input** (string | array<string>) - Required - The text input to generate embeddings for. Can be a single string or an array of strings.
- **model** (string) - Required - The ID of the model to use for embedding generation.
- **encoding_format** (string) - Optional - The format to return the embeddings in. Can be `float` or `base64`. Defaults to `float`.
- **user** (string) - Optional - A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.

### Request Example
{
  "input": "The quick brown fox jumps over the lazy dog",
  "model": "text-embedding-ada-002"
}

### Response
#### Success Response (200)
- **data** (array<object>) - A list of embedding objects.
- **model** (string) - The model used to generate the embedding.
- **object** (string) - The object type, always "list".
- **usage** (object) - Information about the token usage for the request.
  - **prompt_tokens** (integer) - The number of tokens in the prompt.
  - **total_tokens** (integer) - The total number of tokens processed.

#### Response Example
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        ...
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

--------------------------------

TITLE: POST /threads/{thread_id}/runs/{run_id}
DESCRIPTION: Updates an existing run. This might be used to modify run properties or metadata.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_113

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/runs/{run_id}

### Description
Updates an existing run. This might be used to modify run properties or metadata.

### Method
POST

### Endpoint
/threads/{thread_id}/runs/{run_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run to update.

#### Query Parameters
- (Not specified in source)

#### Request Body
- (Not specified in source, typically metadata or other modifiable fields)

### Request Example
{
  "example": "Not specified in source"
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the updated run.
- **status** (string) - The current status of the run.
- (Other fields for Run object)

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: POST /containers/{container_id}/files
DESCRIPTION: Uploads a new file to a specified container. This operation typically involves sending file data in the request body.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_181

LANGUAGE: APIDOC
CODE:
```
## POST /containers/{container_id}/files

### Description
Uploads a new file to a specified container.

### Method
POST

### Endpoint
/containers/{container_id}/files

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container where the file will be uploaded.

#### Request Body
- **file_data** (binary/multipart) - Required - The content of the file to be uploaded. Specific fields are not detailed in this documentation.

### Request Example
```json
{
  "message": "Please provide file data in multipart/form-data format."
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the created file.
- **filename** (string) - The name of the created file.
- **size** (integer) - The size of the created file in bytes.
- **created_at** (integer) - The Unix timestamp (in seconds) for when the file was created.

#### Response Example
```json
{
  "id": "file-abc123def456",
  "filename": "example.txt",
  "size": 1234,
  "created_at": 1678886400,
  "object": "file"
}
```
```

--------------------------------

TITLE: Retrieve an OutputItem from an Eval Run using OpenAI Node.js Client
DESCRIPTION: Fetches the details of a specific output item generated by an evaluation run, identified by its unique ID. This method provides the individual result of a run's output and returns an OutputItemRetrieveResponse.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_161

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.outputItems.retrieve(outputItemID, { ...params })
```

--------------------------------

TITLE: POST /threads/{thread_id}/messages
DESCRIPTION: Creates a new message in a specified thread. This endpoint allows you to add content to an ongoing conversation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_131

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/messages

### Description
Creates a new message in a specified thread. This endpoint allows you to add content to an ongoing conversation.

### Method
POST

### Endpoint
/threads/{thread_id}/messages

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to which the message will be added.

#### Request Body
- **params** (object) - Required - Parameters for creating the message, including content and role.

### Request Example
{
  "role": "user",
  "content": "Hello, what is the weather like today?"
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the created message.
- **object** (string) - The object type, usually "thread.message".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the message was created.
- **thread_id** (string) - The ID of the thread this message belongs to.
- **role** (string) - The role of the entity that created the message (e.g., "user", "assistant").
- **content** (array) - An array of content blocks for the message.
- **file_ids** (array) - An array of file IDs attached to this message.
- **assistant_id** (string) - The ID of the assistant that created the message (if applicable).
- **run_id** (string) - The ID of the run associated with the message (if applicable).
- **metadata** (object) - Set of 16 key-value pairs that can be attached to an object.

#### Response Example
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1678901234,
  "thread_id": "thread_xyz456",
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Hello, what is the weather like today?",
        "annotations": []
      }
    }
  ],
  "file_ids": [],
  "assistant_id": null,
  "run_id": null,
  "metadata": {}
}
```

--------------------------------

TITLE: POST /threads/{thread_id}/runs/{run_id}/cancel
DESCRIPTION: Cancels a currently processing run, stopping the assistant's execution.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_115

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/runs/{run_id}/cancel

### Description
Cancels a currently processing run, stopping the assistant's execution.

### Method
POST

### Endpoint
/threads/{thread_id}/runs/{run_id}/cancel

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the run belongs to.
- **run_id** (string) - Required - The ID of the run to cancel.

#### Query Parameters
- (Not specified in source)

#### Request Body
- (Not applicable)

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The ID of the cancelled run.
- **status** (string) - The status of the run, typically 'cancelled'.
- (Other fields for Run object)

#### Response Example
{
  "example": "Not specified in source"
}

```

--------------------------------

TITLE: POST /conversations/{conversation_id}/items
DESCRIPTION: Creates a new item within a specific conversation. Items can represent messages, events, or other data points.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_147

LANGUAGE: APIDOC
CODE:
```
## POST /conversations/{conversation_id}/items

### Description
Creates a new item within a specific conversation.

### Method
POST

### Endpoint
/conversations/{conversation_id}/items

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation to add the item to.

#### Query Parameters
(None)

#### Request Body
(Refer to API client library for 'params' details)

### Request Example
{
  "type": "message",
  "content": {
    "text": "Hello, how are you?"
  }
}

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the new conversation item.
- **conversation_id** (string) - The ID of the conversation this item belongs to.
- **created_at** (string) - Timestamp when the item was created.

#### Response Example
{
  "id": "item_xyz789",
  "conversation_id": "conv_abc123",
  "created_at": "2023-10-27T10:45:00Z"
}
```

--------------------------------

TITLE: Update Assistant (TypeScript)
DESCRIPTION: Modifies an existing assistant identified by its ID. It requires the `assistantID` and an object containing the updated parameters, returning the modified `Assistant` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_75

LANGUAGE: TypeScript
CODE:
```
client.beta.assistants.update(assistantID, { ...params })
```

--------------------------------

TITLE: DELETE /vector_stores/{vector_store_id}/files/{file_id}
DESCRIPTION: Deletes a specific file from a vector store. This action is irreversible.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_65

LANGUAGE: APIDOC
CODE:
```
## DELETE /vector_stores/{vector_store_id}/files/{file_id}

### Description
Deletes a specific file from a vector store. This action is irreversible.

### Method
DELETE

### Endpoint
/vector_stores/{vector_store_id}/files/{file_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **file_id** (string) - Required - The ID of the file to delete.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted file.
- **object** (string) - The type of object, typically "vector_store.file.deleted".
- **deleted** (boolean) - True if the deletion was successful.

#### Response Example
```json
{
  "id": "file_abc123",
  "object": "vector_store.file.deleted",
  "deleted": true
}
```
```

--------------------------------

TITLE: DELETE /containers/{container_id}/files/{file_id}
DESCRIPTION: Deletes a specific file from a container. A successful deletion typically returns a 204 No Content status.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_184

LANGUAGE: APIDOC
CODE:
```
## DELETE /containers/{container_id}/files/{file_id}

### Description
Deletes a specific file from a container.

### Method
DELETE

### Endpoint
/containers/{container_id}/files/{file_id}

### Parameters
#### Path Parameters
- **container_id** (string) - Required - The ID of the container.
- **file_id** (string) - Required - The ID of the file to delete.

### Request Example
```json
{}
```

### Response
#### Success Response (204 No Content)
- No body is returned for a successful deletion.

#### Response Example
(No content)

```

--------------------------------

TITLE: Handle Undocumented Request Parameters in OpenAI Node.js Client
DESCRIPTION: Demonstrates how to send requests with undocumented parameters using the OpenAI Node.js client. It explains the use of `// @ts-expect-error` for TypeScript type checking and notes that extra values are sent as-is without runtime validation.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_22

LANGUAGE: TypeScript
CODE:
```
client.chat.completions.create({
  // ...
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

--------------------------------

TITLE: DELETE /models/{model}
DESCRIPTION: Deletes a fine-tuned model.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_38

LANGUAGE: APIDOC
CODE:
```
## DELETE /models/{model}

### Description
Deletes a fine-tuned model.

### Method
DELETE

### Endpoint
/models/{model}

### Parameters
#### Path Parameters
- **model** (string) - Required - The ID of the model to delete.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **deleted_model** (ModelDeleted) - Confirmation of the deleted model.

#### Response Example
{}
```

--------------------------------

TITLE: Retrieve an Eval Run using OpenAI Node.js Client
DESCRIPTION: Fetches the details of a specific run associated with an evaluation, identified by its run ID. This method returns a RunRetrieveResponse object providing insights into the run's status and results.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_157

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.retrieve(runID, { ...params })
```

--------------------------------

TITLE: POST /fine_tuning/jobs/{fine_tuning_job_id}/cancel
DESCRIPTION: Cancels a fine-tuning job.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_42

LANGUAGE: APIDOC
CODE:
```
## POST /fine_tuning/jobs/{fine_tuning_job_id}/cancel

### Description
Cancels a fine-tuning job.

### Method
POST

### Endpoint
/fine_tuning/jobs/{fine_tuning_job_id}/cancel

### Parameters
#### Path Parameters
- **fine_tuning_job_id** (string) - Required - The ID of the fine-tuning job to cancel.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **job** (FineTuningJob) - The canceled fine-tuning job object.

#### Response Example
{}
```

--------------------------------

TITLE: POST /conversations
DESCRIPTION: Creates a new conversation. A conversation is a central object for organizing messages and other related items.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_143

LANGUAGE: APIDOC
CODE:
```
## POST /conversations

### Description
Creates a new conversation.

### Method
POST

### Endpoint
/conversations

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(Refer to API client library for 'params' details)

### Request Example
{
  "//": "Example request body for creating a conversation"
}

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the conversation.
- **created_at** (string) - Timestamp when the conversation was created.
- **updated_at** (string) - Timestamp when the conversation was last updated.

#### Response Example
{
  "id": "conv_abc123",
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:00:00Z"
}
```

--------------------------------

TITLE: Wait for File Processing (TypeScript)
DESCRIPTION: Polls the status of an uploaded file until it has completed processing. This asynchronous method takes the file `id` and optional parameters to configure the polling interval and maximum wait time. It returns a `Promise` that resolves to a `FileObject` once processing is complete.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_7

LANGUAGE: TypeScript
CODE:
```
client.files.waitForProcessing(id, { pollInterval = 5000, maxWait = 30 * 60 * 1000 }) -> Promise<FileObject>
```

--------------------------------

TITLE: Delete a Container using OpenAI Node.js Client
DESCRIPTION: Removes a container resource identified by its unique ID. This action is irreversible and returns void upon successful deletion.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_166

LANGUAGE: TypeScript
CODE:
```
client.containers.delete(containerID)
```

--------------------------------

TITLE: POST /vector_stores/{vector_store_id}/files/{file_id}
DESCRIPTION: Updates the metadata of a specific file within a vector store. Note that the file content itself cannot be updated via this endpoint.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_63

LANGUAGE: APIDOC
CODE:
```
## POST /vector_stores/{vector_store_id}/files/{file_id}

### Description
Updates the metadata of a specific file within a vector store. Note that the file content itself cannot be updated via this endpoint.

### Method
POST

### Endpoint
/vector_stores/{vector_store_id}/files/{file_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store.
- **file_id** (string) - Required - The ID of the file to update.

#### Request Body
- **metadata** (object) - Optional - Set of key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys can be a maximum of 64 characters long and values can be a maximum of 512 characters long.

### Request Example
```json
{
  "metadata": {
    "source": "internal",
    "version": "2.0"
  }
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the vector store file.
- **object** (string) - The type of object, typically "vector_store.file".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the vector store file was created.
- **vector_store_id** (string) - The ID of the vector store that this file belongs to.
- **status** (string) - The status of the vector store file, e.g., "completed", "in_progress", "failed".
- **last_error** (object) - Details about the last error if the file processing failed.
- **usage_bytes** (integer) - The number of bytes used by this file in the vector store.

#### Response Example
```json
{
  "id": "file_abc123",
  "object": "vector_store.file",
  "created_at": 1678886400,
  "vector_store_id": "vs_xyz789",
  "status": "completed",
  "last_error": null,
  "usage_bytes": 10240,
  "metadata": {
    "source": "internal",
    "version": "2.0"
  }
}
```
```

--------------------------------

TITLE: DELETE /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}
DESCRIPTION: Deletes a specific permission from a fine-tuning checkpoint.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_52

LANGUAGE: APIDOC
CODE:
```
## DELETE /fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}

### Description
Deletes a specific permission from a fine-tuning checkpoint, revoking access for the associated entity.

### Method
DELETE

### Endpoint
/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}

### Parameters
#### Path Parameters
- **fine_tuned_model_checkpoint** (string) - Required - The ID of the fine-tuned model checkpoint.
- **permission_id** (string) - Required - The ID of the permission to delete.

### Request Example
(No request body for DELETE requests)

### Response
#### Success Response (200)
- **data** (object) - Confirmation of the deleted permission.

#### Response Example
{
  "id": "perm_abc123",
  "deleted": true
}
```

--------------------------------

TITLE: DELETE /files/{file_id}
DESCRIPTION: Deletes a specific file from your OpenAI account. This action is irreversible.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_19

LANGUAGE: APIDOC
CODE:
```
## DELETE /files/{file_id}

### Description
Deletes a specific file from your OpenAI account. This action is irreversible.

### Method
DELETE

### Endpoint
/files/{file_id}

### Parameters
#### Path Parameters
- **file_id** (string) - Required - The ID of the file to delete.

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted file.
- **object** (string) - The object type, always "file".
- **deleted** (boolean) - Always true if the file was successfully deleted.

#### Response Example
{
  "id": "file-XjGxS3KTG0uWsA3mWp6lAPad",
  "object": "file",
  "deleted": true
}
```

--------------------------------

TITLE: Delete Assistant (TypeScript)
DESCRIPTION: Removes an assistant resource from the OpenAI platform. This function takes the `assistantID` of the assistant to be deleted and returns an `AssistantDeleted` confirmation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_77

LANGUAGE: TypeScript
CODE:
```
client.beta.assistants.delete(assistantID)
```

--------------------------------

TITLE: Cancel Fine-tuning Job with OpenAI Node.js Client
DESCRIPTION: This method cancels a currently running fine-tuning job identified by its ID. It takes the `fineTuningJobID` and attempts to stop the job, returning an updated `FineTuningJob` object. This is useful for stopping unwanted or problematic jobs.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_30

LANGUAGE: TypeScript
CODE:
```
client.fineTuning.jobs.cancel(fineTuningJobID)
```

--------------------------------

TITLE: Configure Request Retries in OpenAI Node.js Client
DESCRIPTION: Shows how to configure the `maxRetries` option to control automatic retries for certain API errors. This can be set globally for all requests or overridden on a per-request basis to manage network issues, timeouts, or rate limits.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_13

LANGUAGE: js
CODE:
```
// Configure the default for all requests:
const client = new OpenAI({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.chat.completions.create({ messages: [{ role: 'user', content: 'How can I get the name of the current day in JavaScript?' }], model: 'gpt-4o' }, {
  maxRetries: 5,
});
```

--------------------------------

TITLE: Retrieve Message with OpenAI Node.js Client
DESCRIPTION: Retrieves a specific message by its ID from a given thread. This method requires a 'messageID' and optionally accepts additional parameters. It returns a 'Message' object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_120

LANGUAGE: typescript
CODE:
```
client.beta.threads.messages.retrieve(messageID, { ...params })
```

--------------------------------

TITLE: Update Thread (TypeScript)
DESCRIPTION: Updates an existing conversation thread with new information. It requires the `threadID` and a parameter object, returning the modified `Thread` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_80

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.update(threadID, { ...params })
```

--------------------------------

TITLE: DELETE /assistants/{assistant_id}
DESCRIPTION: Deletes an assistant permanently using its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_91

LANGUAGE: APIDOC
CODE:
```
## DELETE /assistants/{assistant_id}

### Description
Deletes an assistant by its ID.

### Method
DELETE

### Endpoint
/assistants/{assistant_id}

### Parameters
#### Path Parameters
- **assistant_id** (string) - Required - The ID of the assistant to delete.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **AssistantDeleted** (object) - Confirmation of the deletion.

#### Response Example
{
  "id": "asst_abc123",
  "object": "assistant.deleted",
  "deleted": true
}
```

--------------------------------

TITLE: POST /threads/{thread_id}
DESCRIPTION: Updates an existing thread's properties using its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_94

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}

### Description
Updates an existing thread by its ID.

### Method
POST

### Endpoint
/threads/{thread_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to update.

#### Query Parameters
(None)

#### Request Body
- **params** (object) - Required - Parameters for updating the thread.

### Request Example
{
  "metadata": {
    "user_id": "user123"
  }
}

### Response
#### Success Response (200)
- **Thread** (object) - The updated thread object.

#### Response Example
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1677651200,
  "metadata": {
    "user_id": "user123"
  }
}
```

--------------------------------

TITLE: Update an Eval's configuration using OpenAI Node.js Client
DESCRIPTION: Modifies the properties of an existing evaluation. This method takes the evaluation's ID and new parameters, returning an EvalUpdateResponse object that reflects the changes.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_153

LANGUAGE: TypeScript
CODE:
```
client.evals.update(evalID, { ...params })
```

--------------------------------

TITLE: Poll Run Status (OpenAI Node.js Client)
DESCRIPTION: Periodically checks the status of an existing run until it reaches a terminal state. This method is useful for monitoring runs initiated separately. It returns a promise that resolves to the final `Run` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_105

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.poll(threadId, runId, options?) -> Promise<Run>
```

--------------------------------

TITLE: DELETE /vector_stores/{vector_store_id}
DESCRIPTION: Deletes a specific vector store by its unique identifier.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_59

LANGUAGE: APIDOC
CODE:
```
## DELETE /vector_stores/{vector_store_id}

### Description
Deletes a specific vector store by its unique identifier. This action is irreversible.

### Method
DELETE

### Endpoint
/vector_stores/{vector_store_id}

### Parameters
#### Path Parameters
- **vector_store_id** (string) - Required - The ID of the vector store to delete.

### Request Example
(No request body for DELETE requests)

### Response
#### Success Response (200)
- **data** (object) - Confirmation of the deleted vector store.

#### Response Example
{
  "id": "vs_abc123",
  "deleted": true
}
```

--------------------------------

TITLE: POST /evals/{eval_id}/runs/{run_id}
DESCRIPTION: Cancels a specific run for an evaluation. This stops the execution of the run if it is currently in progress.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_176

LANGUAGE: APIDOC
CODE:
```
## POST /evals/{eval_id}/runs/{run_id}

### Description
Cancels a specific run for an evaluation. This stops the execution of the run if it is currently in progress.

### Method
POST

### Endpoint
/evals/{eval_id}/runs/{run_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.
- **run_id** (string) - Required - The ID of the run to cancel.

#### Request Body
- **action** (string) - Required - The action to perform, must be "cancel".

### Request Example
```json
{
  "action": "cancel"
}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the cancelled run.
- **object** (string) - The type of object, typically 'eval_run'.
- **status** (string) - The updated status of the run, typically 'cancelled'.

#### Response Example
```json
{
  "id": "run_123def",
  "object": "eval_run",
  "status": "cancelled"
}
```
```

--------------------------------

TITLE: Access OpenAI Request ID with .withResponse() (TypeScript)
DESCRIPTION: This snippet demonstrates an alternative method to obtain the request ID using the `.withResponse()` method appended to an API call. This approach allows you to destructure both the API response data and the `request_id` simultaneously, providing a convenient way to access debugging information.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_10

LANGUAGE: ts
CODE:
```
const { data: stream, request_id } = await openai.chat.completions
  .create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  })
  .withResponse();
```

--------------------------------

TITLE: Access Request IDs for Debugging OpenAI API Calls
DESCRIPTION: Shows two methods to retrieve the `_request_id` from OpenAI API responses. This ID, derived from the `x-request-id` response header, is crucial for debugging and reporting specific API call issues to OpenAI.

SOURCE: https://github.com/openai/openai-node/blob/master/README.md#_snippet_15

LANGUAGE: ts
CODE:
```
const response = await client.responses.create({ model: 'gpt-4o', input: 'testing 123' });
console.log(response._request_id); // req_123
```

LANGUAGE: ts
CODE:
```
const { data: stream, request_id } = await openai.responses
  .create({
    model: 'gpt-4o',
    input: 'Say this is a test',
    stream: true,
  })
  .withResponse();
```

--------------------------------

TITLE: Retrieve a specific Eval using OpenAI Node.js Client
DESCRIPTION: Fetches the details of an existing evaluation identified by its unique ID. This method is used to inspect the current state and properties of an evaluation and returns an EvalRetrieveResponse object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_152

LANGUAGE: TypeScript
CODE:
```
client.evals.retrieve(evalID)
```

--------------------------------

TITLE: Cancel Batch with OpenAI Node.js Client
DESCRIPTION: Cancels an ongoing batch processing job. This method requires a 'batchID' and returns the updated 'Batch' object, reflecting its cancellation status.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_127

LANGUAGE: typescript
CODE:
```
client.batches.cancel(batchID)
```

--------------------------------

TITLE: Delete File (TypeScript)
DESCRIPTION: Deletes a specific file from the OpenAI platform permanently. This method requires the `fileID` of the file to be deleted. It returns a `FileDeleted` object confirming the successful deletion.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_5

LANGUAGE: TypeScript
CODE:
```
client.files.delete(fileID) -> FileDeleted
```

--------------------------------

TITLE: Cancel Upload with OpenAI Node.js Client
DESCRIPTION: Cancels an in-progress file upload. This method requires an 'uploadID' and returns the 'Upload' object with an updated status.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_129

LANGUAGE: typescript
CODE:
```
client.uploads.cancel(uploadID)
```

--------------------------------

TITLE: Update Message with OpenAI Node.js Client
DESCRIPTION: Updates an existing message identified by its ID within a thread. This method requires a 'messageID' and parameters for the update. It returns the updated 'Message' object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_121

LANGUAGE: typescript
CODE:
```
client.beta.threads.messages.update(messageID, { ...params })
```

--------------------------------

TITLE: Cancel a Run (OpenAI Node.js Client)
DESCRIPTION: Cancels an ongoing run identified by its ID within a specific thread. This method requires a `runID` and sends a POST request to the OpenAI API. It returns the `Run` object with its status updated to `cancelled`.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_101

LANGUAGE: typescript
CODE:
```
client.beta.threads.runs.cancel(runID, { ...params })
```

--------------------------------

TITLE: POST /threads/{thread_id}/messages/{message_id}
DESCRIPTION: Updates the metadata of a specific message within a thread. This allows you to modify properties like custom metadata for a message.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_133

LANGUAGE: APIDOC
CODE:
```
## POST /threads/{thread_id}/messages/{message_id}

### Description
Updates the metadata of a specific message within a thread. This allows you to modify properties like custom metadata for a message.

### Method
POST

### Endpoint
/threads/{thread_id}/messages/{message_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the message belongs to.
- **message_id** (string) - Required - The ID of the message to update.

#### Request Body
- **params** (object) - Required - Parameters for updating the message, typically including `metadata`.

### Request Example
{
  "metadata": {
    "status": "reviewed",
    "priority": "high"
  }
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the updated message.
- **object** (string) - The object type, usually "thread.message".
- **created_at** (integer) - The Unix timestamp (in seconds) for when the message was created.
- **thread_id** (string) - The ID of the thread this message belongs to.
- **role** (string) - The role of the entity that created the message (e.g., "user", "assistant").
- **content** (array) - An array of content blocks for the message.
- **file_ids** (array) - An array of file IDs attached to this message.
- **assistant_id** (string) - The ID of the assistant that created the message (if applicable).
- **run_id** (string) - The ID of the run associated with the message (if applicable).
- **metadata** (object) - Updated set of 16 key-value pairs attached to the object.

#### Response Example
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1678901234,
  "thread_id": "thread_xyz456",
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "Hello, what is the weather like today?",
        "annotations": []
      }
    }
  ],
  "file_ids": [],
  "assistant_id": null,
  "run_id": null,
  "metadata": {
    "status": "reviewed",
    "priority": "high"
  }
}
```

--------------------------------

TITLE: DELETE /evals/{eval_id}/runs/{run_id}
DESCRIPTION: Deletes a specific run for an evaluation. This action removes the run and its associated output items.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_175

LANGUAGE: APIDOC
CODE:
```
## DELETE /evals/{eval_id}/runs/{run_id}

### Description
Deletes a specific run for an evaluation. This action removes the run and its associated output items.

### Method
DELETE

### Endpoint
/evals/{eval_id}/runs/{run_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation.
- **run_id** (string) - Required - The ID of the run to delete.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted run.
- **object** (string) - The type of object, typically 'eval_run'.
- **deleted** (boolean) - True if the deletion was successful.

#### Response Example
```json
{
  "id": "run_123def",
  "object": "eval_run",
  "deleted": true
}
```
```

--------------------------------

TITLE: Delete a Fine-tuned Model with OpenAI Node.js Client
DESCRIPTION: This method deletes a fine-tuned model specified by its ID. It accepts the `model` identifier as an argument and returns a `ModelDeleted` object indicating the deletion status. This operation is typically used for managing custom-trained models.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_26

LANGUAGE: TypeScript
CODE:
```
client.models.delete(model)
```

--------------------------------

TITLE: POST /batches/{batch_id}/cancel
DESCRIPTION: Cancels a specific batch job by its ID. Only batch jobs that are not yet completed or failed can be cancelled.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_139

LANGUAGE: APIDOC
CODE:
```
## POST /batches/{batch_id}/cancel

### Description
Cancels a specific batch job by its ID. Only batch jobs that are not yet completed or failed can be cancelled.

### Method
POST

### Endpoint
/batches/{batch_id}/cancel

### Parameters
#### Path Parameters
- **batch_id** (string) - Required - The ID of the batch job to cancel.

### Request Example
(No request body for cancel operation)

### Response
#### Success Response (200)
- **id** (string) - The ID of the cancelled batch.
- **object** (string) - The object type, usually "batch".
- **status** (string) - The updated status of the batch job, which will be "cancelled".
- **cancelled_at** (integer) - The Unix timestamp (in seconds) for when the batch was cancelled.

#### Response Example
{
  "id": "batch_abc123",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "completion_window": "24h",
  "input_file_id": "file-abc123",
  "output_file_id": null,
  "error_file_id": null,
  "status": "cancelled",
  "created_at": 1678901234,
  "in_progress_at": 1678901240,
  "expires_at": 1679765432,
  "cancelled_at": 1678901250,
  "failed_at": null,
  "completed_at": null,
  "request_counts": {
    "total": 100,
    "completed": 10,
    "failed": 0
  },
  "metadata": {}
}
```

--------------------------------

TITLE: Retrieve Thread (TypeScript)
DESCRIPTION: Retrieves a specific conversation thread by its ID. The method takes the `threadID` as input and returns the corresponding `Thread` object.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_79

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.retrieve(threadID)
```

--------------------------------

TITLE: POST /conversations/{conversation_id}
DESCRIPTION: Updates an existing conversation identified by its ID. This allows modifying conversation properties.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_145

LANGUAGE: APIDOC
CODE:
```
## POST /conversations/{conversation_id}

### Description
Updates an existing conversation.

### Method
POST

### Endpoint
/conversations/{conversation_id}

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation to update.

#### Query Parameters
(None)

#### Request Body
(Refer to API client library for 'params' details)

### Request Example
{
  "//": "Example request body for updating a conversation"
}

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the updated conversation.
- **created_at** (string) - Timestamp when the conversation was created.
- **updated_at** (string) - Timestamp when the conversation was last updated.

#### Response Example
{
  "id": "conv_abc123",
  "created_at": "2023-10-27T10:00:00Z",
  "updated_at": "2023-10-27T10:30:00Z"
}
```

--------------------------------

TITLE: DELETE /threads/{thread_id}
DESCRIPTION: Deletes a thread permanently using its unique ID.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_95

LANGUAGE: APIDOC
CODE:
```
## DELETE /threads/{thread_id}

### Description
Deletes a thread by its ID.

### Method
DELETE

### Endpoint
/threads/{thread_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread to delete.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **ThreadDeleted** (object) - Confirmation of the deletion.

#### Response Example
{
  "id": "thread_abc123",
  "object": "thread.deleted",
  "deleted": true
}
```

--------------------------------

TITLE: POST /evals/{eval_id}
DESCRIPTION: Updates an existing evaluation identified by its ID. You can modify various parameters of the evaluation using this endpoint.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_169

LANGUAGE: APIDOC
CODE:
```
## POST /evals/{eval_id}

### Description
Updates an existing evaluation identified by its ID. You can modify various parameters of the evaluation using this endpoint.

### Method
POST

### Endpoint
/evals/{eval_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation to update.

#### Request Body
- **status** (string) - Optional - New status for the evaluation (e.g., 'cancelled').
- **metadata** (object) - Optional - Key-value pairs to store additional information.

### Request Example
```json
{
  "status": "cancelled"
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique identifier of the updated evaluation.
- **object** (string) - The type of object, typically 'eval'.
- **status** (string) - The updated status of the evaluation.

#### Response Example
```json
{
  "id": "eval_abc123",
  "object": "eval",
  "status": "cancelled"
}
```
```

--------------------------------

TITLE: Cancel an ongoing Eval Run using OpenAI Node.js Client
DESCRIPTION: Cancels a currently active run for a given evaluation. This method requires the run ID and returns a RunCancelResponse, indicating the run has been stopped.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_160

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.cancel(runID, { ...params })
```

--------------------------------

TITLE: Delete Message with OpenAI Node.js Client
DESCRIPTION: Deletes a specific message by its ID from a thread. This method requires a 'messageID' and returns a 'MessageDeleted' object indicating success.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_123

LANGUAGE: typescript
CODE:
```
client.beta.threads.messages.delete(messageID, { ...params })
```

--------------------------------

TITLE: Delete an Eval using OpenAI Node.js Client
DESCRIPTION: Removes an evaluation resource identified by its unique ID. This action is irreversible and returns an EvalDeleteResponse upon successful deletion.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_155

LANGUAGE: TypeScript
CODE:
```
client.evals.delete(evalID)
```

--------------------------------

TITLE: DELETE /threads/{thread_id}/messages/{message_id}
DESCRIPTION: Deletes a specific message from a thread. This action is permanent and cannot be undone.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_135

LANGUAGE: APIDOC
CODE:
```
## DELETE /threads/{thread_id}/messages/{message_id}

### Description
Deletes a specific message from a thread. This action is permanent and cannot be undone.

### Method
DELETE

### Endpoint
/threads/{thread_id}/messages/{message_id}

### Parameters
#### Path Parameters
- **thread_id** (string) - Required - The ID of the thread the message belongs to.
- **message_id** (string) - Required - The ID of the message to delete.

### Request Example
(No request body for DELETE requests)

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted message.
- **object** (string) - The object type, usually "message.deleted".
- **deleted** (boolean) - True if the message was successfully deleted.

#### Response Example
{
  "id": "msg_abc123",
  "object": "message.deleted",
  "deleted": true
}
```

--------------------------------

TITLE: DELETE /conversations/{conversation_id}/items/{item_id}
DESCRIPTION: Deletes a specific item from a conversation by its unique identifier. This action is irreversible.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_150

LANGUAGE: APIDOC
CODE:
```
## DELETE /conversations/{conversation_id}/items/{item_id}

### Description
Deletes a specific item from a conversation by its ID.

### Method
DELETE

### Endpoint
/conversations/{conversation_id}/items/{item_id}

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation.
- **item_id** (string) - Required - The ID of the item to delete.

#### Query Parameters
(Refer to API client library for 'params' details)

### Request Example
(None)

### Response
#### Success Response (200)
- **id** (string) - The ID of the conversation that contained the deleted item.
- **deleted_item_id** (string) - The ID of the item that was deleted.

#### Response Example
{
  "id": "conv_abc123",
  "deleted_item_id": "item_xyz789"
}
```

--------------------------------

TITLE: Delete Thread (TypeScript)
DESCRIPTION: Deletes a conversation thread from the OpenAI platform. This function takes the `threadID` of the thread to be removed and returns a `ThreadDeleted` confirmation.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_81

LANGUAGE: TypeScript
CODE:
```
client.beta.threads.delete(threadID)
```

--------------------------------

TITLE: DELETE /conversations/{conversation_id}
DESCRIPTION: Deletes a specific conversation by its unique identifier. This action is irreversible.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_146

LANGUAGE: APIDOC
CODE:
```
## DELETE /conversations/{conversation_id}

### Description
Deletes a specific conversation by ID.

### Method
DELETE

### Endpoint
/conversations/{conversation_id}

### Parameters
#### Path Parameters
- **conversation_id** (string) - Required - The ID of the conversation to delete.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted conversation resource.
- **deleted** (boolean) - Indicates if the deletion was successful (true).

#### Response Example
{
  "id": "conv_abc123",
  "deleted": true
}
```

--------------------------------

TITLE: Delete an Eval Run using OpenAI Node.js Client
DESCRIPTION: Removes a specific run of an evaluation, identified by its run ID. This action is final and returns a RunDeleteResponse upon successful completion.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_159

LANGUAGE: TypeScript
CODE:
```
client.evals.runs.delete(runID, { ...params })
```

--------------------------------

TITLE: DELETE /evals/{eval_id}
DESCRIPTION: Deletes a specific evaluation by its ID. This action is irreversible and removes all associated data.

SOURCE: https://github.com/openai/openai-node/blob/master/api.md#_snippet_171

LANGUAGE: APIDOC
CODE:
```
## DELETE /evals/{eval_id}

### Description
Deletes a specific evaluation by its ID. This action is irreversible and removes all associated data.

### Method
DELETE

### Endpoint
/evals/{eval_id}

### Parameters
#### Path Parameters
- **eval_id** (string) - Required - The ID of the evaluation to delete.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the deleted evaluation.
- **object** (string) - The type of object, typically 'eval'.
- **deleted** (boolean) - True if the deletion was successful.

#### Response Example
```json
{
  "id": "eval_abc123",
  "object": "eval",
  "deleted": true
}
```
```