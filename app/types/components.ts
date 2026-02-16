import type { NavigationMenuItem } from "@nuxt/ui";
import type { Component } from "vue";

export type NavigationBadge = "new" | "updated";

export interface NavigationItemWithBadge extends NavigationMenuItem {
  badge?: NavigationBadge;
}

export interface ComponentCategory {
  label: string;
  icon: string;
  slug: string;
  description: string;
  items: NavigationItemWithBadge[];
}

export type BlockCategory = ComponentCategory;

export type TemplateCategory = ComponentCategory;

export type LearnCategory = ComponentCategory;

export type ToolCategory = ComponentCategory;

export interface BlockShowcaseItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  source: string;
  component?: Component;
}
