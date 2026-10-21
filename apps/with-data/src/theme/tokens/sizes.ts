import { defineTokens, defineSemanticTokens } from "@pandacss/dev";

export const sizes = defineTokens.sizes({
  "header-height": { value: "56px" },
  "sidebar-width": { value: "280px" },
});

export const semanticSizes = defineSemanticTokens.sizes({
  "content-width": { value: "{sizes.7xl}" },
  "main-width": { value: "{sizes.4xl}" },
});
