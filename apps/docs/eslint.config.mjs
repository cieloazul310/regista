import eslintConfig from "@repo/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...eslintConfig.configs.next,
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
