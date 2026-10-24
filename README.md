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

## Runtime and deployment

Use Node.js **22.23.4**, which includes the
[CVE-2026-111497 fix](https://nodejs.org/en/blog/release/v22.23.4).
The `.nvmrc` files pin this release; the app manifests and `.npmrc` files allow
installation only on Node 22.23.4 or later Node 22 patches.

In `apps/indexer`, use pnpm 7.33.7 and `pnpm install --frozen-lockfile`.
The scoped pnpm override moves Ponder's native `better-sqlite3` dependency to
10.1.0 for Node 22 compatibility, without upgrading Ponder. Keep using pnpm so
the override applies. In `apps/web`, use `yarn install --frozen-lockfile` and
`yarn build`.

On Railway, keep the indexer root at `/apps/indexer`. Check the builder and
runtime overrides: `RAILPACK_NODE_VERSION` takes precedence over the manifest;
legacy Nixpacks or custom images require their own runtime configuration.
Rebuild native dependencies and restart every indexer replica/worker, then
verify `node --version` inside the running service and check `/health`,
GraphQL, RPC indexing, and PostgreSQL. Repository pins do not update an
already-running deployment.
