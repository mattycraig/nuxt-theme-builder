// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tseslint from "typescript-eslint";

export default withNuxt(
  {
    // Vendored third-party Claude Code skills (include upstream generator scripts)
    ignores: [".claude/skills/**"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["scripts/**/*.mjs", ".claude/hooks/**/*.mjs"],
    rules: {
      "no-console": "off",
    },
  },
);
