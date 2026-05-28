#!/usr/bin/env bun
import { createCLI } from "@bunli/core";
import pkg from "../package.json" with { type: "json" };

import add from "./commands/add.js";
import rm from "./commands/rm.js";
import ls from "./commands/ls.js";
import use from "./commands/use.js";
import current from "./commands/show.js";

const cli = await createCLI({
  name: "gum",
  version: pkg.version,
  description: "Git User Manager - Switch between git users easily",
});

cli.command(add);
cli.command(rm);
cli.command(ls);
cli.command(use);
cli.command(current);

await cli.run();
