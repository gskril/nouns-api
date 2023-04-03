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
