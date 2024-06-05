import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dbCredentials: {
    url: "postgresql://neondb_owner:P8a0ZHxSlqok@ep-calm-pine-a2p8zq3u.eu-central-1.aws.neon.tech/neondb?sslmode=require",
  },
});
