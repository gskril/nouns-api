import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderToken:Approval', async ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalEvent } = context.entities
  const { owner, approved, tokenId } = event.params

  await ApprovalEvent.insert(id, {
    dao: dao.id,
    owner,
    approved,
    tokenId: Number(tokenId),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderToken:ApprovalForAll', async ({ event, context }) => {
  const id = event.log.logId
  const { ApprovalForAllEvent } = context.entities
  const { owner, operator, approved } = event.params

  await ApprovalForAllEvent.insert(id, {
    dao: dao.id,
    owner,
    operator,
    approved,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderToken:DelegateChanged', async ({ event, context }) => {
  const id = event.log.logId
  const { DelegateChangedEvent } = context.entities
  const { delegator, from: fromDelegate, to: toDelegate } = event.params

  await DelegateChangedEvent.insert(id, {
    dao: dao.id,
    delegator,
    fromDelegate,
    toDelegate,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderToken:DelegateVotesChanged', async ({ event, context }) => {
  const id = event.log.logId
  const { DelegateVotesChangedEvent } = context.entities
  const { delegate, prevTotalVotes, newTotalVotes } = event.params

  await DelegateVotesChangedEvent.insert(id, {
    dao: dao.id,
    delegate,
    previousBalance: Number(prevTotalVotes),
    newBalance: Number(newTotalVotes),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderToken:Transfer', async ({ event, context }) => {
  const id = event.log.logId
  const { TransferEvent, Token } = context.entities
  const { from, to, tokenId } = event.params

  await TransferEvent.insert(id, {
    dao: dao.id,
    from,
    to,
    tokenId: Number(tokenId),
    createdAt: Number(event.block.timestamp),
  })

  await Token.upsert(createStaticId('token', dao.id, Number(tokenId)), {
    tokenId: Number(tokenId),
    dao: dao.id,
    owner: to,
  })
})
