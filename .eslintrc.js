module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "no-console": "off",
    "prefer-destructuring": "off",
    "no-underscore-dangle": "off",
    camelcase: "off",
    "no-unused-expressions": "off"
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {}
};
