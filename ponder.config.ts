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
    {
      name: 'NounsToken',
      network: 'mainnet',
      abi: './abis/Nouns/NounsToken.json',
      address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
      startBlock: 12985438,
    },
    {
      name: 'NounsDAO',
      network: 'mainnet',
      abi: './abis/Nouns/NounsDAO.json',
      address: '0x6f3e6272a167e8accb32072d08e0957f9c79223d',
      startBlock: 12985453,
    },
    {
      name: 'LilNounsAuctionHouse',
      network: 'mainnet',
      abi: './abis/LilNouns/LilNounsAuctionHouse.json',
      address: '0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e',
      startBlock: 14736713,
    },
    {
      name: 'LilNounsToken',
      network: 'mainnet',
      abi: './abis/LilNouns/LilNounsToken.json',
      address: '0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b',
      startBlock: 14736710,
    },
    {
      name: 'LilNounsDAO',
      network: 'mainnet',
      abi: './abis/Nouns/NounsDAO.json',
      address: '0x5d2c31ce16924c2a71d317e5bbfd5ce387854039',
      startBlock: 14736719,
    },
    {
      name: 'GnarsAuctionHouse',
      network: 'mainnet',
      abi: './abis/Gnars/auctionHouse.json',
      address: '0xc28e0d3c00296dd8c5c3f2e9707361920f92a209',
      startBlock: 14998513,
    },
    {
      name: 'GnarsToken',
      network: 'mainnet',
      abi: './abis/Gnars/token.json',
      address: '0x558BFFF0D583416f7C4e380625c7865821b8E95C',
      startBlock: 14998510,
    },
  ],
}
