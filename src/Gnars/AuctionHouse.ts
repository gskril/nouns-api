import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('GnarsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent, Dao } = context.entities
  const { gnarId, sender, value } = event.params

  await Dao.upsert(dao.id, dao.body)

  const auctionId = createStaticId('token', dao.id, Number(gnarId))

  await AuctionBidEvent.insert(id, {
    auction: auctionId,
    dao: dao.id,
    tokenId: Number(gnarId),
    sender,
    value: value.toString(),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('GnarsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreatedEvent } = context.entities
  const { gnarId, startTimestamp, endTimestamp } = event.params

  await AuctionCreatedEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(gnarId),
    startTime: Number(startTimestamp),
    endTime: Number(endTimestamp),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on(
  'GnarsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionMinBidIncrementPercentageUpdatedEvent } = context.entities
    const { minBidIncrementPercentage } = event.params

    await AuctionMinBidIncrementPercentageUpdatedEvent.insert(id, {
      dao: dao.id,
      minBidIncrementPercentage: Number(minBidIncrementPercentage),
      createdAt: Number(event.block.timestamp),
    })
  }
)

ponder.on(
  'GnarsAuctionHouse:AuctionReservePriceUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionReservePriceUpdatedEvent } = context.entities
    const { reservePrice } = event.params

    await AuctionReservePriceUpdatedEvent.insert(id, {
      dao: dao.id,
      reservePrice: reservePrice.toString(),
      createdAt: Number(event.block.timestamp),
    })
  }
)

ponder.on('GnarsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettledEvent } = context.entities
  const { gnarId, winner, amount } = event.params

  await AuctionSettledEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(gnarId),
    winner,
    amount: amount.toString(),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on(
  'GnarsAuctionHouse:OwnershipTransferred',
  async ({ event, context }) => {
    const id = event.log.logId
    const { OwnershipTransferEventredEvent } = context.entities
    const { previousOwner, newOwner } = event.params

    await OwnershipTransferEventredEvent.insert(id, {
      dao: dao.id,
      previousOwner,
      newOwner,
      createdAt: Number(event.block.timestamp),
    })
  }
)

ponder.on('GnarsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { account } = event.params

  await PausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('GnarsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { account } = event.params

  await UnpausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})
