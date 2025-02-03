import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Disable the "no-unused-vars" rule
      "no-unused-vars": "off", 
      
      // Disable the "react/react-in-jsx-scope" rule
      "react/react-in-jsx-scope": "off", 

      // Show a warning instead of error for "no-console"
      "no-console": "warn", 

      // Add any other rules you'd like to disable or configure
    },
  },
];

export default eslintConfig;
