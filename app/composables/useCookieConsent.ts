import { isInIframe } from "~/utils/helpers";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

/**
 * Whether the consent toast should be shown. Exported for direct unit testing.
 *
 * The editor already shows the notice, so the preview iframe never does. This
 * checks for the iframe rather than the `?preview` query: demo routes are
 * prerendered, and the iframe first hydrates the route without its query.
 */
export function shouldShowConsentToast(): boolean {
  if (isInIframe()) return false;
  return !localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
}

/**
 * Builds the toast configuration object for the consent notice.
 * Exported for direct unit testing of the configuration shape.
 */
export function buildConsentToastConfig(
  onAccept: () => void,
  onPrivacy: () => void,
) {
  return {
    title: "Cookie & Storage Notice",
    description:
      "This site uses localStorage and a cookie to save your preferences (theme, color mode). No tracking cookies are used.",
    icon: "i-lucide-shield-check",
    color: "neutral" as const,
    duration: 0,
    close: false,
    actions: [
      {
        label: "Accept",
        color: "primary" as const,
        variant: "solid" as const,
        onClick: onAccept,
      },
      {
        label: "Privacy Policy",
        color: "neutral" as const,
        variant: "ghost" as const,
        onClick: onPrivacy,
      },
    ],
  };
}

/**
 * Show a one-time cookie/storage consent notice as a persistent toast.
 *
 * On first mount, if the user has not yet accepted, a toast is displayed
 * with "Accept" and "Privacy Policy" actions. Acceptance is persisted
 * to localStorage so the notice is not shown again.
 */
export function useCookieConsent() {
  if (import.meta.server) return;

  onMounted(() => {
    if (!shouldShowConsentToast()) return;

    const toast = useToast();

    toast.add(
      buildConsentToastConfig(
        () => {
          localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
        },
        () => {
          navigateTo("/privacy");
        },
      ),
    );
  });
}
