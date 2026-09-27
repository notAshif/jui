# 14: CLI Distribution, Registry Engine & Package Configuration

**What to build:** The executable `jui` CLI distribution tool allowing developers to run `npx jui add <component>` (or `npx @asif/jui add <component>` / local `npx . add <component>`) to scaffold Modern and Pixel components directly into consuming projects. Includes command parsing for `add`, `init`, and `list`, automatic resolution of component dependencies and assets (e.g. `pixel/icons.tsx`, `lib/utils.ts`), package binary configuration (`bin` in `package.json`), Dockerfile lockfile fix (`bun.lock`), and npm publishing readiness.

**Blocked by:** None

**Status:** resolved

- [x] Fix Docker setup: update `Dockerfile` to copy `bun.lock*` rather than missing `bun.lockb`, and remove obsolete `version` in `docker-compose.yml`.
- [x] Fix existing lint errors in `components/base/card-base.tsx` and `components/ui/table.tsx` to ensure clean build & lint baseline.
- [x] Create Component Registry definition mapping all 28 UI and Pixel components, their local template files, and shared dependencies.
- [x] Implement CLI engine in `bin/jui.mjs` supporting `add [components...]`, `list`, `init`, `--flavor <modern|pixel|both>`, `--overwrite`, and `--help`.
- [x] Wire `"bin": { "jui": "./bin/jui.mjs" }` and export configuration in `package.json`.
- [x] Write automated unit/integration tests for the CLI commands and registry resolution using Bun/Node test runner.
- [x] Verify `npx . add button` and `node ./bin/jui.mjs add button --flavor both` end-to-end.
- [x] Document CLI usage and publishing workflow in `README.md` and documentation pages.

## Comments
CLI implemented, tested with 7 passing tests, linted with 0 errors, and verified with `npx . add button`.

