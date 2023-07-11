import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('PurpleToken:Approval', async ({ event, context }) => {
  const id = event.log.id
  const { ApprovalEvent } = context.entities
  const { owner, approved, tokenId } = event.params

  await ApprovalEvent.create({
    id,
    data: {
      dao: dao.id,
      owner,
      approved,
      tokenId: Number(tokenId),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('PurpleToken:ApprovalForAll', async ({ event, context }) => {
  const id = event.log.id
  const { ApprovalForAllEvent } = context.entities
  const { owner, operator, approved } = event.params

  await ApprovalForAllEvent.create({
    id,
    data: {
      dao: dao.id,
      owner,
      operator,
      approved,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('PurpleToken:DelegateChanged', async ({ event, context }) => {
  const id = event.log.id
  const { DelegateChangedEvent } = context.entities
  const { delegator, from: fromDelegate, to: toDelegate } = event.params

  await DelegateChangedEvent.create({
    id,
    data: {
      dao: dao.id,
      delegator,
      fromDelegate,
      toDelegate,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('PurpleToken:DelegateVotesChanged', async ({ event, context }) => {
  const id = event.log.id
  const { DelegateVotesChangedEvent } = context.entities
  const { delegate, prevTotalVotes, newTotalVotes } = event.params

  await DelegateVotesChangedEvent.create({
    id,
    data: {
      dao: dao.id,
      delegate,
      previousBalance: Number(prevTotalVotes),
      newBalance: Number(newTotalVotes),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('PurpleToken:Transfer', async ({ event, context }) => {
  const id = event.log.id
  const { TransferEvent, Token } = context.entities
  const { from, to, tokenId } = event.params

  await TransferEvent.create({
    id,
    data: {
      dao: dao.id,
      from,
      to,
      tokenId: Number(tokenId),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Token.upsert({
    id: createStaticId('token', dao.id, Number(tokenId)),
    create: {
      tokenId: Number(tokenId),
      dao: dao.id,
      owner: to,
    },
    update: {
      owner: to,
    },
  })
})
