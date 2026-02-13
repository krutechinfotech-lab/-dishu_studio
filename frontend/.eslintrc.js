const globals = require("globals");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    ...globals.browser,
  },
  rules: {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
  },
};
