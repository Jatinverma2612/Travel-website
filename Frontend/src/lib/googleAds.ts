"use client";

/**
 * Fires a Google Ads conversion event safely.
 * Only executes on the client side when window.gtag is initialized.
 */
export const trackGoogleConversion = (): void => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-18065109162/sTVICLuEkMQcEKrhjqZD",
    });
  }
};
