This project uses Orval to generate a TypeScript API client with TanStack Query hooks.

How to generate the client locally

1. Ensure the backend serving the OpenAPI spec is running and reachable. By default Orval points to:

   http://localhost:5000/openapi.json

   If your backend uses a different URL, set the `OPENAPI_URL` environment variable before running the generator.

2. Run:

   npm run generate:api

3. The generated client will be written to `src/services/api.ts` (per `orval.config.ts`).

Notes
- The generator uses `src/services/mutator.ts` as a centralized mutator (fetch-based). Implement auth token injection there if needed.
- If the backend returns 403, 404 or the URL is otherwise protected, either (a) run the backend locally, (b) expose the OpenAPI JSON to the generator, or (c) provide a local copy of the OpenAPI JSON and set `OPENAPI_URL` to its `file:///` path.
