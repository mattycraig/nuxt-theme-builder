import type { Ref, WritableComputedRef } from "vue";

/**
 * Creates a safe writable computed for UColorPicker that always returns
 * a valid HEX string (falling back to `fallback`), and writes picker
 * changes back to the source ref.
 */
export function usePickerHex(
  source: Ref<string>,
  resolvedHex: Ref<string | null>,
  fallback: string,
): WritableComputedRef<string> {
  return computed({
    get: () => resolvedHex.value ?? fallback,
    set: (v: string) => {
      source.value = v;
    },
  });
}
