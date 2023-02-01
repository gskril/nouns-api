import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('LilNounsToken:Approval', ({ event, context }) => {
  const id = event.log.logId
  const { Approval } = context.entities
  const { owner, approved, tokenId } = event.params

  Approval.insert(id, {
    dao: dao.id,
    owner,
    approved,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsToken:ApprovalForAll', ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalForAll } = context.entities
  const { owner, operator, approved } = event.params

  ApprovalForAll.insert(id, {
    dao: dao.id,
    owner,
    operator,
    approved,
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsToken:DelegateChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChanged } = context.entities
  const { delegator, fromDelegate, toDelegate } = event.params

  DelegateChanged.insert(id, {
    dao: dao.id,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsToken:DelegateVotesChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChanged } = context.entities
  const { delegate, previousBalance, newBalance } = event.params

  DelegateVotesChanged.insert(id, {
    dao: dao.id,
    delegate,
    previousBalance: Number(previousBalance),
    newBalance: Number(newBalance),
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsToken:NounBurned', ({ event, context }) => {
  const id = event.log.logId
  const { NftBurned } = context.entities
  const { tokenId } = event.params

  NftBurned.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

// TODO: Add seed type to NounCreated schema
ponder.on('LilNounsToken:NounCreated', ({ event, context }) => {
  const id = event.log.logId
  const { NftCreated } = context.entities
  const { tokenId, seed } = event.params

  NftCreated.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    seed: JSON.stringify({
      background: Number(seed.background),
      body: Number(seed.body),
      accessory: Number(seed.accessory),
      head: Number(seed.head),
      glasses: Number(seed.glasses),
    }),
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsToken:Transfer', ({ event, context }) => {
  const id = event.log.logId
  const { Transfer } = context.entities
  const { from, to, tokenId } = event.params

  Transfer.insert(id, {
    dao: dao.id,
    from,
    to,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})
