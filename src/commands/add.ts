import { defineCommand } from "@bunli/core";
import pc from "picocolors";
import { getUsers, addUser } from "../utils/config.js";
import { success, error } from "../utils/output.js";

export default defineCommand({
  name: "add" as const,
  description: "Add a new user configuration. Usage: gum add <name> <email>",
  handler: async ({ positional }) => {
    const [name, email] = positional;

    if (!name) {
      error("Name is required. Usage: gum add <name> <email>");
    }
    if (!email) {
      error("Email is required. Usage: gum add <name> <email>");
    }

    const nameRegex = /^[\w.-]+$/;
    if (!nameRegex.test(name)) {
      error("Invalid name. Only letters, numbers, dots, hyphens, underscores allowed.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error("Invalid email format.");
    }

    const users = getUsers();

    if (users[name]) {
      error(`User '${name}' already exists.`);
    }

    const existingEmails = Object.values(users);
    if (existingEmails.some((e) => e.toLowerCase() === email.toLowerCase())) {
      error(`Email '${email}' is already in use.`);
    }

    addUser(name, email);

    success(`User '${name}' added. Run ${pc.green(`gum use ${name}`)} to use it.`);
  },
});
