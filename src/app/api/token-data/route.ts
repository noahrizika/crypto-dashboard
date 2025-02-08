import { token24HrPricesQuery } from "@/lib/queries";
import {
  topEthereumTokensMetadata,
  topEthereumTokenSymbols,
} from "@/lib/tokensData";
import { type TokenPrices, type BitqueryPriceResponse } from "@/lib/types";

const { BITQUERY_ACCESS_TOKEN, BITQUERY_GRAPHQL_URL } = process.env;

export async function POST(): Promise<Response> {
  if (!BITQUERY_ACCESS_TOKEN || !BITQUERY_GRAPHQL_URL) {
    console.error("Missing Bitquery Access Token or URL");
    return new Response(
      JSON.stringify({ error: "Missing Bitquery Access Token or URL" }),
      { status: 500 },
    );
  }

  const yesterdayUTC = new Date(Date.now() - 86400000).toISOString();
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

        const prices = tokenData.map(
          (item) => item?.Trade?.Buy?.PriceInUSD || 0,
        );
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const firstPrice = prices[0] ?? 0;
        const lastPrice = prices[prices.length - 1] ?? 0;
        const numBuys = prices.length;
        const symbol = topEthereumTokenSymbols[index] ?? "";
        const name = topEthereumTokensMetadata[symbol]?.name ?? "";

        return {
          name: name,
          symbol: symbol,
          currPriceUSD: firstPrice,
          volatility: (maxPrice - minPrice) * 100,
          priceMove: lastPrice === 0 ? 0 : (firstPrice - lastPrice) / lastPrice,
          volume: numBuys,
        };
      }),
    );

    // remove any null entries
    const result = formattedData.filter(
      (item): item is TokenPrices => item !== null,
    );

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
