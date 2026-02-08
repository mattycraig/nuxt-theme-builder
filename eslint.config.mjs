// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tseslint from "typescript-eslint";

export default withNuxt(
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
);
