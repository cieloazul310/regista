import eslintConfig from "@repo/eslint-config";

// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config[]} */
export default [...eslintConfig.configs.base];
