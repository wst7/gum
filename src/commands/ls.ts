import { defineCommand } from "@bunli/core";
import pc from "picocolors";
import { getUsers, getCurrentGitUser } from "../utils/config.js";

function isCurrentUser(email1: string | undefined, email2: string | undefined): boolean {
  if (!email1 || !email2) return false;
  return email1.toLowerCase() === email2.toLowerCase();
}

function padRight(str: string, len: number): string {
  return str.padEnd(len, " ");
}

export default defineCommand({
  name: "ls" as const,
  alias: ["list"],
  description: "List all configured users",
  handler: async () => {
    const users = getUsers();
    const currentGitUser = getCurrentGitUser();
    const currentGitEmail = currentGitUser?.email;

    const displayUsers: Array<{ name: string; email: string; isActive: boolean }> = [];

    for (const [name, email] of Object.entries(users)) {
      displayUsers.push({
        name,
        email,
        isActive: isCurrentUser(email, currentGitEmail),
      });
    }

    if (currentGitUser?.name && currentGitUser?.email) {
      const existsInList = displayUsers.some(
        (u) => u.email.toLowerCase() === currentGitEmail?.toLowerCase()
      );
      if (!existsInList) {
        displayUsers.push({
          name: currentGitUser.name,
          email: currentGitEmail!,
          isActive: true,
        });
      }
    }

    if (displayUsers.length === 0) {
      console.log("No users configured. Run 'gum add <name> <email>' to add a user.");
      return;
    }

    const maxNameLen = Math.max(...displayUsers.map((u) => u.name.length), 10);

    const lines = displayUsers.map((user) => {
      const prefix = user.isActive ? pc.green("* ") : "  ";
      const name = padRight(user.name, maxNameLen);
      const dashes = " ".repeat(3);
      return `${prefix}${name}${dashes}${user.email}`;
    });

    console.log(lines.join("\n"));
  },
});
