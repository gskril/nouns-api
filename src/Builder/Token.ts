import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderToken:ApprovalEvent', ({ event, context }) => {
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

ponder.on('BuilderToken:ApprovalForAllEvent', ({ event, context }) => {
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

ponder.on('BuilderToken:DelegateChangedEvent', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChangedEvent } = context.entities
  const { delegator, from: fromDelegate, to: toDelegate } = event.params

  DelegateChangedEvent.insert(id, {
    dao: dao.id,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderToken:DelegateVotesChangedEvent', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChangedEvent } = context.entities
  const { delegate, prevTotalVotes, newTotalVotes } = event.params

  DelegateVotesChangedEvent.insert(id, {
    dao: dao.id,
    delegate,
    previousBalance: Number(prevTotalVotes),
    newBalance: Number(newTotalVotes),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderToken:TransferEvent', ({ event, context }) => {
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
