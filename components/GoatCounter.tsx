"use client";
import Script from "next/script";

export default function GoatCounter() {
  return (
    <Script
      data-goatcounter="https://warmuptrack.goatcounter.com/count"
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
