module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-import-helpers"],
  rules: {
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always", // new line between groups
        groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "import/no-unresolved": "off",
    "no-nested-ternary": "off",
    "import/extensions": "off",
    camelcase: "off",
    "lass-methods-use-this": "off",
    "class-methods-use-this": "off",
    "no-useless-constructor": "off",
  },
};
