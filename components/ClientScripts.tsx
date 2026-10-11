"use client";
import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
      {/* En dev, les chunks gardent le même nom d'un build à l'autre : le cache
          « cache d'abord » du service worker figerait l'application. */}
      <Script id="sw-register" strategy="afterInteractive">
        {process.env.NODE_ENV === "production"
          ? `if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(() => {}); }`
          : `if ('serviceWorker' in navigator) { navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister(); }); }); }`}
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
