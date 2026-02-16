import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { Component, DefineComponent } from "vue";
import App from "@nuxt/ui/runtime/components/App.vue";

/**
 * Mount a Vue component within the Nuxt test environment with a real Pinia store.
 *
 * Wraps `mountSuspended` with common defaults so component tests don't need
 * to configure Pinia independently — the Nuxt test env already provides it.
 */
export async function mountComponent<T extends Component>(
  component: T,
  options: Parameters<typeof mountSuspended>[1] = {},
) {
  return mountSuspended(component, options);
}

/**
 * Mount a component that uses Nuxt UI primitives requiring TooltipProvider
 * (UTooltip, etc.) by wrapping it inside the Nuxt UI App shell.
 */
export async function mountWithUApp<T extends Component>(
  component: T,
  options: {
    props?: Record<string, unknown>;
  } = {},
) {
  const { props = {} } = options;

  const WrapperComponent = defineComponent({
    components: { NuxtUiApp: App as any, TargetComponent: component as any },
    setup() {
      return { targetProps: props };
    },
    template: `<NuxtUiApp><TargetComponent v-bind="targetProps" /></NuxtUiApp>`,
  });

  return mountSuspended(WrapperComponent as unknown as DefineComponent);
}

/**
 * Create a minimal wrapper component that calls a composable in setup,
 * then mount it. Useful for testing composables that depend on lifecycle
 * hooks (onMounted, onUnmounted) or injections (useRoute, useAppConfig).
 */
export async function mountWithComposable<T>(
  composableFn: () => T,
  template = "<div>test</div>",
): Promise<{ wrapper: Awaited<ReturnType<typeof mountSuspended>>; result: T }> {
  let result!: T;

  const TestComponent = defineComponent({
    setup() {
      result = composableFn();
      return {};
    },
    template,
  });

  const wrapper = await mountSuspended(
    TestComponent as unknown as DefineComponent,
  );
  return { wrapper, result };
}
