import { defineConfig } from "@pandacss/dev";
import { animationStyles } from "@/theme/animation-styles";
import { amber } from "@/theme/colors/amber";
import { gold } from "@/theme/colors/gold";
import { green } from "@/theme/colors/green";
import { red } from "@/theme/colors/red";
import { sand } from "@/theme/colors/sand";
import { conditions } from "@/theme/conditions";
import { globalCss } from "@/theme/global-css";
import { keyframes } from "@/theme/keyframes";
import { layerStyles } from "@/theme/layer-styles";
import { patterns } from "@/theme/patterns";
import { recipes, slotRecipes } from "@/theme/recipes";
import { textStyles } from "@/theme/text-styles";
import { colors } from "@/theme/tokens/colors";
import { durations } from "@/theme/tokens/durations";
import { shadows } from "@/theme/tokens/shadows";
import { sizes, semanticSizes } from "@/theme/tokens/sizes";
import { spacing } from "@/theme/tokens/spacing";
import { zIndex } from "@/theme/tokens/z-index";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",

  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],

  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],

  globalCss,
  conditions,

  theme: {
    extend: {
      animationStyles,
      recipes,
      slotRecipes,
      keyframes,
      layerStyles,
      textStyles,

      tokens: {
        colors,
        durations,
        zIndex,
        sizes: {
          ...sizes,
        },
      },
      semanticTokens: {
        colors: {
          amber,
          gray: sand,
          red,
          green,

          fg: {
            default: {
              value: { _light: "{colors.gray.12}", _dark: "{colors.gray.12}" },
            },
            muted: {
              value: { _light: "{colors.gray.11}", _dark: "{colors.gray.11}" },
            },
            subtle: {
              value: { _light: "{colors.gray.10}", _dark: "{colors.gray.10}" },
            },
          },

          border: {
            value: { _light: "{colors.gray.4}", _dark: "{colors.gray.4}" },
          },

          error: {
            value: { _light: "{colors.red.9}", _dark: "{colors.red.9}" },
          },

          gold: gold,
        },
        shadows: shadows,
        radii: {
          l1: { value: "{radii.lg}" },
          l2: { value: "{radii.xl}" },
          l3: { value: "{radii.2xl}" },
        },
        sizes: semanticSizes,
        spacing,
      },
    },
  },

  patterns: {
    extend: {
      ...patterns,
    },
  },
});
