// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            "no-duplicate-imports": "error",
            "no-console": "warn",               // Warn on console.log usage
            "no-debugger": "error",             // Disallow the use of debugger
            "eqeqeq": ["error", "always"],      // Enforce strict equality (=== and !==)
            "curly": ["error", "all"],          // Require braces around blocks
            "no-unused-vars": ["warn", {
                "args": "none",
                "ignoreRestSiblings": true
            }],                                // Warn on unused variables
            "prefer-const": "warn",             // Suggest using const for variables that are not reassigned
            "no-var": "error",                  // Disallow var, prefer let/const
            "semi": ["error", "always"],        // Require semicolons
            "quotes": ["error", "single"],      // Enforce single quotes
            "indent": ["error", 4],             // Enforce 2 spaces for indentation
            "comma-dangle": ["error", "never"],  // Disallow trailing commas,
            "@typescript-eslint/no-explicit-any": "warn",               // Warn on usage of `any`
            "@typescript-eslint/no-unused-vars": ["warn"],              // Warn on unused variables
            "@typescript-eslint/no-non-null-assertion": "error",        // Disallow non-null assertions
            "@typescript-eslint/no-inferrable-types": "warn",           // Warn when type can be inferred
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // Prefer interface over type
            "@typescript-eslint/no-empty-function": "warn",
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
