const STORAGE_KEY = "cookie-consent";

export function useCookieConsent() {
  if (import.meta.server) return;

  onMounted(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

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
            localStorage.setItem(STORAGE_KEY, "accepted");
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
