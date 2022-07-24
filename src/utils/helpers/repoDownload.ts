#!/usr/bin/env node
import spawn from "cross-spawn";
const fs = require("fs-extra");
const path = require("path");
const cwd = process.cwd();
const check = (file: string) => fs.existsSync(path.join(cwd, file));
import { red, white, green, blue, yellow } from "./utilTextColors";

import { makeMessCommand, cleanMessCommand } from "../helpers/repoCommands";

export async function makeMess() {
  if (check("customChecks")) {
    yellow("customChecks already exists");
    return;
  } else {
    // download customChecks
    yellow("Getting external checks...");
    const dl = spawn.sync(makeMessCommand[0].command, makeMessCommand[0].args);
  }
}

export async function cleanMess() {
  if (check("customChecks")) {
    yellow("removing customChecks folder");
    const rm = spawn.sync(
      cleanMessCommand[0].command,
      cleanMessCommand[0].args,
      { stdio: "inherit" }
    );
    return;
  }
}
