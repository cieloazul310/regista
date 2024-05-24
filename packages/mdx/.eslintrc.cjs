/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react-internal.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["module"],
  overrides: [
    {
      files: ["vitest.config.ts", "vitest.setup.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
