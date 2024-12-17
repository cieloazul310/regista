import { cwd } from "process";
import { resolve } from "path";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import turboConfig from "eslint-config-turbo/flat";

const project = [
  "./tsconfig.json",
  "./tsconfig.eslint.json",
  "./tsconfig.mjs.json",
].map((file) => resolve(cwd(), file));

/** @type {import("eslint").Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  ...turboConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
