import { DAO } from '../types'
import { ponder } from '../../generated'

const dao: DAO = 'Nouns'

ponder.on('NounsToken:Approval', ({ event, context }) => {
  const id = event.log.logId
  const { Approval } = context.entities
  const { owner, approved, tokenId } = event.params

  Approval.insert(id, {
    dao,
    owner,
    approved,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:ApprovalForAll', ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalForAll } = context.entities
  const { owner, operator, approved } = event.params

  ApprovalForAll.insert(id, {
    dao,
    owner,
    operator,
    approved,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:DelegateChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChanged } = context.entities
  const { delegator, fromDelegate, toDelegate } = event.params

  DelegateChanged.insert(id, {
    dao,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:DelegateVotesChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChanged } = context.entities
  const { delegate, previousBalance, newBalance } = event.params

  DelegateVotesChanged.insert(id, {
    dao,
    delegate,
    previousBalance: Number(previousBalance),
    newBalance: Number(newBalance),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsToken:NounBurned', ({ event, context }) => {
  const id = event.log.logId
  const { NounBurned } = context.entities
  const { tokenId } = event.params

  NounBurned.insert(id, {
    dao,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})

// TODO: Add seed type to NounCreated schema
ponder.on('NounsToken:NounCreated', ({ event, context }) => {
  const id = event.log.logId
  const { NounCreated } = context.entities
  const { tokenId, seed } = event.params

  NounCreated.insert(id, {
    dao,
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
  const { Transfer } = context.entities
  const { from, to, tokenId } = event.params

  Transfer.insert(id, {
    dao,
    from,
    to,
    tokenId: Number(tokenId),
    createdAt: event.block.timestamp,
  })
})
