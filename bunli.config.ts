import { defineConfig } from "@bunli/core";

export default defineConfig({
  name: "gum",
  version: "0.1.0",
  description: "Git User Manager - Switch between git users easily",

  commands: {
    directory: "./src/commands",
  },

  build: {
    entry: "./src/index.ts",
    outdir: "./dist",
    targets: ["darwin-arm64", "darwin-x64", "linux-arm64", "linux-x64", "windows-x64"],
    minify: true,
    sourcemap: false,
    compress: true,
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
