import { createStaticId } from '../utils'
import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('LilNounsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent, Auction } = context.entities
  const { nounId, sender, value, extended } = event.params

  const auctionId = createStaticId('auction', dao.id, Number(nounId))

  await AuctionBidEvent.insert(id, {
    auction: auctionId,
    dao: dao.id,
    tokenId: Number(nounId),
    sender,
    value: value.toString(),
    extended,
    createdAt: Number(event.block.timestamp),
  })

  if (extended) {
    try {
      await Auction.update(auctionId, {
        extended: true,
      })
    } catch {
      console.error(`Unable to update Auction entity with id ${auctionId}`)
    }
  }
})

ponder.on('LilNounsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreatedEvent, Auction, Dao } = context.entities
  const { nounId, startTime, endTime } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionCreatedEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: Number(event.block.timestamp),
  })

  await Auction.insert(createStaticId('auction', dao.id, Number(nounId)), {
    dao: dao.id,
    tokenId: Number(nounId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on(
  'LilNounsAuctionHouse:AuctionExtended',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionExtendedEvent } = context.entities
    const { nounId, endTime } = event.params

    await AuctionExtendedEvent.insert(id, {
      dao: dao.id,
      tokenId: Number(nounId),
      endTime: Number(endTime),
      createdAt: Number(event.block.timestamp),
    })
  }
)

ponder.on(
  'LilNounsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
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
  'LilNounsAuctionHouse:AuctionReservePriceUpdated',
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

ponder.on('LilNounsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettledEvent, Auction } = context.entities
  const { nounId, winner, amount } = event.params

  await AuctionSettledEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    winner,
    amount: amount.toString(),
    createdAt: Number(event.block.timestamp),
  })

  const auctionId = createStaticId('auction', dao.id, Number(nounId))

  try {
    await Auction.update(auctionId, {
      winner,
      amount: amount.toString(),
    })
  } catch {
    console.error(`Unable to update Auction entity with id ${auctionId}`)
  }
})

ponder.on(
  'LilNounsAuctionHouse:AuctionTimeBufferUpdated',
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

ponder.on(
  'LilNounsAuctionHouse:OwnershipTransferred',
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

ponder.on('LilNounsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { account } = event.params

  await PausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})

ponder.on('LilNounsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { account } = event.params

  await UnpausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: Number(event.block.timestamp),
  })
})
