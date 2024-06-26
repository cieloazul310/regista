import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import { globalCss, patterns, semanticTokens, tokens } from "@/theme";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: [
    "@pandacss/preset-panda",
    createPreset({
      accentColor: "gold",
      grayColor: "sand",
      borderRadius: "xl",
    }),
  ],

  conditions: {
    extend: {
      light: "[data-theme=light] &",
      dark: "[data-theme=dark] &",
    },
  },

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  theme: {
    extend: {
      semanticTokens,
      tokens,
    },
  },

  globalCss,

  patterns,

  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",
});
