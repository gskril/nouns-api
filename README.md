# Nouns Ecosystem API

Index the contracts of all Nounish DAOs and expose the data via a GraphQL API. This includes auctions, proposals, delegations, token activity, etc.

## Notes

- Currently the GraphQL API only exposes contract events, not contract state. This means that to get something like all current token holders, you would need to query all `Transfer` events and then aggregate the results.
- Ideally the API could handle all of this aggregation and expose a simpler API.

## Ideal API Design

A more usable API design would allow for queries like this:

```graphql
{
  tokens {
    name
    owner
    dao {
      name
    }
    auction {
      bids {
        sender
        value
      }
    }
  }

  auctions {
    tokenId
    sender
    value
    dao {
      name
    }
  }

  proposals {
    name
    description
    dao {
      name
    }
    votes {
      voter
      weight
      reason
    }
  }
}
```
