/**
 * Example prompts shown on the homepage. Each one loads the built-in preset
 * that best matches it, so visitors can see what AI generation produces
 * without an API key. The homepage says they are examples and links to /ai
 * for real generation.
 */
export interface HomeExamplePrompt {
  prompt: string;
  /** Name of an entry in BUILT_IN_PRESETS. */
  preset: string;
}

export const HOME_EXAMPLE_PROMPTS: readonly HomeExamplePrompt[] = [
  { prompt: "Earthy outdoor brand in forest greens", preset: "Forest" },
  {
    prompt: "Warm sunset glow that turns cool at night",
    preset: "Sunset",
  },
  { prompt: "Crisp, icy SaaS dashboard", preset: "Arctic" },
  { prompt: "Playful neon with lots of energy", preset: "Neon" },
  { prompt: "Minimal developer tool, near-black buttons", preset: "shadcn" },
];
