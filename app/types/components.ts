import type { NavigationMenuItem } from "@nuxt/ui";
import type { Component } from "vue";

export interface ComponentCategory {
  label: string;
  icon: string;
  slug: string;
  description: string;
  items: NavigationMenuItem[];
}

export type BlockCategory = ComponentCategory;

export type TemplateCategory = ComponentCategory;

export interface BlockShowcaseItem {
  id: string;
  title: string;
  description: string;
  prompt: string;
  source: string;
  component?: Component;
}
