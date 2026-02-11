import {
  NAVIGATION_ITEMS,
  UTILITY_NAV_ITEMS,
  flattenNavigationItems,
} from "~/utils/navigation";

/**
 * Shared navigation computeds derived from the current route and NAVIGATION_ITEMS.
 *
 * Safe to call from multiple components — `useRoute()` returns the same
 * global reactive object, so all computed values stay in sync.
 */
export function useLayoutNavigation() {
  const route = useRoute();

  const allNavItems = computed(() => [
    ...flattenNavigationItems(NAVIGATION_ITEMS),
    ...UTILITY_NAV_ITEMS.map((item) => ({
      label: item.label ?? "",
      icon: item.icon as string | undefined,
      to: item.to ? String(item.to) : undefined,
    })),
  ]);

  const currentPageLabel = computed(
    () =>
      allNavItems.value.find((i) => i.to === route.path)?.label ?? "Preview",
  );

  const breadcrumbItems = computed(() => {
    const items: { label: string; icon?: string; to?: string }[] = [
      { label: "Home", icon: "i-lucide-home", to: "/" },
    ];

    if (route.path === "/") return items;

    const topLevel = (NAVIGATION_ITEMS[0] ?? []).find(
      (nav) =>
        nav.to === route.path ||
        nav.children?.some((c) => c.to && route.path.startsWith(String(c.to))),
    );

    if (topLevel) {
      items.push({
        label: topLevel.label ?? "",
        icon: topLevel.icon as string | undefined,
        to: String(topLevel.to),
      });

      if (topLevel.to !== route.path) {
        const child = topLevel.children?.find(
          (c) => String(c.to) === route.path,
        );
        if (child) {
          items.push({
            label: child.label ?? "",
            icon: child.icon as string | undefined,
            to: String(child.to),
          });
        }
      }
    }

    return items;
  });

  const mobileNavItems = computed(() => [
    (NAVIGATION_ITEMS[0] ?? []).map((item) => ({
      label: item.label,
      icon: item.icon as string,
      to: String(item.to),
      children: item.children?.map((child) => ({
        label: child.label,
        icon: child.icon as string,
        to: child.to ? String(child.to) : undefined,
      })),
    })),
  ]);

  return {
    allNavItems,
    currentPageLabel,
    breadcrumbItems,
    mobileNavItems,
  };
}
