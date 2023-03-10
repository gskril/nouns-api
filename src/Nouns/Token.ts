import { dao } from './'
import { ponder } from '../../generated'

ponder.on('NounsToken:Approval', ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalEvent } = context.entities
  const { owner, approved, tokenId } = event.params

  ApprovalEvent.insert(id, {
    dao: dao.id,
    owner,
    approved,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:ApprovalForAll', ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalForAllEvent } = context.entities
  const { owner, operator, approved } = event.params

  ApprovalForAllEvent.insert(id, {
    dao: dao.id,
    owner,
    operator,
    approved,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:DelegateChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChangedEvent } = context.entities
  const { delegator, fromDelegate, toDelegate } = event.params

  DelegateChangedEvent.insert(id, {
    dao: dao.id,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:DelegateVotesChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChangedEvent } = context.entities
  const { delegate, previousBalance, newBalance } = event.params

  DelegateVotesChangedEvent.insert(id, {
    dao: dao.id,
    delegate,
    previousBalance: Number(previousBalance),
    newBalance: Number(newBalance),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:NounBurned', ({ event, context }) => {
  const id = event.log.logId
  const { NftBurnedEvent } = context.entities
  const { tokenId } = event.params

  NftBurnedEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

// TODO: Add seed type to NounCreated schema
ponder.on('NounsToken:NounCreated', ({ event, context }) => {
  const id = event.log.logId
  const { NftCreatedEvent } = context.entities
  const { tokenId, seed } = event.params

  NftCreatedEvent.insert(id, {
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

ponder.on('NounsToken:Transfer', ({ event, context }) => {
  const id = event.log.logId
  const { TransferEvent } = context.entities
  const { from, to, tokenId } = event.params

  TransferEvent.insert(id, {
    dao: dao.id,
    from,
    to,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})
