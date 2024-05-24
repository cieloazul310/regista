/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["styled-system"],
  overrides: [
    {
      files: [
        "next.config.mjs",
        "panda.config.ts",
        "postcss.config.cjs",
        "src/theme/*",
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: "src/mdx-components.tsx",
      rules: {
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["src/components/table/**"],
      rules: {
        "@typescript-eslint/naming-convention": "off",
      },
    },
  ],
};
