import { BigNumber } from 'ethers'
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
  startBlock: BigNumber,
  endBlock: BigNumber
): { voteStart: number; voteEnd: number } {
  const voteStart = estimateTimestampFromBlock(
    event.block.timestamp,
    event.block.number,
    Number(startBlock)
  )

  const voteEnd = estimateTimestampFromBlock(
    voteStart,
    Number(startBlock),
    Number(endBlock)
  )

  return { voteStart, voteEnd }
}
