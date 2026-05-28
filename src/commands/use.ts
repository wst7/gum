import { defineCommand } from "@bunli/core";
import { getUsers } from "../utils/config.js";
import { useGitUser } from "../utils/git.js";
import { success, error } from "../utils/output.js";

export default defineCommand({
  name: "use" as const,
  description: "Set git user for current repository. Usage: gum use <name>",
  handler: async ({ positional }) => {
    const [name] = positional;

    if (!name) {
      error("Name is required. Usage: gum use <name>");
    }

    const users = getUsers();

    if (!Object.keys(users).includes(name)) {
      error(`User '${name}' not found.`);
    }

    const email = users[name];
    useGitUser(name, email);

    success(`Now using '${name}' (${email}) in this repository.`);
  },
});
