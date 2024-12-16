import eslintConfigPrettier from "eslint-config-prettier";
import baseConfig from "./base.mjs";
import nextConfig from "./next.mjs";
import reactInternalConfig from "./react-internal.mjs";

export const base = [...baseConfig, eslintConfigPrettier];
export const library = [...baseConfig, eslintConfigPrettier];
export const next = [...nextConfig, eslintConfigPrettier];
export const reactInternal = [...reactInternalConfig, eslintConfigPrettier];

export default {
  configs: {
    base,
    library,
    next,
    reactInternal,
  },
};
