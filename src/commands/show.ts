import { defineCommand } from "@bunli/core";
import pc from "picocolors";
import { getCurrentGitConfig, isGitInstalled } from "../utils/git.js";

function padRight(str: string, len: number): string {
  return str.padEnd(len, " ");
}

export default defineCommand({
  name: "cur" as const,
  alias: ["show"],
  description: "Show current git user configuration",
  handler: async () => {
    if (!isGitInstalled()) {
      console.error(`${pc.red("ERROR")} Git is not installed or not in PATH.`);
      process.exit(1);
    }

    const userConfig = await getCurrentGitConfig();

    if (!userConfig || !userConfig.name) {
      console.error(`${pc.red("ERROR")} No git user configuration found.`);
      process.exit(1);
    }

    const name = userConfig.name;
    const email = userConfig.email || "";
    const maxNameLen = Math.max(name.length, 10);
    const line = `${pc.green("* ")}${padRight(name, maxNameLen)}${" ".repeat(3)}${email}`;

    console.log(line);
  },
});
