"use client";

import React, { useState, useEffect } from "react";

import { type TokenPrices } from "@/lib/types";
import TokenPricesTable from "./dataVisualizations/tokenPricesTable";
import TokenVolumeBarChart from "./dataVisualizations/tokenVolumeBarChart";

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
      console.log("RESPONSE:", data);
      setTokensData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error("ERROR:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // call fetchTokenData immediately and then every 60 seconds.
  useEffect(() => {
    void fetchTokenData();
    const intervalId = setInterval(() => void fetchTokenData(), 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:gap-x-8">
        <TokenPricesTable tokensData={tokensData} />
        <TokenVolumeBarChart tokensData={tokensData} />
      </div>
      <span className="text-muted-foreground">
        Live ETH Token Price Data (Updated Every 10 Seconds)
      </span>
    </>
  );
};

export default Dashboard;
