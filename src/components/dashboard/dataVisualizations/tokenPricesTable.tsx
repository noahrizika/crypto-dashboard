"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type TokenPrices } from "@/lib/types";

export default function TokenPricesTable({
  tokensData,
}: {
  tokensData: TokenPrices[];
}) {
  return (
    <div>
      <Table className="w-[400px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Volatility</TableHead>
            <TableHead>Price Move</TableHead>
            <TableHead className="text-right">Price (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokensData.map((token, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{token.symbol}</TableCell>
              <TableCell>{token.name}</TableCell>
              <TableCell>{Math.round(token.volatility) + "%"}</TableCell>
              <TableCell>{token.priceMove.toFixed(5) + "%"}</TableCell>
              <TableCell className="text-right">
                {token.currPriceUSD.toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
