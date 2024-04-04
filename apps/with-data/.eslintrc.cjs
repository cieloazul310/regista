/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  overrides: [
    {
      files: "src/mdx-components.tsx",
      rules: {
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["src/theme/*", "panda.config.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
