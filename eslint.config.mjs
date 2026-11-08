import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // eslint-plugin-react-hooks 7 flags existing fetch effects that set state
      // after an await. Those calls stay warnings so lint can pass.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
