/**
 * Shared clipboard + toast helper for color tool components.
 * Provides a `copyColor` function that copies a value and shows a success toast.
 */
export function useColorCopy() {
  const toast = useToast();
  const { copy } = useClipboard();

  function copyColor(label: string, value: string) {
    copy(value);
    toast.add({
      title: "Copied!",
      description: `${label}: ${value}`,
      icon: "i-lucide-clipboard-check",
      color: "success" as const,
    });
  }

  return { copyColor };
}
