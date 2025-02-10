import { token24HrPricesQuery } from "@/lib/queries";
import {
  topEthereumTokensMetadata,
  topEthereumTokenSymbols,
} from "@/lib/tokensData";
import { BitqueryPriceResponse } from "@/lib/types";

const { BITQUERY_ACCESS_TOKEN, BITQUERY_GRAPHQL_URL } = process.env;

export async function POST(): Promise<Response> {
  if (!BITQUERY_ACCESS_TOKEN || !BITQUERY_GRAPHQL_URL) {
    return new Response(
      JSON.stringify({ error: "Missing Bitquery Access Token or URL" }),
      { status: 500 },
    );
  }

  const yesterdayUTC = new Date(Date.now() - 86400000).toISOString(); // subtract 86400000, which is 24 hours in ms
  const queries = token24HrPricesQuery(yesterdayUTC);

  try {
    const formattedData = await Promise.all(
      queries.map(async (query, index) => {
        const response = await fetch(BITQUERY_GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BITQUERY_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          console.error("Error response from Bitquery:", response);
          throw new Error(
            `Error fetching data from Bitquery: ${response.statusText}`,
          );
        }

        const data = (await response.json()) as BitqueryPriceResponse;
        const tokenData = data.data.EVM.DEXTrades;
        if (!tokenData) return null;

        let volume = 0;
        const prices = tokenData.map((item) => {
          volume += +item.Trade.Buy.Amount; // type cast string to number
          return item.Trade.Buy.PriceInUSD ?? 0;
        });

        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const firstPrice = prices[0] ?? 0;
        const lastPrice = prices[prices.length - 1] ?? 0;
        const symbol = topEthereumTokenSymbols[index] ?? "";
        const name = topEthereumTokensMetadata[symbol]?.name ?? "";

        return {
          name: name,
          symbol: symbol,
          currPriceUSD: firstPrice,
          volatility: garmanKlassVolatility({
            high: maxPrice,
            low: minPrice,
            open: lastPrice,
            close: firstPrice,
          }),
          priceMove: lastPrice === 0 ? 0 : (firstPrice - lastPrice) / lastPrice,
          volume: volume.toFixed(3),
        };
      }),
    );

    // remove any null entries
    const result = formattedData.filter((data) => data !== null);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching and parsing Bitquery data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch and parse data" }),
      { status: 500 },
    );
  }
}

// using the Garman-Klass formula - good for a fixed trading period (https://www.algomatictrading.com/post/garman-klass-volatility)
function garmanKlassVolatility({
  high,
  low,
  open,
  close,
  timePeriod = 1,
}: {
  high: number;
  low: number;
  open: number;
  close: number;
  timePeriod?: number;
}) {
  if (high <= 0 || low <= 0 || open <= 0 || close <= 0) {
    console.error("Invalid price values");
    return 0;
  }

  const term1 = 0.5 * Math.pow(Math.log(high / low), 2);
  const term2 = (2 * Math.log(2) - 1) * Math.pow(Math.log(close / open), 2);
  const volatility = Math.sqrt((term1 - term2) / timePeriod);

  return volatility > 0 ? volatility : Number.EPSILON;
}
