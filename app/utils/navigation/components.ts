import type { NavigationMenuItem } from "@nuxt/ui";
import type { ComponentCategory } from "~/types/components";
import { flattenCategories } from "./shared";

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    label: "Element",
    icon: "i-lucide-box",
    slug: "element",
    description: "Core visual building blocks for any interface.",
    items: [
      {
        label: "Alert",
        icon: "i-lucide-alert-circle",
        description:
          "Contextual feedback messages for success, info, warning, and error states.",
        to: "/components/alert",
      },
      {
        label: "Avatar",
        icon: "i-lucide-circle-user",
        description: "User profile images in multiple sizes.",
        to: "/components/avatar",
      },
      {
        label: "AvatarGroup",
        icon: "i-lucide-users",
        description: "Stacked avatar groups with overflow indicator.",
        to: "/components/avatar-group",
      },
      {
        label: "Badge",
        icon: "i-lucide-tag",
        description:
          "Inline status indicators with solid, outline, soft, and subtle styles.",
        to: "/components/badge",
      },
      {
        label: "Banner",
        icon: "i-lucide-flag",
        description: "Full-width notification banners for announcements.",
        to: "/components/banner",
      },
      {
        label: "Button",
        icon: "i-lucide-mouse-pointer-click",
        description:
          "Solid, outline, soft, and ghost button variants in every semantic color.",
        to: "/components/button",
      },
      {
        label: "Calendar",
        icon: "i-lucide-calendar",
        description:
          "Date picker calendar with month navigation and date selection.",
        to: "/components/calendar",
      },
      {
        label: "Card",
        icon: "i-lucide-square",
        description:
          "Content containers with headers, bodies, and action footers.",
        to: "/components/card",
      },
      {
        label: "Chip",
        icon: "i-lucide-circle-dot",
        description: "Small indicator dots overlaid on avatars or icons.",
        to: "/components/chip",
      },
      {
        label: "Collapsible",
        icon: "i-lucide-chevrons-down-up",
        description:
          "Toggle content visibility with smooth expand and collapse.",
        to: "/components/collapsible",
      },
      {
        label: "FieldGroup",
        icon: "i-lucide-group",
        description: "Group related form fields with shared styling.",
        to: "/components/field-group",
      },
      {
        label: "Icon",
        icon: "i-lucide-shapes",
        description: "Iconify icon rendering with dynamic name resolution.",
        to: "/components/icon",
      },
      {
        label: "Kbd",
        icon: "i-lucide-keyboard",
        description: "Keyboard shortcut indicators for key bindings.",
        to: "/components/kbd",
      },
      {
        label: "Progress",
        icon: "i-lucide-loader",
        description:
          "Progress bars with semantic coloring for completion states.",
        to: "/components/progress",
      },
      {
        label: "Separator",
        icon: "i-lucide-minus",
        description: "Visual dividers between content sections.",
        to: "/components/separator",
      },
      {
        label: "Skeleton",
        icon: "i-lucide-scan-line",
        description: "Placeholder loading animations for content areas.",
        to: "/components/skeleton",
      },
    ],
  },
  {
    label: "Form",
    icon: "i-lucide-text-cursor-input",
    slug: "form",
    description: "Input controls and form management components.",
    items: [
      {
        label: "Checkbox",
        icon: "i-lucide-square-check",
        description: "Single checkbox toggle with label.",
        to: "/components/checkbox",
      },
      {
        label: "CheckboxGroup",
        icon: "i-lucide-list-checks",
        description: "Multiple checkbox options in a group.",
        to: "/components/checkbox-group",
      },
      {
        label: "ColorPicker",
        icon: "i-lucide-palette",
        description: "Color selection with swatches and custom input.",
        to: "/components/color-picker",
      },
      {
        label: "FileUpload",
        icon: "i-lucide-upload",
        description: "Drag-and-drop or click-to-upload file input.",
        to: "/components/file-upload",
      },
      {
        label: "Form",
        icon: "i-lucide-file-input",
        description: "Form wrapper with validation and submission handling.",
        to: "/components/form",
      },
      {
        label: "FormField",
        icon: "i-lucide-text-cursor",
        description:
          "Labeled field wrapper with validation, help text, and error display.",
        to: "/components/form-field",
      },
      {
        label: "Input",
        icon: "i-lucide-text-cursor-input",
        description: "Text input fields with icons, states, and validation.",
        to: "/components/input",
      },
      {
        label: "InputDate",
        icon: "i-lucide-calendar-days",
        description: "Date input with calendar picker integration.",
        to: "/components/input-date",
      },
      {
        label: "InputMenu",
        icon: "i-lucide-list",
        description:
          "Input with dropdown menu for suggestions or autocomplete.",
        to: "/components/input-menu",
      },
      {
        label: "InputNumber",
        icon: "i-lucide-hash",
        description: "Numeric input with increment and decrement controls.",
        to: "/components/input-number",
      },
      {
        label: "InputTags",
        icon: "i-lucide-tags",
        description: "Tag input for entering multiple values as tokens.",
        to: "/components/input-tags",
      },
      {
        label: "InputTime",
        icon: "i-lucide-clock",
        description: "Time input with hour and minute selection.",
        to: "/components/input-time",
      },
      {
        label: "PinInput",
        icon: "i-lucide-key-round",
        description: "Segmented input for PIN codes and verification.",
        to: "/components/pin-input",
      },
      {
        label: "RadioGroup",
        icon: "i-lucide-circle-check",
        description: "Single-select radio options in a group.",
        to: "/components/radio-group",
      },
      {
        label: "Select",
        icon: "i-lucide-chevrons-up-down",
        description: "Dropdown select with single selection.",
        to: "/components/select",
      },
      {
        label: "SelectMenu",
        icon: "i-lucide-list-filter",
        description: "Searchable select with multiple selection support.",
        to: "/components/select-menu",
      },
      {
        label: "Slider",
        icon: "i-lucide-sliders-horizontal",
        description: "Range slider for numeric value selection.",
        to: "/components/slider",
      },
      {
        label: "Switch",
        icon: "i-lucide-toggle-left",
        description: "Toggle switch for boolean settings.",
        to: "/components/switch",
      },
      {
        label: "Textarea",
        icon: "i-lucide-align-left",
        description: "Multi-line text input with auto-resize support.",
        to: "/components/textarea",
      },
    ],
  },
  {
    label: "Data",
    icon: "i-lucide-database",
    slug: "data",
    description: "Components for displaying and organizing data.",
    items: [
      {
        label: "Accordion",
        icon: "i-lucide-chevrons-down-up",
        description: "Collapsible content sections for progressive disclosure.",
        to: "/components/accordion",
      },
      {
        label: "Carousel",
        icon: "i-lucide-gallery-horizontal",
        description: "Horizontal content carousel with navigation controls.",
        to: "/components/carousel",
      },
      {
        label: "Empty",
        icon: "i-lucide-inbox",
        description: "Empty state placeholder with icon and message.",
        to: "/components/empty",
      },
      {
        label: "Marquee",
        icon: "i-lucide-move-horizontal",
        description: "Auto-scrolling horizontal content ticker.",
        to: "/components/marquee",
      },
      {
        label: "ScrollArea",
        icon: "i-lucide-scroll",
        description: "Custom scrollbar container with overflow management.",
        to: "/components/scroll-area",
      },
      {
        label: "Table",
        icon: "i-lucide-table",
        description:
          "Data tables with column headers, sorting, and status badges.",
        to: "/components/table",
      },
      {
        label: "Timeline",
        icon: "i-lucide-git-commit-horizontal",
        description: "Chronological event display with icons and metadata.",
        to: "/components/timeline",
      },
      {
        label: "Tree",
        icon: "i-lucide-folder-tree",
        description: "Hierarchical tree view with expand and collapse.",
        to: "/components/tree",
      },
      {
        label: "User",
        icon: "i-lucide-contact",
        description:
          "User identity display with avatar, name, and description.",
        to: "/components/user",
      },
    ],
  },
  {
    label: "Navigation",
    icon: "i-lucide-compass",
    slug: "navigation",
    description: "Wayfinding and page structure components.",
    items: [
      {
        label: "Breadcrumb",
        icon: "i-lucide-slash",
        description:
          "Hierarchical path breadcrumbs with separator customization.",
        to: "/components/breadcrumb",
      },
      {
        label: "CommandPalette",
        icon: "i-lucide-terminal",
        description: "Searchable command palette with keyboard navigation.",
        to: "/components/command-palette",
      },
      {
        label: "FooterColumns",
        icon: "i-lucide-columns-3",
        description: "Multi-column footer with grouped links.",
        to: "/components/footer-columns",
      },
      {
        label: "Link",
        icon: "i-lucide-external-link",
        description:
          "Enhanced link component with active state and icon support.",
        to: "/components/link",
      },
      {
        label: "NavigationMenu",
        icon: "i-lucide-menu",
        description:
          "Navigation menu with icon links and active state indicators.",
        to: "/components/navigation-menu",
      },
      {
        label: "Pagination",
        icon: "i-lucide-arrow-left-right",
        description: "Page navigation for paginated data sets.",
        to: "/components/pagination",
      },
      {
        label: "Stepper",
        icon: "i-lucide-footprints",
        description: "Multi-step progress indicator for wizards and flows.",
        to: "/components/stepper",
      },
      {
        label: "Tabs",
        icon: "i-lucide-panel-top",
        description:
          "Tabbed interfaces for organizing content into switchable panels.",
        to: "/components/tabs",
      },
    ],
  },
  {
    label: "Overlay",
    icon: "i-lucide-layers",
    slug: "overlay",
    description: "Floating and layered interactive surfaces.",
    items: [
      {
        label: "ContextMenu",
        icon: "i-lucide-mouse-pointer",
        description: "Right-click context menus with grouped actions.",
        to: "/components/context-menu",
      },
      {
        label: "Drawer",
        icon: "i-lucide-panel-left-open",
        description: "Bottom sheet drawer for mobile-friendly overlays.",
        to: "/components/drawer",
      },
      {
        label: "DropdownMenu",
        icon: "i-lucide-chevron-down",
        description:
          "Dropdown menus with grouped actions, icons, and shortcuts.",
        to: "/components/dropdown-menu",
      },
      {
        label: "Modal",
        icon: "i-lucide-app-window-mac",
        description: "Dialog overlays for confirmations, forms, and content.",
        to: "/components/modal",
      },
      {
        label: "Popover",
        icon: "i-lucide-message-square",
        description: "Floating content panels triggered by click or hover.",
        to: "/components/popover",
      },
      {
        label: "Slideover",
        icon: "i-lucide-panel-right-open",
        description: "Slide-in panel overlays from the screen edge.",
        to: "/components/slideover",
      },
      {
        label: "Toast",
        icon: "i-lucide-bell",
        description: "Notification toasts for transient feedback messages.",
        to: "/components/toast",
      },
      {
        label: "Tooltip",
        icon: "i-lucide-message-circle",
        description: "Contextual hover hints for UI clarification.",
        to: "/components/tooltip",
      },
    ],
  },
];

export const COMPONENT_NAV_ITEMS: NavigationMenuItem[] =
  flattenCategories(COMPONENT_CATEGORIES);
