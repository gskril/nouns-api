import { ponder } from '../../generated'

ponder.on('NounsAuctionHouse:AuctionBid', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionBid } = context.entities
  const { nounId, sender, value, extended } = event.params

  await AuctionBid.insert(id, {
    nft: Number(nounId),
    dao: 'Nouns',
    sender,
    value: value.toString(),
    extended,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsAuctionHouse:AuctionCreated', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionCreated } = context.entities
  const { nounId, startTime, endTime } = event.params

  await AuctionCreated.insert(id, {
    nft: Number(nounId),
    dao: 'Nouns',
    startTime: Number(startTime),
    endTime: Number(endTime),
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsAuctionHouse:AuctionExtended', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionExtended } = context.entities
  const { nounId, endTime } = event.params

  await AuctionExtended.insert(id, {
    nft: Number(nounId),
    dao: 'Nouns',
    endTime: Number(endTime),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'NounsAuctionHouse:AuctionMinBidIncrementPercentageUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionMinBidIncrementPercentageUpdated } = context.entities
    const { minBidIncrementPercentage } = event.params

    await AuctionMinBidIncrementPercentageUpdated.insert(id, {
      dao: 'Nouns',
      minBidIncrementPercentage: Number(minBidIncrementPercentage),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:AuctionReservePriceUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionReservePriceUpdated } = context.entities
    const { reservePrice } = event.params

    await AuctionReservePriceUpdated.insert(id, {
      dao: 'Nouns',
      reservePrice: reservePrice.toString(),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('NounsAuctionHouse:AuctionSettled', async ({ event, context }) => {
  const id = event.log.logId
  const { AuctionSettled } = context.entities
  const { nounId, winner, amount } = event.params

  await AuctionSettled.insert(id, {
    nft: Number(nounId),
    dao: 'Nouns',
    winner,
    amount: amount.toString(),
    createdAt: event.block.timestamp,
  })
})

ponder.on(
  'NounsAuctionHouse:AuctionTimeBufferUpdated',
  async ({ event, context }) => {
    const id = event.log.logId
    const { AuctionTimeBufferUpdated } = context.entities
    const { timeBuffer } = event.params

    await AuctionTimeBufferUpdated.insert(id, {
      dao: 'Nouns',
      timeBuffer: Number(timeBuffer),
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on(
  'NounsAuctionHouse:OwnershipTransferred',
  async ({ event, context }) => {
    const id = event.log.logId
    const { OwnershipTransferred } = context.entities
    const { previousOwner, newOwner } = event.params

    await OwnershipTransferred.insert(id, {
      dao: 'Nouns',
      previousOwner,
      newOwner,
      createdAt: event.block.timestamp,
    })
  }
)

ponder.on('NounsAuctionHouse:Paused', async ({ event, context }) => {
  const id = event.log.logId
  const { Paused } = context.entities
  const { account } = event.params

  await Paused.insert(id, {
    dao: 'Nouns',
    account,
    createdAt: event.block.timestamp,
  })
})

ponder.on('NounsAuctionHouse:Unpaused', async ({ event, context }) => {
  const id = event.log.logId
  const { Unpaused } = context.entities
  const { account } = event.params

  await Unpaused.insert(id, {
    dao: 'Nouns',
    account,
    createdAt: event.block.timestamp,
  })
})
