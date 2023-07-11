import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('GnarsToken:Approval', async ({ event, context }) => {
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

ponder.on('GnarsToken:ApprovalForAll', async ({ event, context }) => {
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

ponder.on('GnarsToken:DelegateChanged', async ({ event, context }) => {
  const id = event.log.id
  const { DelegateChangedEvent } = context.entities
  const { delegator, fromDelegate, toDelegate } = event.params

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

ponder.on('GnarsToken:DelegateVotesChanged', async ({ event, context }) => {
  const id = event.log.id
  const { DelegateVotesChangedEvent } = context.entities
  const { delegate, previousBalance, newBalance } = event.params

  await DelegateVotesChangedEvent.create({
    id,
    data: {
      dao: dao.id,
      delegate,
      previousBalance: Number(previousBalance),
      newBalance: Number(newBalance),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('GnarsToken:GnarBurned', async ({ event, context }) => {
  const id = event.log.id
  const { NftBurnedEvent } = context.entities
  const { tokenId } = event.params

  await NftBurnedEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(tokenId),
      createdAt: Number(event.block.timestamp),
    },
  })
})

// TODO: Add seed type to NounCreated schema
ponder.on('GnarsToken:GnarCreated', async ({ event, context }) => {
  const id = event.log.id
  const { NftCreatedEvent } = context.entities
  const { tokenId, seed } = event.params

  await NftCreatedEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(tokenId),
      seed: JSON.stringify({
        background: Number(seed.background),
        body: Number(seed.body),
        accessory: Number(seed.accessory),
        head: Number(seed.head),
        glasses: Number(seed.glasses),
      }),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('GnarsToken:Transfer', async ({ event, context }) => {
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
