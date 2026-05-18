"use client";
import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
      <Script id="sw-register" strategy="afterInteractive">
        {`if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(() => {}); }`}
      </Script>
      <Script
        data-goatcounter="https://warmuptrack.goatcounter.com/count"
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
    </>
  );
}
