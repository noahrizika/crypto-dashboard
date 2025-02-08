import { topEthereumTokensMetadata } from "@/lib/tokensData";

// make an array of complete queries for each token
export const token24HrPricesQuery = (yesterdayUTC: string) => {
  return Object.values(topEthereumTokensMetadata).map(
    (token) =>
      `query {
            EVM(dataset: combined) {
              DEXTrades(
                orderBy: {descending: Block_Time}
                where: {Trade: {Success: true, Buy: {Currency: {SmartContract: {is: "${token.smartContract}"}}, PriceInUSD: {gt: 0}}}, Block: {Time: {after: "${yesterdayUTC}"}}}
              ) {
                Trade {
                  Buy {
                    PriceInUSD
                  }
                }
              }
            }
          }`,
  );
};
