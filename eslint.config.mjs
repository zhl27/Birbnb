import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	{
		extends: compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:prettier/recommended"
		),

		plugins: {
			"@typescript-eslint": typescriptEslint
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: "module"
		},

		rules: {
			"no-unused-vars": "off",
			"prefer-const": "warn",
			quotes: ["warn", "double"],
			indent: "off",
			"@typescript-eslint/no-explicit-any": "error",
			"arrow-body-style": "off",
			"prefer-arrow-callback": "off"
		}
	}
]);
