"use client";

import React, { useState, useEffect } from "react";

import { type TokenPrices } from "@/lib/types";
import TokenPricesTable from "./dataVisualizations/tokenPricesTable";
import TokenVolatilityBarChart from "./dataVisualizations/tokenVolatilityBarChart";

const Dashboard = () => {
  const [tokensData, setTokensData] = useState<TokenPrices[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchTokenData() {
    try {
      const response = await fetch("/api/token-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: TokenPrices[] = await response.json();
      setTokensData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error("error fetching token data:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // call fetchTokenData immediately and then every 6 seconds.
  useEffect(() => {
    void fetchTokenData();
    const intervalId = setInterval(() => void fetchTokenData(), 6000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:gap-x-8">
        <TokenPricesTable tokensData={tokensData} />
        <TokenVolatilityBarChart tokensData={tokensData} />
      </div>
      <span className="text-muted-foreground">
        Live ETH Token Price Data on the Latest 24 Hour Period (Updated Every 6
        Seconds)
      </span>
    </>
  );
};

export default Dashboard;
