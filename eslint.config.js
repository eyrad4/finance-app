// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierRecommendedPlugin = require('eslint-plugin-prettier/recommended');
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const preferArrowPlugin = require("eslint-plugin-prefer-arrow");
const importPlugin = require("eslint-plugin-import");
const tsParser = require("@typescript-eslint/parser");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      'unused-imports': unusedImportsPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'prefer-arrow': preferArrowPlugin,
      'import': importPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierRecommendedPlugin
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [["^\\u0000"], ["^@?(?!finance-app)\\w"], ["^@finance-app?\\w"], ["^[^.]"], ["^\\."]]
        }
      ],
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          "disallowPrototype": true,
          "singleReturnOnly": false,
          "classPropertiesAllowed": false,
          "allowStandaloneDeclarations": true
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "types": ["boolean", "string", "number", "array"],
          "format": ["camelCase", "snake_case", "UPPER_CASE"],
          "leadingUnderscore": "forbid",
          "trailingUnderscore": "forbid"
        },
        {
          "selector": "classMethod",
          "format": ["camelCase"],
          "leadingUnderscore": "forbid"
        },
        {
          "selector": "classMethod",
          "format": ["camelCase"],
          "modifiers": ["private"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "classMethod",
          "format": ["camelCase"],
          "modifiers": ["protected"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "classProperty",
          "format": ["camelCase", "snake_case"],
          "leadingUnderscore": "forbid"
        },
        {
          "selector": "classProperty",
          "format": ["camelCase", "snake_case"],
          "modifiers": ["private"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "classProperty",
          "format": ["camelCase", "snake_case"],
          "modifiers": ["protected"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "variable",
          "types": ["function"],
          "format": ["camelCase"],
          "leadingUnderscore": "forbid",
          "trailingUnderscore": "forbid"
        },
        {
          "selector": "function",
          "format": ["camelCase", "PascalCase"],
          "leadingUnderscore": "forbid",
          "trailingUnderscore": "forbid"
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "enumMember",
          "format": ["PascalCase"]
        },
        {
          "selector": "objectLiteralProperty",
          "format": ["camelCase", "snake_case"]
        }
      ],
      "max-len": [
        "error",
        {
          "code": 140,
          "ignorePattern": "^import .*"
        }
      ],
      "import/newline-after-import": "error",
      "lines-between-class-members": "error",
      "import/no-duplicates": "error",
      "arrow-body-style": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
