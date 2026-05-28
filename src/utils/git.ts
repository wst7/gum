import { join } from "path";
import { $ } from "bun";
import { readIniConfig, writeIniConfig, USER_SECTION, type UserConfig } from "./config.js";

export function isGitInstalled(): boolean {
  try {
    const result = Bun.which("git");
    return result !== null;
  } catch {
    return false;
  }
}

export async function getGitConfig(): Promise<string[]> {
  try {
    const result = await $`git config -l`.text();
    const lines = result.split("\n").filter((line) => line.startsWith("user."));
    return lines;
  } catch {
    return [];
  }
}

export async function getCurrentGitConfig(): Promise<UserConfig | null> {
  try {
    const result = await $`git config -l`.text();
    const userLines = result.split("\n").filter((line) => line.startsWith("user."));

    if (userLines.length === 0) {
      return null;
    }

    const userConfig: UserConfig = { name: "", email: "" };
    for (const line of userLines) {
      const [key, value] = line.split("=");
      if (key === "user.name") userConfig.name = value;
      if (key === "user.email") userConfig.email = value;
      if (key === "user.signingkey") userConfig.signingkey = value;
    }

    return userConfig.name ? userConfig : null;
  } catch {
    return null;
  }
}

export function useGitUser(name: string, email: string): boolean {
  const cwd = process.cwd();
  const gitConfigPath = join(cwd, ".git", "config");
  const config = readIniConfig(gitConfigPath);

  const existingUser = config[USER_SECTION] || {};

  config[USER_SECTION] = {
    ...existingUser,
    name,
    email,
  };

  writeIniConfig(gitConfigPath, config);
  return true;
}
