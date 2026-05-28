import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import os from "os";
import ini from "ini";

const HOME = os.homedir();
export const GUM_CONFIG = join(HOME, ".gumrc");
export const GLOBAL_CONFIG = join(HOME, ".gitconfig");
export const USER_SECTION = "user";

export interface UserConfig {
  name: string;
  email: string;
  signingkey?: string;
  [key: string]: string | undefined;
}

export function readConfig(): Record<string, Record<string, string>> {
  if (!existsSync(GUM_CONFIG)) {
    return {};
  }
  try {
    const content = readFileSync(GUM_CONFIG, "utf-8");
    return ini.parse(content);
  } catch {
    return {};
  }
}

export function writeConfig(data: Record<string, Record<string, string>>): void {
  writeFileSync(GUM_CONFIG, ini.stringify(data));
}

export function writeIniConfig(
  path: string,
  data: Record<string, Record<string, string>>
): void {
  writeFileSync(path, ini.stringify(data));
}

export function readIniConfig(path: string): Record<string, Record<string, string>> {
  if (!existsSync(path)) {
    return {};
  }
  try {
    const content = readFileSync(path, "utf-8");
    return ini.parse(content);
  } catch {
    return {};
  }
}

export function getUsers(): Record<string, string> {
  const config = readConfig();
  const users: Record<string, string> = {};

  for (const [key, value] of Object.entries(config)) {
    if (key.startsWith('user "')) {
      const name = key.match(/^user "(.+)"$/)?.[1] || key;
      users[name] = value.email || "";
    }
  }

  const globalConfig = readIniConfig(GLOBAL_CONFIG);
  if (globalConfig[USER_SECTION]?.name) {
    const globalName = globalConfig[USER_SECTION].name;
    const globalEmail = globalConfig[USER_SECTION].email || "";
    if (globalName && !users[globalName]) {
      users[globalName] = globalEmail;
    }
  }

  return users;
}

export function addUser(name: string, email: string): void {
  const config = readConfig();
  config[`user "${name}"`] = { email };
  writeConfig(config);
}

export function removeUser(name: string): void {
  const config = readConfig();
  delete config[`user "${name}"`];
  writeConfig(config);
}

export function getCurrentGitUser(): UserConfig | null {
  const cwd = process.cwd();
  const gitConfigPath = join(cwd, ".git", "config");
  const config = readIniConfig(gitConfigPath);
  const userSection = config[USER_SECTION];
  if (!userSection) return null;
  return {
    name: userSection.name || "",
    email: userSection.email || "",
    signingkey: userSection.signingkey,
  };
}
