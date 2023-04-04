import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent, Auction } = context.entities
  const { tokenId, bidder, amount, extended } = event.params

  const auctionId = createStaticId('auction', dao.id, Number(tokenId))

  await AuctionBidEvent.create({
    id,
    data: {
      auction: auctionId,
      dao: dao.id,
      tokenId: Number(tokenId),
      sender: bidder,
      value: amount.toString(),
      extended,
      createdAt: Number(event.block.timestamp),
    },
  })

  if (extended) {
    try {
      await Auction.update({
        id: auctionId,
        data: {
          extended: true,
        },
      })
    } catch {
      console.error(`Unable to update Auction entity with id ${auctionId}`)
    }
  }
})

ponder.on('BuilderAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreatedEvent, Auction, Dao } = context.entities
  const { tokenId, startTime, endTime } = event.params

  await Dao.upsert({ id: dao.id, create: dao.body, update: dao.body })

  await AuctionCreatedEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(tokenId),
      startTime: Number(startTime),
      endTime: Number(endTime),
      createdAt: Number(event.block.timestamp),
    },
  })

  await Auction.create({
    id: createStaticId('auction', dao.id, Number(tokenId)),
    data: {
      dao: dao.id,
      tokenId: Number(tokenId),
      startTime: Number(startTime),
      endTime: Number(endTime),
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on(
  'BuilderAuctionHouse:MinBidIncrementPercentageUpdated',
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
  'BuilderAuctionHouse:ReservePriceUpdated',
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

ponder.on('BuilderAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettledEvent, Auction } = context.entities
  const { tokenId, winner, amount } = event.params

  await AuctionSettledEvent.create({
    id,
    data: {
      dao: dao.id,
      tokenId: Number(tokenId),
      winner,
      amount: amount.toString(),
      createdAt: Number(event.block.timestamp),
    },
  })

  const auctionId = createStaticId('auction', dao.id, Number(tokenId))

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
  'BuilderAuctionHouse:TimeBufferUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionTimeBufferUpdatedEvent } = context.entities
    const { timeBuffer } = event.params

    await AuctionTimeBufferUpdatedEvent.create({
      id,
      data: {
        dao: dao.id,
        timeBuffer: Number(timeBuffer),
        createdAt: Number(event.block.timestamp),
      },
    })
  }
)

ponder.on('BuilderAuctionHouse:OwnerUpdated', async ({ event, context }) => {
  const id = event.log.logId
  const { OwnershipTransferEventredEvent } = context.entities
  const { prevOwner: previousOwner, newOwner } = event.params

  await OwnershipTransferEventredEvent.create({
    id,
    data: {
      dao: dao.id,
      previousOwner,
      newOwner,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('BuilderAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { user: account } = event.params

  await PausedEvent.create({
    id,
    data: {
      dao: dao.id,
      account,
      createdAt: Number(event.block.timestamp),
    },
  })
})

ponder.on('BuilderAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { user: account } = event.params

  await UnpausedEvent.create({
    id,
    data: {
      dao: dao.id,
      account,
      createdAt: Number(event.block.timestamp),
    },
  })
})
