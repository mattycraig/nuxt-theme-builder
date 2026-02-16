<script setup lang="ts">
/**
 * Blocks UDashboardSidebar global runtime hook registration within the
 * hidden routing slot.
 *
 * Template pages (dashboard, chat) render UDashboardSidebar which registers
 * global `dashboard:sidebar:toggle` and `dashboard:sidebar:collapse` hooks
 * via useRuntimeHook. When mounted inside the hidden slot, these hooks cause
 * the wrong sidebar to open at mobile widths because the slideover teleports
 * to <body>, escaping the hidden/inert wrapper.
 *
 * This component intercepts nuxtApp.hook() to suppress those specific
 * registrations. The parent layout’s sidebar hooks are already registered
 * before this wrapper mounts, so they are unaffected.
 */
const nuxtApp = useNuxtApp()
const originalHook = nuxtApp.hook

const blockedHooks = new Set<string>([
  'dashboard:sidebar:toggle',
  'dashboard:sidebar:collapse',
])

nuxtApp.hook = new Proxy(originalHook, {
  apply(target, thisArg, args: [string, ...unknown[]]) {
    if (blockedHooks.has(args[0])) {
      return () => {}
    }
    return Reflect.apply(target, thisArg, args)
  },
})

onBeforeUnmount(() => {
  nuxtApp.hook = originalHook
})
</script>

<template>
  <slot />
</template>
