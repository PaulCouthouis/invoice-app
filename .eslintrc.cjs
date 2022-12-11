module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  ignorePatterns: ["*.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "functional"],
  root: true,
  overrides: [
    {
      extends: [
        "plugin:functional/external-recommended",
        "plugin:functional/recommended",
        "plugin:functional/stylistic",
      ],
      files: "*.ts",
      excludedFiles: "*.test.ts",
    },
  ],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off", 
    "@typescript-eslint/no-unsafe-call": "off"
  }
};
