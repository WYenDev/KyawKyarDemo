# Agent Guidelines for This Repo

- Dev server: `npm run dev`; build: `npm run build`; preview: `npm run preview`.
- Lint all files with `npm run lint`; no Jest/Vitest tests are configured yet.
- When adding tests, prefer Vitest; run full suite with `npm test` and single tests via `vitest path/to/file.test.tsx -t "test name"`.
- Project is React + TypeScript + Vite; use `.tsx` for React components and `.ts` for non-React modules.
- Follow existing import order: React/TS libs, third-party libs, then local modules; use relative paths within `src/`.
- Use named TypeScript `interface`/`type` declarations; avoid `any` and keep props/state strongly typed.
- Prefer `const` over `let`, and avoid mutable patterns when possible; keep React components as `const Name: React.FC<Props> = () => { ... }`.
- JSX uses TailwindCSS utility classes; keep className strings readable and consistent with existing patterns.
- Use `useTranslation` from `react-i18next` with explicit namespaces (e.g. `useTranslation('common')`) and add keys to the appropriate JSON files.
- Handle errors gracefully in new code (e.g. guard against null/undefined, fallback UI for failed data); don’t throw raw errors from React components.
- Run `npm run lint` after non-trivial changes and fix reported issues rather than disabling rules.
- Keep files focused (one main component per file) and prefer composable smaller components over large monoliths.
- Naming: PascalCase for components/types, camelCase for variables/functions, UPPER_SNAKE_CASE for constants when needed.
- Do not introduce new global state libraries without explicit user request; prefer props/context for simple sharing.
- Maintain existing i18n structure; don’t change namespaces without updating `src/i18n.ts` and all locale JSON.
- Avoid adding new dependencies unless necessary; if added, update `package.json` and explain usage in PR/notes.
- No Cursor `.cursor/rules` or GitHub Copilot instruction files are present; this AGENTS.md is the primary agent guideline.
- Don’t modify build tooling (Vite, ESLint, TS config) unless the task explicitly requires it.
