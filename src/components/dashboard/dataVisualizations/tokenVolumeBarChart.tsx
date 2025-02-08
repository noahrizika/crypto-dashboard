"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { CardContent, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { type TokenPrices } from "@/lib/types";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ffffff",
  },
} satisfies ChartConfig;

export default function TokenVolumeBarChart({
  tokensData,
}: {
  tokensData: TokenPrices[];
}) {
  const chartData = tokensData.map((token) => ({
    symbol: token.symbol,
    volume: token.volume,
  }));

  return (
    <CardContent>
      <CardTitle className="text-center font-normal text-muted-foreground">
        Token Volume (24 Hrs)
      </CardTitle>
      <ChartContainer config={chartConfig}>
        <BarChart
          width={600}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="symbol"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
            label={{
              value: "Number of Trades",
              angle: -90,
              position: "insideLeft",
              offset: -10,
              style: {
                fill: "gray",
                fontSize: 12,
                textAnchor: "middle",
              },
            }}
          />

          <Bar dataKey="volume" fill="#82ca9d" radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="volume"
              position="top"
              className="fill-muted-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  );
}
