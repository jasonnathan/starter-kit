import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./contexts/appContext";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_URL || "";
const isProd = process.env.NEXT_PUBLIC_MODE === "production";

export const useAnalytics = () => {
  const { publication, post, series, page } = useAppContext();
  const { gaTrackingID, gTagManagerID } = publication.integrations ?? {};
  /**
   * Function to track custom events
   * - Usage: trackEvent("button_click", { buttonName: "Subscribe" })
   */
  const trackEvent = useCallback((eventType: string, properties: Record<string, any> = {}) => {
    if (!isProd) return;

    let deviceId = Cookies.get("__amplitudeDeviceID");
    if (!deviceId) {
      deviceId = uuidv4();
      Cookies.set("__amplitudeDeviceID", deviceId, { expires: 365 * 2 });
    }

    const event = {
      event_type: eventType,
      time: new Date().getTime(),
      event_properties: {
        hostname: window.location.hostname,
        ...properties,
      },
      device_id: deviceId,
    };

    fetch(`${BASE_PATH}/ping/data-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: [event] }),
    });

    console.log(`Analytics event sent: ${eventType}`, event);
  }, []);

  /**
   * Sends pageview analytics to Hashnode's "Advanced Analytics Dashboard"
   */
  const sendAdvancedAnalytics = useCallback(() => {
    if (!publication.id) {
      console.warn("Publication ID is missing; could not send advanced analytics.");
      return;
    }

    if (window.location.hostname === "localhost") {
      console.warn("Analytics API call skipped on localhost.");
      return;
    }

    const payload = {
      publicationId: publication.id,
      postId: post?.id || null,
      seriesId: series?.id || post?.series?.id || null,
      pageId: page?.id || null,
      url: window.location.href,
      referrer: document.referrer || null,
      language: navigator.language || null,
      screen: `${window.screen.width}x${window.screen.height}`,
    };

    const event = { type: "pageview", payload };

    const blob = new Blob([JSON.stringify({ events: [event] })], {
      type: "application/json; charset=UTF-8",
    });

    let hasSentBeacon = false;
    try {
      if (navigator.sendBeacon) {
        hasSentBeacon = navigator.sendBeacon(`${BASE_PATH}/api/analytics`, blob);
      }
    } catch (error) {
      console.error("Error using sendBeacon:", error);
    }

    if (!hasSentBeacon) {
      fetch(`${BASE_PATH}/api/analytics`, {
        method: "POST",
        body: blob,
        credentials: "omit",
        keepalive: true,
      });
    }

    console.log("Advanced analytics event sent:", event);
  }, [publication, post, series, page]);

	useEffect(() => {
    if (!isProd) {
      console.warn("Analytics disabled: Not in production mode.");
      return;
    }

    if (!gaTrackingID && !gTagManagerID) {
      console.warn("Google Analytics / GTM not configured. Skipping analytics.");
      return;
    }

    // ✅ Avoid counting page reloads from same IP (optional)
    const isSameIPReload = sessionStorage.getItem("lastPageview") === window.location.pathname;
    if (isSameIPReload) {
      console.warn("Duplicate pageview detected. Skipping tracking.");
      return;
    }
    sessionStorage.setItem("lastPageview", window.location.pathname);

    // ✅ Send pageview to Hashnode Google Analytics (GA4)
    if (gaTrackingID && typeof window.gtag === "function") {
      window.gtag("config", gaTrackingID, {
        transport_url: "https://ping.hashnode.com",
        first_party_collection: true,
      });
    }

    // ✅ Send pageview to Hashnode’s internal analytics API
    trackEvent("pageview", { url: window.location.pathname });

    // ✅ Send advanced analytics (screen size, language, referrer, etc.)
    sendAdvancedAnalytics();

  }, [gaTrackingID, gTagManagerID, trackEvent, sendAdvancedAnalytics]);

  return { trackEvent };
};
