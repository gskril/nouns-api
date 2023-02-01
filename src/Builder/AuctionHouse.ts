import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('BuilderAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBid, Dao } = context.entities
  const { tokenId, bidder, amount, extended } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionBid.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    sender: bidder,
    value: amount.toString(),
    extended,
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreated } = context.entities
  const { tokenId, startTime, endTime } = event.params

  await AuctionCreated.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'BuilderAuctionHouse:MinBidIncrementPercentageUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionMinBidIncrementPercentageUpdated } = context.entities
    const { minBidIncrementPercentage } = event.params

    await AuctionMinBidIncrementPercentageUpdated.insert(id, {
      dao: dao.id,
      minBidIncrementPercentage: Number(minBidIncrementPercentage),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'BuilderAuctionHouse:ReservePriceUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionReservePriceUpdated } = context.entities
    const { reservePrice } = event.params

    await AuctionReservePriceUpdated.insert(id, {
      dao: dao.id,
      reservePrice: reservePrice.toString(),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('BuilderAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettled } = context.entities
  const { tokenId, winner, amount } = event.params

  await AuctionSettled.insert(id, {
    dao: dao.id,
    tokenId: Number(tokenId),
    winner,
    amount: amount.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'BuilderAuctionHouse:TimeBufferUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionTimeBufferUpdated } = context.entities
    const { timeBuffer } = event.params

    await AuctionTimeBufferUpdated.insert(id, {
      dao: dao.id,
      timeBuffer: Number(timeBuffer),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('BuilderAuctionHouse:OwnerUpdated', async ({ event, context }) => {
  const id = event.log.logId
  const { OwnershipTransferred } = context.entities
  const { prevOwner: previousOwner, newOwner } = event.params

  await OwnershipTransferred.insert(id, {
    dao: dao.id,
    previousOwner,
    newOwner,
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { Paused } = context.entities
  const { user: account } = event.params

  await Paused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})

ponder.on('BuilderAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { Unpaused } = context.entities
  const { user: account } = event.params

  await Unpaused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})
