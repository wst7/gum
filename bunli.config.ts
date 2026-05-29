import { defineConfig } from "@bunli/core";

export default defineConfig({
  name: "gum",
  version: "0.1.0",
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

  release: {
    npm: true,
    github: true,
    tagFormat: "v{{version}}",
  },

  dev: {
    watch: true,
    inspect: true,
  },

  test: {
    pattern: ["**/*.test.ts", "**/*.spec.ts"],
    coverage: true,
    watch: false,
  },

  plugins: [],
});
