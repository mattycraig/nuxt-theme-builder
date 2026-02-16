## Overview

Nuxt UI Theme Builder is a client-side application for visually configuring Nuxt UI design tokens. Your theme data stays in your browser — we do not collect personal information, require account creation, or transmit your design configurations to any server. The only external calls the app makes are AI theme-generation prompts, which go directly to the provider you choose (see below).

---

## What Data We Collect

Here is exactly what the app stores on your device and why.

### Local Storage

We use your browser's localStorage to persist:

- **Theme configuration** — your current design token selections (colors, radius, font, shades) so they survive page reloads.
- **Saved presets** — any custom themes you save for later use.
- **UI preferences** — sidebar width, collapse state, and cookie consent acknowledgment.
- **AI settings** — if you use the AI theme generation feature, your selected provider and model preferences are stored locally. API keys are only stored locally if you explicitly opt in.

### Cookies

A single cookie (`nuxt-color-mode`) is set automatically by the Nuxt Color Mode module to remember your light/dark mode preference. This is a first-party, functional cookie — it is not used for tracking or advertising.

### Cookie Consent

When you first visit the site, a consent banner asks whether you accept non-essential cookies. Your choice is saved in localStorage so the banner is not shown again. If you decline, only the strictly necessary `nuxt-color-mode` cookie is set. You can change your preference at any time by clearing localStorage for this site.

---

## Third-Party Services

### Vercel Analytics & Speed Insights

We use Vercel Analytics and Speed Insights to understand aggregate page performance (load times, web vitals). These services collect anonymized, non-personally-identifiable metrics. No cookies are set by these services. For details, see [Vercel's Analytics privacy policy](https://vercel.com/docs/analytics/privacy-policy){target="\_blank"}.

### AI Theme Generation

If you use the AI-powered theme generation feature, your prompts are sent to the AI provider you configure (e.g., OpenAI, Anthropic). We do not proxy or store these requests — they go directly from your browser to the provider's API. Refer to your chosen provider's privacy policy for details on how they handle data.

---

## Data Sharing

We do not sell, rent, or share any data with third parties. There is no backend database — all application state lives entirely in your browser.

---

## Your Rights

Since all data is stored locally in your browser, you have full control over it at all times:

- **View your data** — open your browser's Developer Tools and inspect localStorage.
- **Delete your data** — clear localStorage for this site or use your browser's "Clear site data" feature.
- **Export your data** — use the Export feature to download your theme configuration as a file.

---

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date.

---

## Contact

If you have questions about this privacy policy, please [get in touch](/contact).
