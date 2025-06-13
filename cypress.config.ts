import { defineConfig } from "cypress";
import dotenv  from "dotenv";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const env = dotenv.config({ path: '.env.local' }).parsed;

      config.env = { ...config.env, ...env };

      return config;
    },
  },
});