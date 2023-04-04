import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('GnarsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent } = context.entities
  const { gnarId, sender, value } = event.params

  const auctionId = createStaticId('auction', dao.id, Number(gnarId))

  await AuctionBidEvent.create({
    id,
    data: {
      auction: auctionId,
      dao: dao.id,
      tokenId: Number(gnarId),
      sender,
      value: value.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('GnarsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreatedEvent, Auction, Dao } = context.entities
  const { gnarId, startTimestamp, endTimestamp } = event.params

  await Dao.upsert({ id: dao.id, create: dao.body, update: dao.body })

  await AuctionCreatedEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(gnarId),
      startTime: Number(startTimestamp),
      endTime: Number(endTimestamp),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Auction.create({
    id: createStaticId('auction', dao.id, Number(gnarId)),
    data: {
      dao: dao.id,
      tokenId: Number(gnarId),
      startTime: Number(startTimestamp),
      endTime: Number(endTimestamp),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on(
  'GnarsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionMinBidIncrementPercentageUpdatedEvent } = context.entities
    const { minBidIncrementPercentage } = event.params

    await AuctionMinBidIncrementPercentageUpdatedEvent.create({
      id,
      data: {
        dao: dao.id,
        minBidIncrementPercentage: Number(minBidIncrementPercentage),
        createdAt: Number(event.block.timestamp),
      },
    })
  }
)

ponder.on(
  'GnarsAuctionHouse:AuctionReservePriceUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionReservePriceUpdatedEvent } = context.entities
    const { reservePrice } = event.params

    await AuctionReservePriceUpdatedEvent.create({
      id,
      data: {
        dao: dao.id,
        reservePrice: reservePrice.toString(),
        createdAt: Number(event.block.timestamp),
      },
    })
  }
)

ponder.on('GnarsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettledEvent, Auction } = context.entities
  const { gnarId, winner, amount } = event.params

  await AuctionSettledEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(gnarId),
      winner,
      amount: amount.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })

  const auctionId = createStaticId('auction', dao.id, Number(gnarId))

  try {
    await Auction.update({
      id: auctionId,
      data: {
        winner,
        amount: amount.toString(),
      },
    })
  } catch {
    console.error(`Unable to update Auction entity with id ${auctionId}`)
  }
})

ponder.on(
  'GnarsAuctionHouse:OwnershipTransferred',
  async ({ event, context }) => {
    const id = event.log.logId
    const { OwnershipTransferEventredEvent } = context.entities
    const { previousOwner, newOwner } = event.params

    await OwnershipTransferEventredEvent.create({
      id,
      data: {
        dao: dao.id,
        previousOwner,
        newOwner,
        createdAt: Number(event.block.timestamp),
      },
    })
  }
)

ponder.on('GnarsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { account } = event.params

  await PausedEvent.create({
    id,
    data: {
      dao: dao.id,
      account,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('GnarsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { account } = event.params

  await UnpausedEvent.create({
    id,
    data: {
      dao: dao.id,
      account,
      createdAt: Number(event.block.timestamp),
    },
  })
})
