import pc from "picocolors";

export function success(message: string): void {
  console.log(`${pc.green("SUCCESS:")} ${message}`);
}

export function error(message: string): never {
  console.error(`${pc.red("ERROR:")} ${message}`);
  process.exit(0);
}
