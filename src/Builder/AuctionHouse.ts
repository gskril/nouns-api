import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent, Auction } = context.entities
  const { tokenId, bidder, amount, extended } = event.params

  const auctionId = createStaticId('auction', dao.id, Number(tokenId))

  await AuctionBidEvent.insert(id, {
    auction: auctionId,
    dao: dao.id,
    tokenId: Number(tokenId),
    sender: bidder,
    value: amount.toString(),
    extended,
    createdAt: Number(event.block.timestamp),
  })

  if (extended) {
    await Auction.update(auctionId, {
      extended: true,
    }).catch(() => {
      console.log(`Unable to update Auction entity with id ${auctionId}`)
    })
  }
})

ponder.on('BuilderAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreatedEvent, Auction, Dao } = context.entities
  const { tokenId, startTime, endTime } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionCreatedEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: Number(event.block.timestamp),
  })

  await Auction.insert(createStaticId('auction', dao.id, Number(tokenId)), {
    dao: dao.id,
    tokenId: Number(tokenId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on(
  'BuilderAuctionHouse:MinBidIncrementPercentageUpdated',
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
  'BuilderAuctionHouse:ReservePriceUpdated',
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

ponder.on('BuilderAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettledEvent, Auction } = context.entities
  const { tokenId, winner, amount } = event.params

  await AuctionSettledEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    winner,
    amount: amount.toString(),
    createdAt: Number(event.block.timestamp),
  })

  await Auction.update(createStaticId('auction', dao.id, Number(tokenId)), {
    winner,
    amount: amount.toString(),
  })
})

ponder.on(
  'BuilderAuctionHouse:TimeBufferUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionTimeBufferUpdatedEvent } = context.entities
    const { timeBuffer } = event.params

    await AuctionTimeBufferUpdatedEvent.insert(id, {
      dao: dao.id,
      timeBuffer: Number(timeBuffer),
      createdAt: Number(event.block.timestamp),
    })
  }
)

ponder.on('BuilderAuctionHouse:OwnerUpdated', async ({ event, context }) => {
  const id = event.log.logId
  const { OwnershipTransferEventredEvent } = context.entities
  const { prevOwner: previousOwner, newOwner } = event.params

  await OwnershipTransferEventredEvent.insert(id, {
    dao: dao.id,
    previousOwner,
    newOwner,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { user: account } = event.params

  await PausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('BuilderAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { user: account } = event.params

  await UnpausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})
