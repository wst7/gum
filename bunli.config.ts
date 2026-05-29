import { defineConfig } from "@bunli/core";

export default defineConfig({
  name: "gum",
  description: "Git User Manager - Switch between git users easily",

  commands: {
    directory: "./src/commands",
  },

  build: {
    entry: "./src/cli.ts",
    outdir: "./dist",
    minify: true,
    sourcemap: false,
  },
  dev: {
    watch: true,
    inspect: true,
  },
  plugins: [],
});
