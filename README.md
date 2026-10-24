# Nouns Ecosystem API

Index the contracts of Nounish DAOs and expose the data via a GraphQL API. This includes auctions, proposals, delegations, token activity, etc.

## Deploy your own

1. Fork this repo
2. Sign up for a [Railway account](https://railway.app?referralCode=ONtqGs) (referral link)
3. Create a new project from the forked repo and create an environment variable named `PONDER_RPC_URL_1` with a mainnet RPC endpoint
4. Congfigure a few Railway settings
   - Change the root directory to `/apps/indexer`
   - Change the healthchedk path to `/health`
   - Generate a domain to make the GraphQL API public
5. Add a PostgreSQL database to your Railway project, then restart the indexer service

It will take a while to backfill all of the contract data, but everything will happen automatically thanks to [Ponder](https://ponder.sh/).

## Node.js runtime security

Use Node.js **22.23.4** (the `.nvmrc` files pin it at the repository root and
both app roots). This release includes the fix for
[CVE-2026-111497](https://nodejs.org/en/blog/release/v22.23.4). The manifests
allow later patches on Node 22 only; untested major versions are not included.
The `.npmrc` files reject incompatible runtimes during package installation.
These settings do not replace Node in an already-running process.

For the indexer, use pnpm 7.33.7 and `pnpm install --frozen-lockfile` in
`apps/indexer`. Ponder 0.0.69's `better-sqlite3` 7 dependency does not compile on
Node 22. A narrowly scoped pnpm override selects 10.1.0, from the first
[major supporting Node 22](https://github.com/WiseLibs/better-sqlite3/releases/tag/v10.0.0).
This is a native-addon compatibility change needed for the Node migration,
not a Brotli fix inside SQLite. Keep using pnpm so the override is honored.
Ponder and the other application dependencies are unchanged.

Run `pnpm codegen` and `pnpm test:runtime` to check local compatibility. The
smoke test uses a fresh disposable SQLite database, compiles the application
handlers/schema, exercises CRUD and GraphQL over loopback, and checks that
the health endpoint does not report ready before synchronization. It never
starts RPC synchronization or connects to PostgreSQL. It is not an exploit
test or a substitute for checking the actual deployed Node release.

For the web app, use `yarn install --frozen-lockfile` and `yarn build` in
`apps/web` with the same Node version.

### Railway rollout

Keep the indexer service root at `/apps/indexer`. Railway's current Railpack
builder reads `engines.node`, but `RAILPACK_NODE_VERSION` takes precedence.
Check any service-level override and build logs to ensure Node 22.23.4 or a
later Node 22 patch is actually selected. Existing Nixpacks/custom-image
services must have their runtime configured explicitly and checked as well.

After review, rebuild with the new lockfile/native addon and restart every
indexer replica or worker. Verify `node --version` inside the running service,
then validate `/health`, GraphQL queries, RPC indexing, and PostgreSQL access.
A merged PR, an `engines` value, or a successful local build alone does not
prove production has been patched. This change does not deploy or inspect the
live Railway service.
