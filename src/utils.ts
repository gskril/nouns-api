import { GenericContractEvent } from './types'

export function estimateTimestampFromBlock(
  startTime: number,
  currentBlock: number,
  futureBlock: number
) {
  const blockTime = 12
  const blockDifference = futureBlock - currentBlock
  const timeBetweenBlocks = blockDifference * blockTime
  return startTime + timeBetweenBlocks
}

export function estimateProposalTimestamps(
  event: GenericContractEvent,
  startBlock: BigInt,
  endBlock: BigInt
): { voteStart: number; voteEnd: number } {
  const voteStart = estimateTimestampFromBlock(
    Number(event.block.timestamp),
    Number(event.block.number),
    Number(startBlock)
  )

  const voteEnd = estimateTimestampFromBlock(
    voteStart,
    Number(startBlock),
    Number(endBlock)
  )

  return { voteStart, voteEnd }
}

export function createStaticId(
  medium: 'proposal' | 'token' | 'auction',
  daoId: string,
  identifier: number
) {
  return `${daoId}-${medium}-${identifier}`
}
