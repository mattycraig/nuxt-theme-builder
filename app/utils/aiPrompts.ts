import type { PromptTemplate, PromptCategory } from "~/types/ai";

export const PROMPT_CATEGORIES: PromptCategory[] = [
  "Professional",
  "Creative",
  "Nature",
  "Dark Mode",
  "Brand",
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // Professional ──────────────────────────────────────────────────────
  {
    id: "corp-blue",
    label: "Corporate Blue",
    description: "Clean, trustworthy corporate look with blue tones.",
    icon: "i-lucide-building-2",
    category: "Professional",
    prompt:
      "Create a clean corporate theme with blue as the primary color. It should feel professional, trustworthy, and modern. Use a neutral palette that conveys stability. Choose a clean sans-serif font.",
  },
  {
    id: "fintech",
    label: "Fintech Dashboard",
    description: "Minimal, data-focused design for financial apps.",
    icon: "i-lucide-line-chart",
    category: "Professional",
    prompt:
      "Design a minimal fintech dashboard theme. Use cool tones for primary and info colors. The theme should feel precise and data-driven. Pick a modern geometric sans-serif font with a small border radius for sharp UI elements.",
  },
  {
    id: "law-firm",
    label: "Law Firm",
    description: "Serious, authoritative, and trustworthy tones.",
    icon: "i-lucide-scale",
    category: "Professional",
    prompt:
      "Create a theme for a law firm website. It should feel authoritative, serious, and trustworthy. Use deep, muted colors — avoid anything too bright or playful. Choose a serif font for elegance. Use neutral tones like stone or gray.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Calm, accessible, and reassuring medical tones.",
    icon: "i-lucide-heart-pulse",
    category: "Professional",
    prompt:
      "Design a healthcare application theme. It should feel calm, clean, and reassuring. Use teal or cyan as the primary color and green for success states. Keep the radius moderate and choose a highly readable sans-serif font.",
  },

  // Creative ──────────────────────────────────────────────────────────
  {
    id: "startup-vibrant",
    label: "Vibrant Startup",
    description: "Energetic, bold colors for a startup landing page.",
    icon: "i-lucide-rocket",
    category: "Creative",
    prompt:
      "Create a vibrant, energetic theme for a tech startup landing page. Use bold, saturated primary colors — something eye-catching like violet or fuchsia. Pair it with a contrasting secondary color. Use a modern display font and generous border radius for a friendly feel.",
  },
  {
    id: "portfolio-warm",
    label: "Warm Portfolio",
    description: "Artistic portfolio with warm, earthy accent tones.",
    icon: "i-lucide-brush",
    category: "Creative",
    prompt:
      "Design an artistic portfolio theme with warm tones. Use amber or orange as primary, with a warm neutral like stone. The theme should feel creative and inviting. Choose an elegant font — serif or display — with moderate radius.",
  },
  {
    id: "gaming-neon",
    label: "Gaming Neon",
    description: "High-energy gaming aesthetic with vivid accents.",
    icon: "i-lucide-gamepad-2",
    category: "Creative",
    prompt:
      "Create a high-energy gaming theme with neon-inspired colors. Use vivid colors like lime, cyan, or fuchsia. The theme should feel exciting and modern. Pick a bold display or monospace font. Use a small radius for sharp edges.",
  },
  {
    id: "candy-pop",
    label: "Candy Pop",
    description: "Playful, colorful, and fun for youth-oriented apps.",
    icon: "i-lucide-ice-cream-cone",
    category: "Creative",
    prompt:
      "Design a playful, candy-colored theme. Use pink or fuchsia as primary with fun secondary colors. The theme should feel joyful, fun, and youthful. Use rounded radius and a friendly, rounded sans-serif font.",
  },

  // Nature ────────────────────────────────────────────────────────────
  {
    id: "earth-sustain",
    label: "Earthy Sustainable",
    description: "Organic, eco-friendly brand with natural tones.",
    icon: "i-lucide-sprout",
    category: "Nature",
    prompt:
      "Create an earthy, sustainable brand theme. Use green or emerald as primary with warm neutrals like stone. The theme should feel organic, grounded, and eco-friendly. Choose a clean font that pairs well with natural imagery. Use moderate radius.",
  },
  {
    id: "ocean-sky",
    label: "Ocean & Sky",
    description: "Calming blues inspired by sea and sky.",
    icon: "i-lucide-waves",
    category: "Nature",
    prompt:
      "Design a calming theme inspired by the ocean and sky. Use sky or cyan as primary and blue tones throughout. The theme should evoke serenity and openness. Pick a light, airy sans-serif font with slightly rounded radius.",
  },
  {
    id: "forest",
    label: "Forest & Woodland",
    description: "Deep greens and rich woodland textures.",
    icon: "i-lucide-tree-pine",
    category: "Nature",
    prompt:
      "Create a forest-inspired theme with deep greens and warm earth tones. Use emerald or teal as primary, with amber or orange for warning/accent elements. The neutral should be warm like stone. Choose a serif or classic font for a timeless feel.",
  },
  {
    id: "sunset-golden",
    label: "Golden Sunset",
    description: "Warm amber and orange sunset palette.",
    icon: "i-lucide-sunset",
    category: "Nature",
    prompt:
      "Design a warm sunset theme with golden and amber tones. Use amber or orange as primary and rose for accents. The theme should feel warm, inviting, and nostalgic. Use stone as neutral and pick a display or serif font.",
  },

  // Dark Mode ─────────────────────────────────────────────────────────
  {
    id: "dev-tool",
    label: "Developer Tool",
    description: "Sleek dark interface for developer-focused apps.",
    icon: "i-lucide-terminal",
    category: "Dark Mode",
    prompt:
      "Create a sleek developer tool theme optimized for dark mode. Use a cool-toned primary like blue or indigo. Keep things minimal and professional with a monospace font. Use zinc or neutral as the neutral palette. Small radius for a technical feel.",
  },
  {
    id: "dark-luxury",
    label: "Dark Luxury",
    description:
      "Premium dark e-commerce with gold accents and atmospheric depth.",
    icon: "i-lucide-gem",
    category: "Dark Mode",
    prompt:
      "Design a dark luxury e-commerce theme. Use a muted primary like violet or purple with amber/yellow accents for a gold-like feel. The theme should feel premium and exclusive — think glassmorphism product cards, atmospheric gradient orbs, and glow-halo hover effects. Choose an elegant serif or display font. Use moderate radius for a refined, editorial feel.",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    description: "Futuristic neon on dark theme.",
    icon: "i-lucide-cpu",
    category: "Dark Mode",
    prompt:
      "Create a cyberpunk-inspired dark theme. Use vivid neon colors like cyan or fuchsia against dark backgrounds. The theme should feel futuristic and edgy. Pick a monospace or display font. Use very small radius for sharp, technical edges.",
  },

  // Brand ─────────────────────────────────────────────────────────────
  {
    id: "github-neutral",
    label: "GitHub-Inspired",
    description: "Neutral, clean developer platform aesthetic.",
    icon: "i-lucide-github",
    category: "Brand",
    prompt:
      "Create a theme inspired by GitHub's design language. Use a neutral primary (gray or slate), blue for info/links, green for success, and red for errors. The theme should feel clean, neutral, and developer-friendly. Use a system-like sans-serif font with small radius.",
  },
  {
    id: "stripe-clean",
    label: "Stripe-Inspired",
    description: "Polished, minimal fintech feel with purple tones.",
    icon: "i-lucide-credit-card",
    category: "Brand",
    prompt:
      "Design a theme inspired by Stripe's aesthetic. Use indigo or violet as primary with a very clean, minimal look. The theme should feel polished, premium, and trustworthy. Choose a modern sans-serif font with moderate radius.",
  },
  {
    id: "spotify-dark",
    label: "Spotify-Inspired",
    description: "Dark interface with vibrant green accents.",
    icon: "i-lucide-music",
    category: "Brand",
    prompt:
      "Create a theme inspired by Spotify's design. Use green as primary on a dark neutral background (neutral or gray). The secondary should be a complementary color. The theme should feel modern and media-focused. Use a sans-serif font with moderate radius.",
  },
];

export const SUGGESTION_PROMPTS = [
  "A calm, professional SaaS dashboard",
  "Something bold and creative for a portfolio",
  "An earthy, natural brand theme",
  "Sleek dark mode for a dev tool",
  "Warm and friendly e-commerce with atmospheric depth",
  "Minimal and elegant with serif fonts",
];
