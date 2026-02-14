import type { BlockShowcaseItem } from "~/types/components";

import ContactForm from "~/components/blocks/components/ContactForm.vue";
import ContactSplit from "~/components/blocks/components/ContactSplit.vue";
import ContactCards from "~/components/blocks/components/ContactCards.vue";
import ContactMinimal from "~/components/blocks/components/ContactMinimal.vue";
import contactFormRaw from "~/components/blocks/components/ContactForm.vue?raw";
import contactSplitRaw from "~/components/blocks/components/ContactSplit.vue?raw";
import contactCardsRaw from "~/components/blocks/components/ContactCards.vue?raw";
import contactMinimalRaw from "~/components/blocks/components/ContactMinimal.vue?raw";

export const CONTACT_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "contact-form",
    title: "Contact 1",
    description:
      "A centered contact form using the UAuthForm component with name, email, and message fields — a quick way to add a professional contact section.",
    prompt: `Generate a contact form using Nuxt UI v4 UAuthForm. It should include:
- UPageCard wrapping a UAuthForm with title "Get in touch"
- Fields: name (text), email (email type), message (textarea)
- Submit button labeled "Send Message" with a send icon
- Centered layout with max-w-xl
Style: clean centered form card using Nuxt UI form components.`,
    source: contactFormRaw,
    component: ContactForm,
  },
  {
    id: "contact-split",
    title: "Contact 2",
    description:
      "A split-layout contact section with company info, address, and contact details on one side, and a contact form in a UPageCard on the other.",
    prompt: `Generate a split contact section. It should include:
- Left column: heading, description, and a list of contact channels (email, phone, address) each with an icon
- Right column: UPageCard containing a form with UInput fields and a UButton submit
- Responsive grid: stacked on mobile, side-by-side on desktop
Style: two-column contact layout balancing information with action.`,
    source: contactSplitRaw,
    component: ContactSplit,
  },
  {
    id: "contact-cards",
    title: "Contact 3",
    description:
      "Contact channel cards in a UPageGrid — email, phone, office, and live chat — each in its own UPageCard with icon and description.",
    prompt: `Generate contact channel cards using Nuxt UI v4 UPageGrid and UPageCard. It should include:
- UPageGrid with 4 UPageCard items
- Each card: icon, channel title, description, and a link/button for the action
- Channels: Email, Phone, Office, Live Chat
- Icons from lucide icon set
Style: grid of distinct contact method cards for easy scanning.`,
    source: contactCardsRaw,
    component: ContactCards,
  },
  {
    id: "contact-minimal",
    title: "Contact 4",
    description:
      "A minimal contact section with centered text, an email link, and a single CTA button — the simplest possible contact block.",
    prompt: `Generate a minimal contact block. It should include:
- Centered section with heading and a short description
- Prominent email link styled with primary color
- A single UButton CTA for initiating contact
- Very clean layout with generous whitespace
Style: ultra-minimal centered contact block.`,
    source: contactMinimalRaw,
    component: ContactMinimal,
  },
];
