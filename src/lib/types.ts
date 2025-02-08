export interface BitqueryPriceResponse {
  data: {
    EVM: Record<
      string,
      Array<{
        Trade: {
          Buy: {
            Currency: {
              Name: string;
              Symbol: string;
            };
            PriceInUSD: number;
          };
        };
      }>
    >;
  };
}

export interface TokenPrices {
  name: string;
  symbol: string;
  currPriceUSD: number;
  volatility: number;
  priceMove: number;
  volume: number;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  smartContract: string;
}
