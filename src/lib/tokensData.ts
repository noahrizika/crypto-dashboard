import { TokenMetadata } from "@/lib/types";

export const topEthereumTokensMetadata: Record<string, TokenMetadata> = {
  WETH: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    smartContract: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    smartContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    smartContract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    smartContract: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  DAI: {
    name: "Dai",
    symbol: "DAI",
    smartContract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  MATIC: {
    name: "Polygon",
    symbol: "MATIC",
    smartContract: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  },
  SHIB: {
    name: "Shiba Inu",
    symbol: "SHIB",
    smartContract: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  },
  STETH: {
    name: "Lido Staked Ether",
    symbol: "stETH",
    smartContract: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  },
};

export const topEthereumTokenSymbols = Object.keys(topEthereumTokensMetadata);
