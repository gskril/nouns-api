import { dao } from '.'
import { ponder } from '../../generated'

ponder.on('GnarsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBid, Dao } = context.entities
  const { gnarId, sender, value } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionBid.insert(id, {
    dao: dao.id,
    tokenId: Number(gnarId),
    sender,
    value: value.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on('GnarsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreated } = context.entities
  const { gnarId, startTimestamp, endTimestamp } = event.params

  await AuctionCreated.insert(id, {
    dao: dao.id,
    tokenId: Number(gnarId),
    startTime: Number(startTimestamp),
    endTime: Number(endTimestamp),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'GnarsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
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
  'GnarsAuctionHouse:AuctionReservePriceUpdated',
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

ponder.on('GnarsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettled } = context.entities
  const { gnarId, winner, amount } = event.params

  await AuctionSettled.insert(id, {
    dao: dao.id,
    tokenId: Number(gnarId),
    winner,
    amount: amount.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'GnarsAuctionHouse:OwnershipTransferred',
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

ponder.on('GnarsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { Paused } = context.entities
  const { account } = event.params

  await Paused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})

ponder.on('GnarsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { Unpaused } = context.entities
  const { account } = event.params

  await Unpaused.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})
