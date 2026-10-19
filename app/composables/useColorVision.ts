import type { ColorVisionMode } from "~/utils/colorVision";
import { COLOR_VISION_OPTIONS, colorVisionFilter } from "~/utils/colorVision";

/**
 * Shared color vision simulation for the preview iframes. Lasts for the
 * visit only, so nobody comes back to a filtered preview by surprise.
 */
export function useColorVision() {
  const mode = useState<ColorVisionMode>("color-vision-mode", () => "none");

  const filter = computed(() => colorVisionFilter(mode.value));

  const active = computed(() =>
    mode.value === "none"
      ? undefined
      : COLOR_VISION_OPTIONS.find((o) => o.id === mode.value),
  );

  function setMode(value: ColorVisionMode) {
    mode.value = value;
  }

  return { mode, filter, active, setMode };
}
