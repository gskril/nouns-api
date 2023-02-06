import { dao } from './'
import { ponder } from '../../generated'

ponder.on('NounsAuctionHouse:AuctionBidEvent', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBidEvent, Dao } = context.entities
  const { nounId, sender, value, extended } = event.params

  await Dao.upsert(dao.id, dao.body)

  await AuctionBidEvent.insert(id, {
    dao: dao.id,
    tokenId: Number(nounId),
    sender,
    value: value.toString(),
    extended,
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'NounsAuctionHouse:AuctionCreatedEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionCreatedEvent } = context.entities
    const { nounId, startTime, endTime } = event.params

    await AuctionCreatedEvent.insert(id, {
      dao: dao.id,
      tokenId: Number(nounId),
      startTime: Number(startTime),
      endTime: Number(endTime),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionExtendedEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionExtendedEvent } = context.entities
    const { nounId, endTime } = event.params

    await AuctionExtendedEvent.insert(id, {
      dao: dao.id,
      tokenId: Number(nounId),
      endTime: Number(endTime),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionMinBidIncrementPercentageUpdatedEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionMinBidIncrementPercentageUpdatedEvent } = context.entities
    const { minBidIncrementPercentage } = event.params

    await AuctionMinBidIncrementPercentageUpdatedEvent.insert(id, {
      dao: dao.id,
      minBidIncrementPercentage: Number(minBidIncrementPercentage),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionReservePriceUpdatedEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionReservePriceUpdatedEvent } = context.entities
    const { reservePrice } = event.params

    await AuctionReservePriceUpdatedEvent.insert(id, {
      dao: dao.id,
      reservePrice: reservePrice.toString(),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionSettledEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionSettledEvent } = context.entities
    const { nounId, winner, amount } = event.params

    await AuctionSettledEvent.insert(id, {
      dao: dao.id,
      tokenId: Number(nounId),
      winner,
      amount: amount.toString(),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionTimeBufferUpdatedEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionTimeBufferUpdatedEvent } = context.entities
    const { timeBuffer } = event.params

    await AuctionTimeBufferUpdatedEvent.insert(id, {
      dao: dao.id,
      timeBuffer: Number(timeBuffer),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:OwnershipTransferEventredEvent',
  async ({ event, context }) => {
    const id = event.log.logId
    const { OwnershipTransferEventredEvent } = context.entities
    const { previousOwner, newOwner } = event.params

    await OwnershipTransferEventredEvent.insert(id, {
      dao: dao.id,
      previousOwner,
      newOwner,
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('NounsAuctionHouse:PausedEvent', async ({ event, context }) => {
  const id = event.log.logId
  const { PausedEvent } = context.entities
  const { account } = event.params

  await PausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsAuctionHouse:UnpausedEvent', async ({ event, context }) => {
  const id = event.log.logId
  const { UnpausedEvent } = context.entities
  const { account } = event.params

  await UnpausedEvent.insert(id, {
    dao: dao.id,
    account,
    createdAt: event.block.timestamp,
  })
})
