import { Block, Log, Transaction } from '@ponder/core'

export type DAO = {
  id: string
  body: {
    name: string
    symbol: string
  }
}

export type GenericContractEvent = {
  name: string
  log: Log
  block: Block
  transaction: Transaction
}
