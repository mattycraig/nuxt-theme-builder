import { useThemeStore } from "~/stores/theme";
import { SHARE_QUERY_KEY, buildShareUrl, decodeTheme } from "~/utils/themeShare";

/**
 * Share links: copy a URL that carries the current theme, and load a theme
 * from the `?theme=` query when someone opens one.
 */
export function useThemeShare() {
  const store = useThemeStore();
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const { copy } = useClipboard({ legacy: true });

  async function copyShareLink() {
    try {
      const url = await buildShareUrl(
        window.location.origin,
        route.path,
        store.config,
      );
      await copy(url);
      toast.add({
        title: "Share link copied",
        description: "Anyone who opens it gets this theme in the builder.",
        icon: "i-lucide-link",
        color: "success",
      });
    } catch {
      toast.add({
        title: "Couldn't create a share link",
        description: "Export the theme as JSON instead.",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  }

  /**
   * Apply the theme in `?theme=` (if any), then drop the query so a reload
   * or a copied address bar doesn't re-apply it over later edits.
   */
  async function loadSharedTheme() {
    const value = route.query[SHARE_QUERY_KEY];
    if (value === undefined) return;

    const query = Object.fromEntries(
      Object.entries(route.query).filter(([key]) => key !== SHARE_QUERY_KEY),
    );
    await router.replace({ path: route.path, query, hash: route.hash });

    const config = typeof value === "string" ? await decodeTheme(value) : null;
    if (!config) {
      toast.add({
        title: "This share link doesn't work",
        description: "It may be incomplete. Your current theme is unchanged.",
        icon: "i-lucide-circle-alert",
        color: "warning",
      });
      return;
    }

    store.loadConfig(config);
    store.activePresetName = "";
    toast.add({
      title: "Shared theme loaded",
      description: "Undo to go back to your previous theme, or save it to keep it.",
      icon: "i-lucide-check-circle",
      color: "success",
    });
  }

  return { copyShareLink, loadSharedTheme };
}
