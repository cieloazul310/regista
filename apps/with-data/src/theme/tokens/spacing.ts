import { defineSemanticTokens } from "@pandacss/dev";

export const spacing = defineSemanticTokens.spacing({
  xs: { value: "{spacing.1}" },
  sm: { value: "{spacing.2}" },
  md: { value: "{spacing.4}" },
  lg: { value: "{spacing.8}" },
  xl: { value: "{spacing.16}" },
  "2xl": { value: "{spacing.32}" },
  "main-px": { value: { base: "{spacing.md}", md: "{spacing.xl}" } },
});
