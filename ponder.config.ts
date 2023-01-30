import type { PonderConfig } from '@ponder/core'
import { graphqlPlugin } from '@ponder/graphql'

export const config: PonderConfig = {
  plugins: [graphqlPlugin()],
  networks: [
    { name: 'mainnet', chainId: 1, rpcUrl: process.env.PONDER_RPC_URL_1 },
  ],
  contracts: [
    {
      name: 'NounsAuctionHouse',
      network: 'mainnet',
      abi: './abis/Nouns/NounsAuctionHouse.json',
      address: '0x830bd73e4184cef73443c15111a1df14e495c706',
      startBlock: 12985451,
    },
  ],
}
