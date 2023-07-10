module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
};
