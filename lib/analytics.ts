// Google Analytics / GTM Event Tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  }
};

// Navigation events
export const trackNavigation = (destination: string, source: string = "header") => {
  trackEvent("navigation_click", {
    destination,
    source,
    event_category: "navigation",
    event_label: destination,
  });
};

// Tool access events
export const trackToolAccess = (toolName: string) => {
  trackEvent("tool_access", {
    tool_name: toolName,
    event_category: "tools",
    event_label: toolName,
  });
};

// Donation button click
export const trackDonationClick = () => {
  trackEvent("donation_click", {
    button_location: "floating",
    event_category: "engagement",
    event_label: "buy_me_coffee",
  });
};

// Pro features events
export const trackProFeatureAccess = (featureName: string) => {
  trackEvent("pro_feature_access", {
    feature_name: featureName,
    event_category: "pro_tools",
    event_label: featureName,
  });
};

export const trackProPaymentIntent = () => {
  trackEvent("pro_payment_intent", {
    event_category: "conversion",
    event_label: "pro_checkout_started",
  });
};
