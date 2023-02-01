import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('LilNounsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBid, Dao } = context.entities
  const { nounId, sender, value, extended } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionBid.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    sender,
    value: value.toString(),
    extended,
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreated } = context.entities
  const { nounId, startTime, endTime } = event.params

  await AuctionCreated.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'LilNounsAuctionHouse:AuctionExtended',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionExtended } = context.entities
    const { nounId, endTime } = event.params

    await AuctionExtended.insert(id, {
      dao: dao.id,
      tokenId: Number(nounId),
      endTime: Number(endTime),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'LilNounsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
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
  'LilNounsAuctionHouse:AuctionReservePriceUpdated',
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

ponder.on('LilNounsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettled } = context.entities
  const { nounId, winner, amount } = event.params

  await AuctionSettled.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    winner,
    amount: amount.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'LilNounsAuctionHouse:AuctionTimeBufferUpdated',
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

ponder.on(
  'LilNounsAuctionHouse:OwnershipTransferred',
  async ({ event, context }) => {
    const id = event.log.logId
    const { OwnershipTransferred } = context.entities
    const { previousOwner, newOwner } = event.params

    await OwnershipTransferred.insert(id, {
      dao: dao.id,
      previousOwner,
      newOwner,
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('LilNounsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { Paused } = context.entities
  const { account } = event.params

  await Paused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})

ponder.on('LilNounsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { Unpaused } = context.entities
  const { account } = event.params

  await Unpaused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})
