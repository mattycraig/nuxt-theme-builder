export default defineNuxtRouteMiddleware((to) => {
  // Only gate in production
  if (import.meta.dev) return;

  const { comingSoonEnabled } = useRuntimeConfig().public;
  if (!comingSoonEnabled) return;

  const isComingSoonPage = to.path === "/coming-soon";
  const isApiRoute = to.path.startsWith("/api/");

  // Allow the coming soon page and API routes through
  if (isComingSoonPage || isApiRoute) return;

  // Check for the auth cookie
  const accessCookie = useCookie("launch_access");
  if (accessCookie.value === "granted") return;

  // Redirect unauthenticated visitors to the coming soon page
  return navigateTo("/coming-soon", { replace: true });
});
