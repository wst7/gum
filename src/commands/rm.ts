import { defineCommand } from "@bunli/core";
import { getUsers, removeUser } from "../utils/config.js";
import { success, error } from "../utils/output.js";

export default defineCommand({
  name: "rm" as const,
  alias: ["remove"],
  description: "Remove a user configuration. Usage: gum rm <name>",
  handler: async ({ positional }) => {
    const [name] = positional;

    if (!name) {
      error("Name is required. Usage: gum rm <name>");
    }

    const users = getUsers();

    if (!users[name]) {
      error(`User '${name}' not found.`);
    }

    removeUser(name);

    success(`User '${name}' removed.`);
  },
});
