module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb", "airbnb-typescript", "eslint:recommended", "prettier", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:react-hooks/recommended", "plugin:storybook/recommended", "plugin:storybook/recommended"],
  overrides: [{
    "files": ["**/*.stories.*", "**/stories/**.*"],
    "rules": {
      "import/no-anonymous-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "quotes": "off",
      "react/no-unescaped-entities": "off"
    }
  }],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": ["warn", {
      allow: ["info", "warn", "error", "debug"]
    }],
    "prefer-destructuring": ["warn", {
      "object": true,
      "array": false
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useFastRefreshEffect|useSlowRefreshEffect)"
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['state']
    }],
    "no-plusplus": 0,
    "import/prefer-default-export": 0,
    "react/require-default-props": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [2, {
      "namedComponents": "arrow-function"
    }],
    // Disable prop-types as we use TypeScript for type checking
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // Enable prettier rules
    "prettier/prettier": "error",
    // interface start with capital I
    "@typescript-eslint/interface-name-prefix": "off",
    // allow "any" as type
    "@typescript-eslint/no-explicit-any": "off",
    // allow @ts-ignore for testing purposes
    "@typescript-eslint/ban-ts-ignore": "off"
  }
};