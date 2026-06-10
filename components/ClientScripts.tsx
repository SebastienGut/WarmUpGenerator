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
      {/* Mesure la boucle de rétention PWA : événement custom GoatCounter à l'installation */}
      <Script id="pwa-install-tracking" strategy="afterInteractive">
        {`window.addEventListener('appinstalled', function () {
          if (window.goatcounter && window.goatcounter.count) {
            window.goatcounter.count({ path: 'pwa-installed', title: 'PWA installee', event: true });
          }
        });`}
      </Script>
    </>
  );
}
