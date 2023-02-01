import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderToken:Approval', ({ event, context }) => {
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

ponder.on('BuilderToken:ApprovalForAll', ({ event, context }) => {
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

ponder.on('BuilderToken:DelegateChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChanged } = context.entities
  const { delegator, from: fromDelegate, to: toDelegate } = event.params

  DelegateChanged.insert(id, {
    dao: dao.id,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderToken:DelegateVotesChanged', ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChanged } = context.entities
  const { delegate, prevTotalVotes, newTotalVotes } = event.params

  DelegateVotesChanged.insert(id, {
    dao: dao.id,
    delegate,
    previousBalance: Number(prevTotalVotes),
    newBalance: Number(newTotalVotes),
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderToken:Transfer', ({ event, context }) => {
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
