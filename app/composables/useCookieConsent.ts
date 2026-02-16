const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

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
    if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)) return;

    const toast = useToast();

    toast.add({
      title: "Cookie & Storage Notice",
      description:
        "This site uses localStorage and a cookie to save your preferences (theme, color mode). No tracking cookies are used.",
      icon: "i-lucide-shield-check",
      color: "neutral",
      duration: 0,
      close: false,
      actions: [
        {
          label: "Accept",
          color: "primary",
          variant: "solid",
          onClick: () => {
            localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
          },
        },
        {
          label: "Privacy Policy",
          color: "neutral",
          variant: "ghost",
          onClick: () => {
            navigateTo("/privacy");
          },
        },
      ],
    });
  });
}
