import {
  NAVIGATION_ITEMS,
  COMPONENT_NAV_ITEMS,
  BLOCK_NAV_ITEMS,
  TEMPLATE_NAV_ITEMS,
  LEARN_NAV_ITEMS,
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
    ...[
      ...COMPONENT_NAV_ITEMS,
      ...BLOCK_NAV_ITEMS,
      ...TEMPLATE_NAV_ITEMS,
      ...LEARN_NAV_ITEMS,
    ].map((item) => ({
      label: item.label ?? "",
      icon: item.icon as string | undefined,
      to: item.to ? String(item.to) : undefined,
    })),
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

    const segments = route.path.split("/").filter(Boolean);

    // Add parent section breadcrumb for nested routes (e.g. /components/buttons → "Components")
    if (segments.length > 1) {
      const parentPath = `/${segments[0]}`;
      const parentNav = (NAVIGATION_ITEMS[0] ?? []).find(
        (i) => String(i.to) === parentPath,
      );
      if (parentNav) {
        items.push({
          label: parentNav.label ?? segments[0]!,
          icon: parentNav.icon as string | undefined,
          to: parentPath,
        });
      }
    }

    const match = allNavItems.value.find((i) => i.to === route.path);
    if (match) {
      items.push({
        label: match.label,
        icon: match.icon,
        to: match.to,
      });
    }

    return items;
  });

  const mobileNavItems = computed(() => [
    (NAVIGATION_ITEMS[0] ?? []).map((item) => ({
      label: item.label,
      icon: item.icon as string,
      to: String(item.to),
    })),
  ]);

  return {
    allNavItems,
    currentPageLabel,
    breadcrumbItems,
    mobileNavItems,
  };
}
